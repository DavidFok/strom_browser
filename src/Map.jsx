import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: 49.397, lng: -123.644 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} onClick={props.onMarkerClick} />}
  </GoogleMap>
)

// const MapComponent = ({ text }) => (
//   <div style={{
//     position: 'relative', color: 'white', background: 'red',
//     height: 40, width: 60, top: -20, left: -30,    
//   }}>
//     {text}
//   </div>
// );

class Map extends Component {
  // static defaultProps = {
  //   center: {lat: 59.95, lng: 30.33},
  //   zoom: 11
  // };

  render() {
    console.log('Rendering <Map/>');
    return (
      <MyMapComponent/>
      // <Map
      //   // bootstrapURLKeys={{ key: 'AIzaSyC-3t7jM3faz0mMqg90mIBtEr7YIhwPIoI' }}
      //   // defaultCenter={this.props.center}
      //   // defaultZoom={this.props.zoom}
      // >
      //   <Marker
      //     position={{lat: 59.955413, lng: 30.337844}}
      //     title={'Kreyser Avrora'}
      //   />
      // </Map>
    );
  }
}

export default Map;