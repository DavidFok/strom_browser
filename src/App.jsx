import React, {Component} from 'react';
import Map from './Map.jsx';
import Navbar from './Navbar.jsx';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Menu from './Menu.jsx';
import SignUpPage from './SignUpPage.jsx';
import LoginPage from './LoginPage.jsx';
import SessionButton from './SessionButton.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001/');
    this.socket.onopen = (event) => {
      console.log('connected to ws-server');
    }

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("receiving data: ", data);
      switch (data.route) {
        case 'parkadeData':
          this.setState({ parkades: data.data});
          break;
        case 'registerData':
          // add code here
          break;
        case 'spots':
          if (data.type === "confirm") {
            this.setState({spots: data.data});
          } else {
            console.log("error in receiving spots: ", data.data);
          }
      }
    }
  }

  newUser(user) {
    let outboundMessageVehicle = {
      type: "register",
      data: user
    };

    // send new user notification to server
    this.socket.send(JSON.stringify(outboundMessageVehicle));
    console.log('outbound message vehicle: ', outboundMessageVehicle);
  }
  
  login(user) {
    let outMsgVcle = {
      type: "login",
      data: user
    }
    // send login notification to server
    this.socket.send(JSON.stringify(outMsgVcle));
    console.log('outbound message vehicle: ', outMsgVcle);
  }

  getSpotData(parkadeId) {
    let outMsgVcle = {
      type: "spots",
      data: parkadeId
    }
    this.socket.send(JSON.stringify(outMsgVcle));
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path='/login' exact render = {() => {
            return(
              <LoginPage login={this.login.bind(this)}/>
            );
          }}/>
          <Route path='/register' exact render={() => {
            return(
              <SignUpPage newUser={this.newUser.bind(this)}/>
            );
          }}/>
          <Route path='/' exact render={() => {
            return(
              <div>
                <Map parkades={this.state.parkades} getSpotData={this.getSpotData.bind(this)} spots={this.state.spots} />
                <Navbar/>
                <SessionButton/>
              </div>
            );
          }}/>
        </Switch>
      </Router>
    );
  }
}
export default App;
