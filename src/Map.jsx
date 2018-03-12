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
    <Marker position={{ lat: 49.26284100, lng: -123.25540100 }} onClick={props.onMarkerClick} />
  </GoogleMap>
)

class Map extends Component {

  render() {
    console.log('Rendering <Map/>');
    return (
      <MyMapComponent/>
    );
  }
}

export default Map;