import React, {Component} from 'react';
import MdMenu from 'react-icons/lib/md/menu';
import MdSearch from 'react-icons/lib/md/search';

class Navbar extends Component {
  render() {
    console.log('Rendering <Navbar/>');
    return (
        <nav className="navbar">
          <h1 className="icon-menu"> <MdMenu /> </h1>
          <p className="navbar-text"> Search here </p>
          <h1 className="icon-search"> <MdSearch /> </h1>
        </nav>
    );
  }
}

export default Navbar;