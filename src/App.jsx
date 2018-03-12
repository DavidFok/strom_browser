import React, {Component} from 'react';
import Map from './Map.jsx';
import Navbar from './Navbar.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

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
          <Route path='/login' exact component={Login}/>
          <Route path='/register' exact component={Register}/>
          <Route path='/' exact render={() => {
            return(
              <div>
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
