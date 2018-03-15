import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
// import { Link } from 'react-router';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import MdClose from 'react-icons/lib/md/close';

const style = {
  margin: 12,
};

class LoginForm extends Component{
  constructor(props) {
    super(props);
  }
  
  render() {
    return(
      <div>
        <nav className="login-reg-nav">
          <p>Login</p>
          <Link to="/"> <MdClose className="close-button" color="whitesmoke" /> </Link>
        </nav>

        <Card className="login_form">

        <h1>Login</h1>

          <TextField
          hintText="email"
          name="email"
          value={this.props.user.email}
          errorText={this.props.errorText.email}
          onChange={this.props.onChange}
          /><br />
          <br />
      
          <TextField
          hintText="password"
          name="password"
          value={this.props.user.password}
          errorText={this.props.errorText.password}
          onChange={this.props.onChange}
          type="password"
          /><br />
          <br />
      
          <RaisedButton onClick={this.props.onSubmit} label="Primary" type="submit" primary={true} style={style} />
        </Card>
      </div>
    );
  }
}


export default LoginForm;