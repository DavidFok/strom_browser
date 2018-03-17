import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
// import { Link } from 'react-router';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import MdClose from 'react-icons/lib/md/close';

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

class SignUpForm extends Component{
  constructor(props){
    super(props);
  }

  render() {
    return(
      <div>
        <nav className="login-reg-nav">
          <p>Sign Up</p>
          <Link to="/"> <MdClose className="close-button" color="whitesmoke" /> </Link>
        </nav>

        <Card className="signup_form">

        <h1>Sign Up</h1>

          <TextField
          hintText="First name"
          name="first_name"
          value={this.props.user.first_name}
          onChange={this.props.onChange}
          errorText={this.props.errorText.first_name}
          /><br />
          <br />

          <TextField
          hintText="Last name"
          name="last_name"
          value={this.props.user.last_name}
          onChange={this.props.onChange}
          errorText={this.props.errorText.last_name}
          /><br />
          <br />

          {/* <TextField
          hintText="street_1"
          name="street_1"
          value={this.props.user.street_1}
          onChange={this.props.onChange}
          errorText={this.props.errorText.street_1}
          /><br />
          <br />

          <TextField
          hintText="street_2"
          name="street_2"
          value={this.props.user.street_2}
          onChange={this.props.onChange}
          errorText={this.props.errorText.street_2}
          /><br />
          <br />

          <TextField
          hintText="city"
          name="city"
          value={this.props.user.city}
          onChange={this.props.onChange}
          errorText={this.props.errorText.city}
          /><br />
          <br />

          <TextField
          hintText="province"
          name="province"
          value={this.props.user.province}
          onChange={this.props.onChange}
          errorText={this.props.errorText.province}
          /><br />
          <br />

          <TextField
          hintText="postal code"
          name="postal_code"
          value={this.props.user.postal_code}
          onChange={this.props.onChange}
          errorText={this.props.errorText.postal_code}
          /><br />
          <br />

          <TextField
          hintText="country"
          name="country"
          value={this.props.user.country}
          onChange={this.props.onChange}
          errorText={this.props.errorText.country}
          /><br />
          <br /> */}

          <TextField
          hintText="Phone number"
          name="phone_number"
          value={this.props.user.phone_number}
          onChange={this.props.onChange}
          errorText={this.props.errorText.phone_number}
          /><br />
          <br />

          <TextField
          hintText="Email Address"
          name="email"
          value={this.props.user.email}
          onChange={this.props.onChange}
          errorText={this.props.errorText.email}
          /><br />
          <br />

          <TextField
          hintText="Password"
          name="password"
          value={this.props.user.password}
          onChange={this.props.onChange}
          errorText={this.props.errorText.password}
          type="password"
          /><br />
          <br />

          <TextField
          hintText="Confirm password"
          name="password_confirmation"
          value={this.props.user.password_confirmation}
          onChange={this.props.onChange}
          errorText={this.props.errorText.password_confirmation}
          type="password"
          /><br />
          <br />

          <div style={style.block}>
            <Toggle
            label="handicap?"
            style={style.toggle}
            value={this.props.user.handicap}
            onToggle={this.props.onToggle}
            />
          </div>
          <RaisedButton onClick={this.props.onSubmit} label="Submit" primary={true} style={style} />
        </Card>
      </div>
    );
  }
}

export default SignUpForm;