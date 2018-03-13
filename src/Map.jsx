import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { compose, withProps, withHandlers } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import MdSearch from 'react-icons/lib/md/search';
import Drawer from 'material-ui/Drawer';

const MyMapComponent = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '100vh' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={13}
    defaultCenter={{ lat: 49.26658, lng: -123.245233 }}
  >
    {console.log(props.parkades)}
    {props.parkades.map(function(parkade) {
        return (
          <Marker 
            position={{ lat: parseFloat(parkade.latitude), lng: parseFloat(parkade.longitude) }} 
            onClick={() => props.onMarkerClick(parkade)} 
            options={props.iconColor(parkade)}
          />
        )
      })
    }
  </GoogleMap>
)

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parkades: props.parkades,
      infoOpen: false,
      currentParkade: null
    };
  }
  
  onMarkerClick(parkade) {
    this.setState({
      infoOpen: !this.state.infoOpen,
      currentParkade: parkade
    });
  }

  iconColor(parkade) {
    let occupied = parkade.occupied_regular;
    let usage = occupied / parkade.spot_count_regular;
    let path = 'M 51.25,44.58 C 48.76,46.86 45.27,48.00 40.77,48.00 40.77,48.00 23.00,48.00 23.00,48.00 23.00,48.00 23.00,20.00 23.00,20.00 23.00,20.00 40.77,20.00 40.77,20.00 45.27,20.00 48.76,21.06 51.25,23.17 53.75,25.28 55.00,28.80 55.00,33.73 55.00,38.68 53.75,42.30 51.25,44.58 Z M 65.80,11.25 C 60.34,6.42 53.02,4.00 43.84,4.00 43.84,4.00 4.00,4.00 4.00,4.00 4.00,4.00 4.00,97.00 4.00,97.00 4.00,97.00 23.00,97.00 23.00,97.00 23.00,97.00 23.00,64.00 23.00,64.00 23.00,64.00 42.42,64.00 42.42,64.00 52.55,64.00 60.35,61.71 65.81,57.14 71.27,52.56 74.00,44.74 74.00,33.69 74.00,23.55 71.27,16.07 65.80,11.25 Z'
    if (usage < 0.5) {
      return {icon: {
        path: path,
        scale: 0.2,
        strokeColor: 'white',
        fillColor: 'green',
        fillOpacity: 1,
        strokeWeight: 1
      }};
    } else if (usage < 1) {
      return {icon: {
        path: path,
        scale: 0.2,
        strokeColor: 'white',
        fillColor: 'orange',
        fillOpacity: 1,
        strokeWeight: 1
      }};
    } else {
      return {icon: {
        path: path,
        scale: 0.2,
        strokeColor: 'white',
        fillColor: 'red',
        fillOpacity: 1,
        strokeWeight: 1
      }}
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.parkades !== this.props.parkades) {
      this.setState({parkades: this.props.parkades})
    }
  }

  render() {
    console.log('Rendering <Map/>');
    return (
      <div>
        <MyMapComponent className="map" parkades={this.state.parkades} iconColor={this.iconColor} onMarkerClick={this.onMarkerClick.bind(this)} />
        
        <Drawer
            docked={false}
            width={"100%"}
            disableSwipeToOpen={true}
            openSecondary={true}
            open={this.state.infoOpen}
            onRequestChange={(open) => this.setState({infoOpen: open})}
        >
        { this.state.currentParkade &&
          <div>
            <h1> { this.state.currentParkade.name }</h1>
            <p>
              { this.state.currentParkade.street_line_1 }
              { this.state.currentParkade.street_line_2 }
              { this.state.currentParkade.city }
              { this.state.currentParkade.province}
              { this.state.currentParkade.postal_code }
            </p>
            <p> { this.state.currentParkade.spot_count_regular + this.state.currentParkade.spot_count_handicap } 
            </p>
          </div>
        }
        </Drawer>
      </div>
    );
  }
}


export default Map;