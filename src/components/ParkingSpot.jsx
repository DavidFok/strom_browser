import React, { Component } from 'react';
import FaWheelchair from 'react-icons/lib/fa/wheelchair';
const moment = require('moment');

class ParkingSpotDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      endTime: null,
      minuteString: '',
      times: {}
    };
  }

  timerCount(endTimeStamp) {
    const start = moment.utc();
    const endTime = moment(endTimeStamp);
    // console.log('this is endTime from within timerCount:', endTime);
    const minuteDiff = endTime.diff(start, 'minutes');
    // this.setState ({
    //   minuteString: minuteDiff
    // })
    return minuteDiff;
  }

  // componentDidUpdate() {
  //   console.log('component is updating!, endTime is : ', this.props.endTime);
  //   if (this.props.endTime !== this.state.endTime) {
  //   //   if (this.props.endTime !== null) {
  //   //     console.log('route1');
  //   //     this.setState({ endTime: this.props.endTime, level: this.props.level }, () => {
  //   //       this.timer = setInterval(() => this.timerCount(), 1000);
  //   //     });
  //   //   } else {
  //   //     console.log('route2');
  //   //     this.setState({ endTime: this.props.endTime, level: this.props.level });        
  //   //   }
  //   }
  // }

  render() {
    const availability = (spot) => {
      if (spot.lastSession.length > 0) {
        console.log("==========SPOT.LASTSESSION: ", spot.lastSession);
        console.log("minutes left: ", minutesLeft);
        const endTimeStamp = spot.lastSession[0].charge_end;
        const minutesLeft = this.timerCount(endTimeStamp);
        if (minutesLeft > 0) {
          return (<p>Available in {minutesLeft} mins</p>);
        } else {
          return (<p>Available</p>);
        }
      } else {
        return (<p>Available</p>);
      };
    }

    let times = this.state.times;

    let spots = this.props.spots.map((spot) => {

      times[spot.spot_label] = spot.endTime;
      if (spot.lastSession.length > 0) {
        
        const endTimeStamp = spot.lastSession[0].charge_end;
        const minutesLeft = this.timerCount(endTimeStamp);
        if (minutesLeft > 0) {
          // if not currently available
          return (
            <li className="unavailable"> 
              <header>
                <div>
                  <p># {spot.spot_label}</p>
                  {availability(spot)}
                </div>
                {spot.handicap && <FaWheelchair />}
              </header>
              <table>
                <tr>
                  <td>Plug type</td>
                  <td>$/Kwh</td>
                </tr>
                <tr>
                  <td>{spot.plug_type}</td>
                  <td>${Number.parseFloat(spot.cents_per_kwh / 100).toFixed(2)}</td>
                </tr>
              </table>
            </li>
          );
        } else {
          // if spot is currently available
          return (
            <li>
              <header>
                <div>
                  <p># {spot.spot_label}</p>
                  {availability(spot)}
                </div>
                {spot.handicap && <FaWheelchair />}
              </header>
              <table>
                <tr>
                  <td>Plug type</td>
                  <td>$/Kwh</td>
                </tr>
                <tr>
                  <td>{spot.plug_type}</td>
                  <td>${Number.parseFloat(spot.cents_per_kwh / 100).toFixed(2)}</td>
                </tr>
              </table>
          </li>
          );
        }
      } else {
        // if spot is currently available
        return (
          <li>
            <header>
              <div>
                <p># {spot.spot_label}</p>
                {availability(spot)}
              </div>
              {spot.handicap && <FaWheelchair />}
            </header>
            <table>
              <tr>
                <td>Plug type</td>
                <td>$/Kwh</td>
              </tr>
              <tr>
                <td>{spot.plug_type}</td>
                <td>${Number.parseFloat(spot.cents_per_kwh / 100).toFixed(2)}</td>
              </tr>
            </table>
        </li>
        );
      }
    });
    return <ul>{spots}</ul>
  }
}

export default ParkingSpotDisplay;