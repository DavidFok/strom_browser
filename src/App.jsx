import React, {Component} from 'react';
import Map from './Map.jsx';
import Navbar from './Navbar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      switch (data.type) {
        case 'parkadeData':
        this.setState({ parkades: data.data});
        // console.log("this is the state parkade data:  ", this.state.parkades);
        break;
      }
    }


  }
  
  render() {
    return (
      <div>
        <Map parkades={this.state.parkades} />
        <Navbar/>
      </div>
    );
  }
}
export default App;
