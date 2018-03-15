import React, {Component} from 'react';
import FaBolt from 'react-icons/lib/fa/bolt';
import FaCreditCardAlt from 'react-icons/lib/fa/credit-card-alt';
import FaWheelchair from 'react-icons/lib/fa/wheelchair';
import MdAccessTime from 'react-icons/lib/md/access-time';
import MdLocationOn from 'react-icons/lib/md/location-on';
import MdDirectionsCar from 'react-icons/lib/md/directions-car';


function ParkadeInfo(prop) {
    console.log("this is the prop that parkadeinfo receives: ", prop);
    let x = prop.parkade;
    let info = (
       <div>
            <ul className="button-container">
                <li><FaBolt/><br/>{ x.spot_count_regular - x.occupied_regular} available</li>
                <li><FaWheelchair/><br/>{ x.spot_count_handicap - x.occupied_handicap} available</li>
                <li><FaCreditCardAlt/><br/>$1.00/Kwh</li>  
            </ul>
            <ul>
                <li>
                    <MdAccessTime /> <strong>Open </strong> { x.open_time } Closes { x.close_time }
                </li>
                <li><MdDirectionsCar /> Total Spots: { x.spot_count_regular + x.spot_count_handicap}</li>
                <li> 
                    <table>
                    <tr>
                        <td>
                        <MdLocationOn/>
                        </td>
                        <td>
                        { x.street_line_1 }
                        { x.street_line_2 } <br/>
                        { x.city }, { x.province} { x.postal_code }
                        </td>
                    </tr>
                    </table>
                </li>
                <li>{ x.notes }</li>
            </ul>
        </div>
    );
    return info;
}

export default ParkadeInfo;