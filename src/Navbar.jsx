import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import MdMenu from 'react-icons/lib/md/menu';
import MdSearch from 'react-icons/lib/md/search';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import MdAccessible from 'react-icons/lib/md/accessible';
import MdAccessTime from 'react-icons/lib/md/access-time';
import FaBolt from 'react-icons/lib/fa/bolt';
import MdDirectionsCar from 'react-icons/lib/md/directions-car';
const moment = require('moment');

const style = {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
}

class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      handicap: "grey",
      level: 70,
      rate: 5000,
      endTime: null,
      minuteString: "",
      secondString: ""
    };
  }

  countUpCharge() {
    let increase = this.state.level + 1;
    if (this.state.level >= 100) {
      clearInterval(this.chargeTime);
      increase = 100;
      return
    }
    this.setState ({
      level: increase
    })
  }

  timerCount() {
    const start = moment.utc();
    const endTime = moment(this.state.endTime);
    // console.log('this is endTime from within timerCount:', endTime);
    const minuteDiff = endTime.diff(start, 'minutes');
    const secondDiff = endTime.diff(start, 'seconds') % 60;
    let secondDiffString;
    if (secondDiff < 10) {
      secondDiffString = `0${secondDiff}`;
    } else {
      secondDiffString = `${secondDiff}`;
    }

    if (minuteDiff <= 0){
      clearInterval(this.timer);
      let minuteString = "";
      let secondString = "";
      return;
    }

    this.setState ({
      minuteString: minuteDiff,
      secondString: secondDiffString
    })
  }

  componentDidUpdate() {
    console.log("component is updating!, endTime is : ", this.props.endTime);
    if (this.props.endTime !== this.state.endTime) {
      if (this.props.endTime !== null) {
        console.log("route1");
        this.setState({ endTime: this.props.endTime, level: this.props.level }, () => {
          this.chargeTime = setInterval(() => this.countUpCharge(), this.state.rate);
          this.timer = setInterval(() => this.timerCount(), 1000);
        });
      } else {
        console.log("route2");
        this.setState({ endTime: this.props.endTime, level: this.props.level });        
      }
    }
  }

  handleToggle = () => this.setState({open: !this.state.open});
  
  handleClose = () => this.setState({open: false});

  handicapColor = () => {
    this.props.filterHandicap();
    let color = this.state.handicap;
    if (color === "grey") {
      this.setState({handicap: "darkblue"})
    } else {
      this.setState({handicap: "grey"})
    }
  }
  
  logout = () => {
    this.handleClose();
    let token = document.cookie.split('=');
    this.props.logout(token[1]);
    document.cookie = "userSession=null";
    clearInterval(this.chargeTime);
    clearInterval(this.timer);
    this.setState({ minuteString: "", secondString: "" });
  }


  buttons = () => {
    if (this.props.loggedIn) {
      return (
        <div>
          <MenuItem 
            onClick={this.handleClose}
            >Account Settings</MenuItem>
          <MenuItem 
            onClick={this.logout}
            >Logout</MenuItem>
        </div>
      )
    } else {
      return (
        <div>
          <MenuItem 
            containerElement={<Link to="/login" />} 
            onClick={this.handleClose} 
            primaryText="Login"
          />
          <MenuItem 
            containerElement={<Link to="/register" />} 
            onClick={this.handleClose} 
            primaryText="Sign Up"
            />
        </div>
      )
    }
  }

  render() {
    console.log('Rendering <Navbar/>');

    return (
      <div>
        <h1 className="icon-menu" onClick={this.handleToggle} > <MdMenu /> </h1>
        <h1 className="icon-search"> <MdSearch /> </h1>
        
        <FloatingActionButton className="handicap-button" backgroundColor={this.state.handicap} onClick={this.handicapColor}>
            <MdAccessible />
        </FloatingActionButton>
           
        <Drawer
          docked={false}
          width={250}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open: open})}
          className="user-drawer"
          containerStyle={style}
        >
          <div className="session-info">
            <ul>
              <li>
                <FaBolt className="info-icons"/>
                {this.state.level && <p>{this.state.level}%</p>}
              </li>
              <li>
                <MdDirectionsCar className="car-icon" />
              </li>
              <li>
                <MdAccessTime className="info-icons"/>
                
                {this.state.secondString && <p>{this.state.minuteString}:{this.state.secondString}</p>}
              </li>
            </ul>
          </div>
          {this.buttons()}
        </Drawer>
      </div>
    );
  }
}

export default Navbar;