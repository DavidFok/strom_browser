import React, {Component} from 'react';
import SignUpForm from './components/SignUpForm.jsx';


class SignUpPage extends React.Component {
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
        password: '',
        password_confirmation: '',
        first_name: '',
        last_name: '',
        street_1: '',
        street_2: '',
        city: '',
        province: '',
        postal_code: '',
        country: ''
      },
      user: {
        email: '',
        password: '',
        password_confirmation: '',
        first_name: '',
        last_name: '',
        street_1: '',
        street_2: '',
        city: '',
        province: '',
        postal_code: '',
        country: '',
        handicap: false
      },
      required_fields: ["email", "password", "password_confirmation", "first_name", "last_name", "street_1", "city", "province", "postal_code", "country"]
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
    this.toggleHandicap = this.toggleHandicap.bind(this);
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

  toggleHandicap(event) {
    const user = this.state.user;
    user["handicap"] = (user["handicap"] ? false : true);
    this.setState({
      user:user
    });
    console.log("handicap: ", user["handicap"]);
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();
    if (this.validateForm()){
      // if signup request form has been entered correctly
      console.log("signup form is valid!");
      this.clearFormError();
      this.props.newUser(this.state.user);
    } else {
      // if signup request form is not valid, show error messages where applicable
      console.log("signup form is invalid!");
      this.displayFormError();
    }
  }

  validateForm() {
    // shortlist form fields
    let check_empty_fields = true;
    let check_passwords_match = false;
    
    const user = this.state.user;
    // required fields
    const required_fields = this.state.required_fields;

    required_fields.forEach((key, index) => {
      if (user[key] === ""){
        check_empty_fields = false;
      }
    });

    // validate that password and password confirmation match
    if (user.password === user.password_confirmation){
      check_passwords_match = true;
    }

    // return true for valid and false for invalid signup request
    return (check_empty_fields && check_passwords_match);
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
    
    // check that password and password_confirmation fields match
    if (user.password !== user.password_confirmation){
      errorText.password_confirmation = "Passwords do not match"
    }

    this.setState({
      errorText: errorText
    });
  }

  clearFormError() {
    // clears form errors listed on form
    const errorText = this.state.errorText;
    for (let field in errorText){
      errorText[field] = ""; 
    }
    this.setState({
      errorText: errorText
    })
  }


  /**
   * Render the component.
   */
  render() {
    return (
      <SignUpForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        onToggle={this.toggleHandicap}
        errors={this.state.errors}
        user={this.state.user}
        errorText={this.state.errorText}
      />
    );
  }

}

export default SignUpPage;