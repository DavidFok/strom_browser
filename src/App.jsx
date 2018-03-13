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
      switch (data.type) {
        case 'parkadeData':
        this.setState({ parkades: data.data});
        break;
      }
    }
  }

  newUser(user){
    let outboundMessageVehicle = {
      type: "register",
      data: user
    };

    //send new user notification to server
    this.socket.send(JSON.stringify(outboundMessageVehicle));
    console.log('outbound message vehicle: ', outboundMessageVehicle);
  }
  
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/login' exact component={LoginPage}/>
          {/* <Route path='/register' exact component={SignUpPage}/> */}
          <Route path='/register' exact render={() => {
            return(
              <SignUpPage newUser={this.newUser.bind(this)}/>
            );
          }}/>
          <Route path='/' exact render={() => {
            return(
              <div>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
                <Map parkades={this.state.parkades}/>
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
