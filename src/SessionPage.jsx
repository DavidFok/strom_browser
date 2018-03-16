import React, {Component} from 'react';
import { Redirect } from 'react-router';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import MdLocationOn from 'react-icons/lib/md/location-on';
import MdClose from 'react-icons/lib/md/close';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class SessionPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      response: null,
      errMsg: '',
      modalOpen: false,
      redirect: false
    }
  }
  componentDidUpdate() {
    if (this.props.response !== this.state.response) {
      this.processResponse();
    }
  }

  onChange(event){
    this.setState({
      value: event.target.value
    });
    console.log(this.state.value);
  }
  /**
   * Process the form.
   */
  processReq() {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();
    this.props.sessionReq(this.state.value);
  }

  processResponse() {
    console.log("sad");
    if (this.props.response.status === "reject") {
      this.setState({ 
        errMsg: this.props.response.msg,
        response: this.props.response
      });
    } else {
      this.setState({ 
        value: '', 
        modalOpen: true,
        response: this.props.response
       });
    }
  }

  handleClose = () => {
    this.setState({modalOpen: false, redirect: true});
  };

  // validateForm() {
  //   // shortlist form fields
  //   let check_empty_fields = true;
  //   const user = this.state.user;
  //   // required fields
  //   const required_fields = this.state.required_fields;

  //   required_fields.forEach((key, index) => {
  //     if (user[key] === ""){
  //       check_empty_fields = false;
  //     }
  //   });

  //   // return true for valid and false for invalid signup request
  //   return (check_empty_fields);
  // }

  // displayFormError() {
  //   // checks form for missing fields and outputs error message below corresponding input field
  //   const errorText = this.state.errorText;

  //   const user = this.state.user;
  //   // required fields
  //   const required_fields = this.state.required_fields;

  //   required_fields.forEach((key, index) => {
  //     if (user[key] === ""){
  //       errorText[key] = "this field is required";
  //     } else {
  //       errorText[key] = "";
  //     }
  //   });
    
  //   this.setState({
  //     errorText: errorText
  //   });
  // }
  
  render() {
    const style = {
      margin: 12,
      block: { maxWidth: 350 }
    };

    const actions = [
      <FlatButton
        label="Dismiss"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />
    ];

    if (this.state.redirect) {
      return(
        <Redirect to='/'/>
      );
    } else {
      return(
        <div>
            <nav className="login-reg-nav">
              <p>Start Session</p>
              <Link to="/"> <MdClose className="close-button" color="whitesmoke" /> </Link>
            </nav>
        
            <div className="session-container">
              <p>Enter a charing station number to begin charging</p>
                <div className="session-input">
                  <MdLocationOn />
                  <TextField
                    hintText="Enter a charging station number"
                    value={this.state.value}
                    onChange={this.onChange.bind(this)}
                    errorText={this.state.errMsg}
                  />
                </div>
                <RaisedButton onClick={this.processReq.bind(this)} label="Submit" primary={true} style={style} />
            </div>
            {/* The success modal */}
            <div>
              <Dialog
                title="Session started!"
                actions={actions}
                modal={false}
                open={this.state.modalOpen}
                onRequestClose={this.handleClose}
              >
                Your 30 minute charging session has begun.
              </Dialog>
            </div>
        </div>
        );
      };
    }
  }

export default SessionPage;