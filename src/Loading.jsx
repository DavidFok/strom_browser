import React, {Component} from 'react';

class Loading extends Component {
  render() {
    return (
        <div className="loading">
          <img className="strom-image" src={require('../images/strom.png')} />
          <nav className="black-img"/>
        </div>
    );
  }
}

export default Loading;