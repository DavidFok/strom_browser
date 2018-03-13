import React, {Component} from 'react';
import { Link } from 'react-router';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

const style = {
  margin: 12,
  block: {
    maxWidth: 350,
  },
  toggle: {
    marginBottom: 16,
    fontSize: 18,
  },
};

const SignUpForm = () => (
  <Card className="signup_form">

  <h1>Sign Up</h1>

    <TextField
    hintText="first name"
    /><br />
    <br />

    <TextField
    hintText="last name"
    /><br />
    <br />

    <TextField
    hintText="street 1"
    />
    <TextField
    hintText="street 2"
    /><br />
    <br />

    <TextField
    hintText="city"
    /><br />
    <br />

    <TextField
    hintText="province"
    /><br />
    <br />

    <TextField
    hintText="postal code"
    /><br />
    <br />

    <TextField
    hintText="country"
    /><br />
    <br />

    <TextField
    hintText="email"
    /><br />
    <br />

    <TextField
    hintText="password"
    /><br />
    <br />

    <TextField
    hintText="confirm password"
    /><br />
    <br />

  <div style={style.block}>
    <Toggle
    label="handicap?"
    style={style.toggle}
    />
  </div>

    <RaisedButton label="Submit" primary={true} style={style} />
  </Card>
);  

export default SignUpForm;