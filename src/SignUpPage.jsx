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
      }
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
    const f1 = this.state.user.email;
    const f2 = this.state.user.password;
    const f3 = this.state.user.password_confirmation;
    const f4 = this.state.user.first_name;
    const f5 = this.state.user.last_name;
    const f6 = this.state.user.street_1;
    const f7 = this.state.user.street_2;
    const f8 = this.state.user.city;
    const f9 = this.state.user.province;
    const f10 = this.state.user.postal_code;
    const f11 = this.state.user.country;
    const f12 = this.state.user.handicap;

    let check_empty_fields = true;
    let check_passwords_match = false;

    // required fields
    const required = [f1, f2, f3, f4, f5, f6, f8, f9, f10, f11];
    
    // validate that that there are no empty required fields    
    required.forEach((value, index) => {
      if (value === ""){
        check_empty_fields = false;
      }  
    });   

    // validate that password and password confirmation match
    if (f2 === f3){
      check_passwords_match = true;
    }

    // return true for valid and false for invalid signup request
    return (check_empty_fields && check_passwords_match);
  }

  displayFormError() {
    // checks form for missing fields and outputs error message below corresponding input field
    const errorText = this.state.errorText;

    const f1 = this.state.user.email;
    const f2 = this.state.user.password;
    const f3 = this.state.user.password_confirmation;
    const f4 = this.state.user.first_name;
    const f5 = this.state.user.last_name;
    const f6 = this.state.user.street_1;
    const f7 = this.state.user.street_2;
    const f8 = this.state.user.city;
    const f9 = this.state.user.province;
    const f10 = this.state.user.postal_code;
    const f11 = this.state.user.country;
    const f12 = this.state.user.handicap;

    const required = [f1, f2, f3, f4, f5, f6, f8, f9, f10, f11];
    const keys = ['email', 'password', 'password_confirmation', 'first_name', 'last_name', 'street_1', 'city', 'province', 'postal_code', 'country', 'handicap'];

    // check that all required fields are non empty
    required.forEach((value, index) => {
      if (value === ""){
        errorText[keys[index]] = "this field is required";
      } else {
        errorText[keys[index]] = "";      
      }
    });
    
    // check that password and password_confirmation fields match
    if (f2 !== f3){
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