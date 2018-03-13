import React, {Component} from 'react';

class SessionButton extends Component {

  render() {
    console.log('Rendering <SessionButton/>');
    return (
        <nav className="session-button">
          <div className="container">
            <p className="session-button-text">Start Session</p>
          </div>
        </nav>
    );
  }
}

export default SessionButton;