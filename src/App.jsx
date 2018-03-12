import React, {Component} from 'react';
import Map from './Map.jsx';
import Navbar from './Navbar.jsx';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Menu from './Menu.jsx';
import SignUpPage from './SignUpPage.jsx';
import LoginPage from './LoginPage.jsx';

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
      switch (data.type) {
        case 'parkadeData':
        this.setState({ parkades: data.data});
        break;
      }
    }
  }
  
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/login' exact component={LoginPage}/>
          <Route path='/register' exact component={SignUpPage}/>
          <Route path='/' exact render={() => {
            return(
              <div>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
                <Map parkades={this.state.parkades}/>
                <Navbar/>
              </div>
            );
          }}/>
        </Switch>
      </Router>
    );
  }
}
export default App;
