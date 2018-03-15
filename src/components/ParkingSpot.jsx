import React, {Component} from 'react';
import FaWheelchair from 'react-icons/lib/fa/wheelchair';

function ParkingSpotDisplay(props) {
  let spots = props.spots.map((spot) => {
    return (
      <li>
        <header>
          <div>
            <p># {spot.spot_label}</p>
            <p>Available</p>
          </div>
          {spot.handicap && <FaWheelchair/> }
        </header>
        <table>
          <tr>
            <td>Plug type</td>
            <td>Price</td>
          </tr>
          <tr>
            <td>{spot.plug_type}</td>
            <td>{spot.cents_per_kwh / 100}</td>
          </tr>
        </table>
      </li>
    )
  });
  return <ul>{spots}</ul>
}

export default ParkingSpotDisplay;