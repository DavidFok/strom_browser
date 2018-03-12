import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `600px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={13}
    defaultCenter={{ lat: 49.26658, lng: -123.245233 }}
  >
    {props.parkades.map(function(parkade) {
        return (
          <Marker position={{ lat: parseFloat(parkade.latitude), lng: parseFloat(parkade.longitude) }} onClick={props.onMarkerClick} />
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
  
  componentDidUpdate(prevProps, prevState) {
    if (this.state.parkades !== this.props.parkades) {
      this.setState({parkades: this.props.parkades})
    }
  }

  render() {
    console.log('Rendering <Map/>');
    return (
      <MyMapComponent parkades={this.state.parkades} />
    );
  }
}

export default Map;