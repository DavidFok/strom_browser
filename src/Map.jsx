import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';

const MapComponent = ({ text }) => (
  <div style={{
    position: 'relative', color: 'white', background: 'red',
    height: 40, width: 60, top: -20, left: -30,    
  }}>
    {text}
  </div>
);

class Map extends Component {
  static defaultProps = {
    center: {lat: 59.95, lng: 30.33},
    zoom: 11
  };

  render() {
    console.log('Rendering <Map/>');
    return (
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyC-3t7jM3faz0mMqg90mIBtEr7YIhwPIoI' }}
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
      >
        <MapComponent
          lat={59.955413}
          lng={30.337844}
          text={'Kreyser Avrora'}
        />
      </GoogleMapReact>
    );
  }
}

export default Map;