import React, {Component} from 'react';
import MdMenu from 'react-icons/lib/md/menu';
import MdSearch from 'react-icons/lib/md/search';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

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
        </nav>

        <Drawer
          docked={false}
          width={250}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <MenuItem onClick={this.handleClose}>Account Settings</MenuItem>
          <MenuItem onClick={this.handleClose}>Login</MenuItem>
        </Drawer>
      </div>
    );
  }
}

export default Navbar;