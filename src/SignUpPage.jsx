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
      />
    );
  }

}

export default SignUpPage;