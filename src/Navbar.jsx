import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import MdMenu from 'react-icons/lib/md/menu';
import MdSearch from 'react-icons/lib/md/search';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import MdAccessible from 'react-icons/lib/md/accessible';

class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      handicap: "grey"
    };
  }

  handleToggle = () => this.setState({open: !this.state.open});
  
  handleClose = () => this.setState({open: false});

  handicapColor = () => {
    this.props.filterHandicap();
    let color = this.state.handicap;
    if (color === "grey") {
      this.setState({handicap: "rgb(0, 188, 212"})
    } else {
      this.setState({handicap: "grey"})
    }
  }
  
  logout = () => {
    this.handleClose();
    let token = document.cookie.split('=');
    this.props.logout(token[1]);
    document.cookie = "userSession=" + null;
  }
  
  buttons = () => {
    if (this.props.loggedIn) {
      return (
        <div>
          <MenuItem 
            onClick={this.handleClose}
            >Account Settings</MenuItem>
          <MenuItem 
            onClick={this.logout}
            >Logout</MenuItem>
        </div>
      )
    } else {
      return (
        <div>
          <MenuItem 
            containerElement={<Link to="/login" />} 
            onClick={this.handleClose} 
            primaryText="Login"
          />
          <MenuItem 
            containerElement={<Link to="/register" />} 
            onClick={this.handleClose} 
            primaryText="Sign Up"
            />
        </div>
      )
    }
  }

  render() {
    console.log('Rendering <Navbar/>');

    return (
      <div>
        <nav className="navbar">
          <div className="container">
            <h1 className="icon-menu" onClick={this.handleToggle} > <MdMenu /> </h1>
            <p className="navbar-text"> Search here </p>
            <h1 className="icon-search"> <MdSearch /> </h1>
          </div>
          <FloatingActionButton className="handicap-button" backgroundColor={this.state.handicap} onClick={this.handicapColor}>
              <MdAccessible />
          </FloatingActionButton>
        </nav>
           
        <Drawer
          docked={false}
          width={250}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open: open})}
        >
          {this.buttons()}
        </Drawer>
      </div>
    );
  }
}

export default Navbar;