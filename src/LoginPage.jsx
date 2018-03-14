import React, {Component} from 'react';
import LoginForm from './components/LoginForm.jsx';
import { Redirect } from 'react-router';

class LoginPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    // set the initial component state
    this.state = {
      errors: {},
      errorText:{
        email: '',
        password: ''
      },
      user: {
        email: '',
        password: ''
      },
      required_fields: ["email", "password"]
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();
    if(this.validateForm()){
      // if the form is valid
      console.log("Submitted!");
    } else {
      // if the form is not valid, display error fields
      this.displayFormError();
    }
    console.log('email:', this.state.user.email);
    console.log('password:', this.state.user.password);
  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;
    console.log('user state: ', user);
    this.setState({
      user: user
    });
  }

  validateForm() {
    // shortlist form fields
    let check_empty_fields = true;
    const user = this.state.user;
    // required fields
    const required_fields = this.state.required_fields;

    required_fields.forEach((key, index) => {
      if (user[key] === ""){
        check_empty_fields = false;
      }
    });

    // return true for valid and false for invalid signup request
    return (check_empty_fields);
  }

  displayFormError() {
    // checks form for missing fields and outputs error message below corresponding input field
    const errorText = this.state.errorText;

    const user = this.state.user;
    // required fields
    const required_fields = this.state.required_fields;

    required_fields.forEach((key, index) => {
      if (user[key] === ""){
        errorText[key] = "this field is required";
      } else {
        errorText[key] = "";
      }
    });
    
    this.setState({
      errorText: errorText
    });
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <LoginForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        errorText={this.state.errorText}
        user={this.state.user}
      />
    );
  }

}

export default LoginPage;