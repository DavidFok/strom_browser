import React, {Component} from 'react';
import Map from './Map.jsx';
import Navbar from './Navbar.jsx';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Menu from './Menu.jsx';
import SignUpPage from './SignUpPage.jsx';
import LoginPage from './LoginPage.jsx';
import SessionButton from './SessionButton.jsx';
import SessionPage from './SessionPage.jsx';

// dummy comment.
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      loggedIn: false,
      session: null,
      session_token: this.getSessionTokenFromCookies()
    };
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001/');
    this.socket.onopen = (event) => {
      console.log('connected to ws-server');
      const outboundMessageVehicle = {
        type: 'session token',
        data: null,
        cookie: this.state.session_token
      }
      this.socket.send(JSON.stringify(outboundMessageVehicle));
    }

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('receiving data: ', data);
      switch (data.route) {
        case 'parkadeData':
          let parkades = this.addShow(data.data);
          this.setState({ parkades: parkades});
          break;
        case 'registerData':
          // add code here
          break;
        case 'spots':
          if (data.type === 'confirm') {
            this.setState({ spots: data.data });
          } else {
            console.log('error in receiving spots: ', data.data);
          }
          break;
        case 'loginData':
          if (data.type === "confirm") {
            // if the server approves the token
            this.setState({ loggedIn: true });
            document.cookie = "userSession=" + data.data.session_token.fulfillmentValue;
          } else {
            // if the server rejects the token
            // clear cookies
            this.removeSessionTokenFromCookie();
            // set login state to false
            this.setState({ loggedIn: false });
          }
          console.log("this is document.cookie: ", document.cookie);
          break;
        case 'session':
          this.setState({ session: {status: data.type, msg: data.data} });
          break;

        case 'session token': 
          if (data.type === "confirm") {
            // if the server has validated the session token
            this.setState({ loggedIn: true });
          } else {
            // if the server has rejected the session token
            // clear cookies
            this.removeSessionTokenFromCookie();
            // set login state to false
            this.setState({ loggedIn: false });
          }
      }
    }
  }

  getSessionTokenFromCookies() {
    console.log("document.cookie within getSessionToken: ", document.cookie);
    const cookieString = document.cookie;
    const cookieArray = cookieString.split(";");
    let sessionToken = null;
    cookieArray.forEach((element) => {
      const elementArray = element.split("=");
      const key = elementArray[0];
      const value = elementArray[1];
      if (key === "userSession") {
        sessionToken = value;
      }
    });
    console.log("session token within getsessiontokenfromcookie is: ", sessionToken);
    return sessionToken;
  }

  // sets the document cookie field for userSession to null
  removeSessionTokenFromCookie() {
    const cookieString = document.cookie;
    const cookieArray = cookieString.split(";");

    const newCookieArray = cookieArray.map((cookieField) => {
      if (cookieField.startsWith('userSession')) {
        cookieField = "userSession=null";
      }
    });

    console.log("cookieObject: ", newCookieArray.join(";"));
    document.cookie = newCookieArray.join(";");
  }

  newUser(user) {
    let outboundMessageVehicle = {
      type: 'register',
      data: user
    };

    // send new user notification to server
    this.socket.send(JSON.stringify(outboundMessageVehicle));
    console.log('outbound message vehicle: ', outboundMessageVehicle);
  }
  
  login(user) {
    let outMsgVcle = {
      type: 'login',
      data: user
    }
    // send login notification to server
    this.socket.send(JSON.stringify(outMsgVcle));
    console.log('outbound message vehicle: ', outMsgVcle);
  }

  logout(token){
    let outMsgVcle = {
      type: 'logout',
      data: token
    }
    this.setState({ loggedIn: false, session: null });
    this.socket.send(JSON.stringify(outMsgVcle));
    console.log('outbound message vehicle: ', outMsgVcle);
  } 

  getSpotData(parkadeId) {
    let outMsgVcle = {
      type: 'spots',
      data: parkadeId
    }
    this.socket.send(JSON.stringify(outMsgVcle));
  }

  addShow(parkades) {
    let withShowKey = [];
    parkades.forEach((parkade) => {
      parkade.show = true;
      withShowKey.push(parkade);
    });
    return withShowKey; 
  }

  filterHandicap() {
    let parkades = this.state.parkades;
    let filtered = [];
    parkades.forEach((parkade) => {
      if (parkade.spot_count_handicap === 0) {
        parkade.show = !parkade.show;
        filtered.push(parkade);
      } else {
        filtered.push(parkade);
      }
    })
    this.setState({ parkades: filtered });
  }

  sessionRequest(sesNum) {
    let cookie = document.cookie.split("=");
    let outMsgVcle = {
      type: 'session request',
      data: sesNum,
      cookie: cookie[1]
    }
    // send login notification to server
    this.socket.send(JSON.stringify(outMsgVcle));
    console.log('outbound message vehicle: ', outMsgVcle);
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
          <Route path='/session' exact render = {() => {
            return(
              <SessionPage 
                sessionReq={this.sessionRequest.bind(this)} 
                response={this.state.session}
              />
            );
          }}/>
          <Route path='/' exact render={() => {
            return(
              <div>
                <Map parkades={this.state.parkades} getSpotData={this.getSpotData.bind(this)} spots={this.state.spots} />
                <Navbar filterHandicap={this.filterHandicap.bind(this)} logout={this.logout.bind(this)} loggedIn={this.state.loggedIn}/>
              { !this.state.session && <SessionButton/> }
              </div>
            );
          }}/>
        </Switch>
      </Router>
    );
  }
}
export default App;
