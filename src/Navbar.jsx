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
      menuOpen: false,
      extraOpen: false
    };
  }

  handleMenuToggle = () => this.setState({menuOpen: !this.state.menuOpen});
  
  handleClose = () => this.setState({menuOpen: false, extraOpen: false});
  render() {

    const style = {
      marginRight: 20,
    };

    console.log('Rendering <Navbar/>');
    return (
      <div>
        <nav className="navbar">
          <div className="container">
            <h1 className="icon-menu" onClick={this.handleMenuToggle} > <MdMenu /> </h1>
            <p className="navbar-text"> Search here </p>
            <h1 className="icon-search"> <MdSearch /> </h1>
          </div>
          <FloatingActionButton className="handicap-button" style={style}>
              <MdAccessible />
          </FloatingActionButton>
        </nav>
           


        <Drawer
          docked={false}
          width={250}
          open={this.state.menuOpen}
          onRequestChange={(open) => this.setState({menuOpen: open})}
        >
          <MenuItem onClick={this.handleClose}>Account Settings</MenuItem>
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
          <MenuItem onClick={this.handleClose}>Logout</MenuItem>
        </Drawer>
      </div>
    );
  }
}

export default Navbar;