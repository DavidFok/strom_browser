import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

class SessionButton extends Component {

  render() {
    console.log('Rendering <SessionButton/>');
    return (
      <Link to="/session">
        <nav className="session-button">
          <div className="container">
            <p className="session-button-text">Start Session</p>
          </div>
        </nav>
      </Link>
    );
  }
}

export default SessionButton;