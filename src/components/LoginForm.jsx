import React, {Component} from 'react';
import { Link } from 'react-router';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const style = {
  margin: 12,
};

const LoginForm = () => (
  <Card className="login_form">
    <TextField
    hintText="email"
    /><br />
    <br />

    <TextField
    hintText="password"
    /><br />
    <br />

    <RaisedButton label="Primary" primary={true} style={style} />
  </Card>
);  


export default LoginForm;