import React, {Component} from 'react';
import FaWheelchair from 'react-icons/lib/fa/wheelchair';
const moment = require('moment');

class ParkingSpotDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      endTime: null,
      minuteString: ''
    };
  }


  timerCount() {
    const start = moment.utc();
    const endTime = moment(this.state.endTime);
    // console.log('this is endTime from within timerCount:', endTime);
    const minuteDiff = endTime.diff(start, 'minutes');
    this.setState ({
      minuteString: minuteDiff
    })
  }

  componentDidUpdate() {
    console.log('component is updating!, endTime is : ', this.props.endTime);
    if (this.props.endTime !== this.state.endTime) {
      if (this.props.endTime !== null) {
        console.log('route1');
        this.setState({ endTime: this.props.endTime, level: this.props.level }, () => {
          this.timer = setInterval(() => this.timerCount(), 1000);
        });
      } else {
        console.log('route2');
        this.setState({ endTime: this.props.endTime, level: this.props.level });        
      }
    }
  }

  render() {
    let spots = this.props.spots.map((spot) => {
      const availability = (spot) => {
        if (spot.in_use) return <p>{this.state.minuteString}</p>; 
        else return <p>Available</p>;
      }
      return (
        <li>
          <header>
            <div>
              <p># {spot.spot_label}</p>
              {availability(spot)}
            </div>
            {spot.handicap && <FaWheelchair/> }
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
      )
    });
    return <ul>{spots}</ul>
  }
}

export default ParkingSpotDisplay;