import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import MdLocationOn from 'react-icons/lib/md/location-on';
import MdClose from 'react-icons/lib/md/close';

class SessionPage extends React.Component {

  /**
   * Class constructor.
   */
  // constructor(props) {
  //   super(props);

  //   // set the initial component state
  //   this.state = {
  //     errors: {},
  //     errorText:{
  //       spot_id: ''
  //     },
  //     session: {
  //       spot_id: ''
  //     },
  //     required_fields: ["spot_id"],
  //     redirect: false
  //   };

  //   this.processSession = this.processSession.bind(this);
  // }

  // /**
  //  * Process the form.
  //  *
  //  * @param {object} event - the JavaScript event object
  //  */
  // processForm(event) {
  //   // prevent default action. in this case, action is the form submission event
  //   event.preventDefault();
  //   if(this.validateForm()){
  //     // if the form is valid
  //     this.props.login(this.state.user);
  //     console.log("Submitted!");
  //     // redirect user to home
  //     this.setState({ redirect: true });
  //   } else {
  //     // if the form is not valid, display error fields
  //     this.displayFormError();
  //   }
  //   console.log('email:', this.state.user.email);
  // }

  // /**
  //  * Change the user object.
  //  *
  //  * @param {object} event - the JavaScript event object
  //  */
  // changeUser(event) {
  //   const field = event.target.name;
  //   const user = this.state.user;
  //   user[field] = event.target.value;
  //   console.log('user state: ', user);
  //   this.setState({
  //     user: user
  //   });
  // }

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
                  // onSubmit={this.processForm}
                  hintText="Enter a charging station number"
                  // value={this.state.value}
                  // onChange={this.onChange}
                  // errorText={this.state.errorText}
                />
              </div>
          </div>
      </div>
      );
    }
  }

export default SessionPage;