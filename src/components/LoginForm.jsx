import React, {Component} from 'react';
import { Link } from 'react-router';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const style = {
  margin: 12,
};

class LoginForm extends Component{
  constructor(props) {
    super(props);
  }
  
  render() {
    return(
      <Card className="login_form">
        <TextField
        hintText="email"
        name="email"
        value={this.props.user.email}
        onChange={this.props.onChange}
        /><br />
        <br />
    
        <TextField
        hintText="password"
        name="password"
        value={this.props.user.password}
        onChange={this.props.onChange}
        type="password"
        /><br />
        <br />
    
        <RaisedButton label="Primary" type="submit" primary={true} style={style} />
      </Card>
    );
  }
}


export default LoginForm;