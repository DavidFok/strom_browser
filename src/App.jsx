import React, {Component} from 'react';
import Map from './Map.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 0,
    };
  }

  componentDidMount() {
    console.log('componentDidMount');

    this.socket = new WebSocket('ws://localhost:3001/');
    this.socket.onopen = (event) => {
      console.log('connected to ws-server');
    }

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
    }


  }

  render() {
    return (
      <div>
        <Map/>
      </div>
    );
  }
}
export default App;
