import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { compose, withProps, withHandlers } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

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
            onClick={props.onMarkerClick} 
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
      parkades: props.parkades
    };
  }
  
  iconColor(parkade) {
    let occupied = parkade.occupied_regular;
    let usage = occupied / parkade.spot_count_regular;
    if (usage < 0.5) {
      return {icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'};
    } else if (usage < 1) {
      return {icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'};
    } else {
      return {icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'};
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
      <MyMapComponent className="map" parkades={this.state.parkades} iconColor={this.iconColor}/>
    );
  }
}

export default Map;