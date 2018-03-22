import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { compose, withProps, lifecycle, withHandlers, withState } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import MdClose from 'react-icons/lib/md/close';
import Drawer from 'material-ui/Drawer';
import ParkingSpotDisplay from './components/ParkingSpot.jsx';
import ParkadeInfo from './components/ParkadeInfo.jsx';
import mapStyle from './map-styles.json'
const _ = require("lodash");
const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox");
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");

const defaultMapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
  styles: mapStyle
};

const style = {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
}

// dynamically creating styles based on window size
const windowWidth = window.innerWidth;
let searchBoxWidth;
let margin;
let marginLeft;
let breakPoint = 500;

if (windowWidth < breakPoint) {
  searchBoxWidth = windowWidth * 0.9;
  marginLeft = 15;
  margin = 15;
} else {
  searchBoxWidth = breakPoint * 0.9;
  marginLeft = 25;
  margin = 25;
}

const searchBoxStyle = {
  boxSizing: 'border-box',
  border: '1px solid transparent',
  width: `${searchBoxWidth}px`,
  marginTop: `${margin}px`,
  marginLeft: `${marginLeft}px`,
  marginRight: `${margin}px`,
  padding: '10px 50px 10px 50px',
  borderRadius: '3px',
  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
  fontSize: '16px',
  outline: 'none',
  textOverflow: 'ellipses',
};


console.log('width: ', searchBoxStyle.width);
const MyMapComponent = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '100vh' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withState('zoom', 'onZoomChange', window.screen.availWidth < 400 ? 11.5 : 12.76),
  withHandlers(() => {
    const refs = {
      map: undefined
    };

    return {
      onMarkerClustererClick: () => (markerClusterer) => {
        const clickedMarkers = markerClusterer.getMarkers()  
      },

      onMapMounted: () => ref => {
        refs.map = ref
      },

      onZoomChanged: ({ onZoomChange }) => () => {
        onZoomChange(refs.map.getZoom())
      }
    }

  }),
  lifecycle({
    componentWillMount() {
      const refs = {}

      this.setState({
        bounds: null,
        center: {
          lat: 49.2799, lng: -123.1121
        },
        markers: [],
     
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const bounds = new google.maps.LatLngBounds();

          places.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport)
            } else {
              bounds.extend(place.geometry.location)
            }
          });
          const nextMarkers = places.map(place => ({
            position: place.geometry.location,
          }));
          const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

          this.setState({
            center: nextCenter,
            markers: nextMarkers,
            zoom: 18
          });
        },
      })
    },
  }),
  withScriptjs,
  withGoogleMap
  
)((props) =>
  <GoogleMap
    // defaultZoom={window.screen.availWidth < 400 ? 11.5 : 12.76}
    // defaultCenter={{ lat: 40.261980, lng: -123.000000 }}
    zoom={props.zoom}
    ref={props.onMapMounted}
    onZoomChanged={props.onZoomChanged}
    defaultOptions={defaultMapOptions}
    center={props.center}
    onBoundsChanged={props.onBoundsChanged}
  >
    <SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={google.maps.ControlPosition.TOP_LEFT}
      onPlacesChanged={props.onPlacesChanged}
      className="navbar"
    > 
    <div
      className="container"
    >
      <input
        type="text"
        placeholder="Enter a location"
        style={searchBoxStyle}
      />
    </div>
    </SearchBox>

    <MarkerClusterer
      onClick={props.onMarkerClustererClick}
      averageCenter
      enableRetinaIcons
      gridSize={80}
      defaultMinimumClusterSize={6}
    >
    {props.parkades.map(function(parkade) {
      return (
        <Marker 
          position={{ lat: parseFloat(parkade.latitude), lng: parseFloat(parkade.longitude) }} 
          onClick={() => props.onMarkerClick(parkade)} 
          options={props.iconColor(parkade)}
          visible={parkade.show}
        />
      );
    })}
    </MarkerClusterer>
  </GoogleMap>
)

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parkades: props.parkades,
      spots: undefined,
      infoOpen: false,
      currentParkade: null
    };
  }
  
  onMarkerClick(parkade) {
    this.setState({
      infoOpen: !this.state.infoOpen,
      currentParkade: parkade
    });

    // request parking spot data from the server
    this.props.getSpotData(parkade.id);
  }

  handleClose(){
    this.setState({infoOpen: false});
  }

  iconColor(parkade) {
    let occupied = parkade.occupied_regular;
    let usage = occupied / parkade.spot_count_regular;
    let path = 'M 96.63,41.82 C 96.63,41.82 126.47,41.82 126.47,41.82 126.47,41.82 126.47,44.48 126.47,44.48 126.47,50.64 122.69,55.92 117.30,58.14 116.22,58.60 115.53,59.68 115.53,60.86 115.53,60.86 115.53,67.02 115.53,67.02 115.53,67.02 114.41,67.02 114.41,67.02 114.41,67.02 114.41,95.99 114.41,95.99 114.41,102.50 109.10,107.81 102.57,107.81 96.07,107.81 90.77,102.50 90.77,95.99 90.77,95.99 90.77,65.34 90.77,65.34 90.77,65.34 78.74,53.58 78.74,53.58 78.74,53.58 78.71,62.36 78.71,62.36 78.71,62.36 78.70,75.06 78.70,75.06 78.70,75.06 78.70,103.54 78.70,103.54 78.70,103.54 86.95,103.54 86.95,103.54 88.04,103.54 88.93,104.43 88.93,105.53 88.93,105.53 88.93,115.66 88.93,115.66 88.93,115.66 0.00,115.66 0.00,115.66 0.00,115.66 0.00,115.62 0.00,115.62 0.00,115.62 0.00,115.56 0.00,115.56 0.00,115.56 0.00,105.53 0.00,105.53 0.00,104.43 0.89,103.54 1.99,103.54 1.99,103.54 10.23,103.54 10.23,103.54 10.23,103.54 10.23,103.32 10.23,103.32 10.23,103.32 10.23,18.71 10.23,18.71 10.23,15.18 13.07,12.34 16.59,12.34 16.59,12.34 72.33,12.34 72.33,12.34 75.86,12.34 78.70,15.18 78.70,18.71 78.70,18.71 78.70,46.11 78.70,46.11 78.70,46.11 96.05,63.12 96.05,63.12 96.05,63.12 96.05,95.99 96.05,95.99 96.05,99.59 98.98,102.52 102.57,102.52 106.17,102.52 109.11,99.59 109.11,95.99 109.11,95.99 109.11,67.02 109.11,67.02 109.11,67.02 107.56,67.02 107.56,67.02 107.56,67.02 107.56,60.86 107.56,60.86 107.56,59.68 106.87,58.60 105.79,58.14 100.40,55.92 96.63,50.64 96.63,44.48 96.63,43.22 96.63,41.82 96.63,41.82 96.63,41.82 96.63,41.82 96.63,41.82 Z M 102.46,47.42 C 102.19,47.33 101.88,47.33 101.60,47.46 101.00,47.75 100.73,48.46 101.02,49.05 101.69,50.52 102.64,51.82 103.82,52.94 104.99,54.06 106.35,54.94 107.85,55.56 107.99,55.61 108.16,55.65 108.30,55.65 108.77,55.65 109.22,55.36 109.40,54.89 109.66,54.29 109.37,53.59 108.75,53.34 107.52,52.83 106.42,52.12 105.46,51.20 104.51,50.30 103.73,49.23 103.19,48.04 103.12,47.89 103.02,47.77 102.90,47.67 102.90,47.66 102.90,47.66 102.90,47.66 102.79,47.56 102.66,47.49 102.52,47.44 102.50,47.43 102.48,47.43 102.46,47.42 Z M 48.23,94.83 C 48.23,94.83 55.33,86.21 55.33,86.21 55.33,86.21 52.10,85.33 52.10,85.33 52.10,85.33 44.16,83.20 44.16,83.20 44.16,83.20 46.87,71.10 47.08,70.18 47.08,70.18 33.61,86.51 33.61,86.51 33.61,86.51 36.86,87.40 36.86,87.40 36.86,87.40 44.79,89.52 44.79,89.52 44.79,89.52 41.88,102.48 41.88,102.48 41.88,102.48 48.23,94.83 48.23,94.83 Z M 35.12,25.06 C 35.12,25.06 31.94,25.05 31.94,25.05 31.94,25.05 22.94,25.05 22.94,25.05 22.94,25.05 22.94,58.22 22.94,58.22 22.94,58.22 65.99,58.22 65.99,58.22 65.99,58.22 65.99,25.05 65.99,25.05 65.99,25.05 59.46,25.05 59.46,25.05 59.46,25.05 43.58,48.31 43.58,48.31 43.07,49.05 42.26,49.45 41.41,49.45 40.88,49.45 40.36,49.31 39.91,49.00 38.70,48.17 38.39,46.52 39.22,45.31 39.22,45.31 53.03,25.09 53.03,25.09 53.03,25.09 51.84,25.06 51.84,25.06 51.84,25.06 49.61,25.05 49.61,25.05 49.61,25.05 43.31,25.05 43.31,25.05 43.31,25.05 35.68,36.20 35.68,36.20 35.17,36.96 34.34,37.36 33.49,37.36 32.99,37.36 32.46,37.21 31.99,36.91 30.80,36.08 30.49,34.43 31.31,33.22 31.31,33.22 36.86,25.09 36.86,25.09 36.86,25.09 35.12,25.06 35.12,25.06 Z M 128.00,35.93 C 128.00,35.93 128.00,37.35 128.00,37.35 128.00,38.38 127.15,39.23 126.12,39.23 126.12,39.23 96.97,39.23 96.97,39.23 95.94,39.23 95.09,38.38 95.09,37.35 95.09,37.35 95.09,35.93 95.09,35.93 95.09,34.89 95.94,34.04 96.97,34.04 96.97,34.04 126.12,34.04 126.12,34.04 127.15,34.04 128.00,34.89 128.00,35.93 Z M 120.83,25.03 C 120.83,25.03 120.83,31.55 120.83,31.55 120.83,31.55 115.52,31.55 115.52,31.55 115.52,31.55 115.52,25.03 115.52,25.03 115.52,23.57 116.71,22.38 118.17,22.38 119.64,22.38 120.83,23.57 120.83,25.03 120.83,25.03 120.83,25.03 120.83,25.03 Z M 107.58,31.55 C 107.58,31.55 102.26,31.55 102.26,31.55 102.26,31.55 102.26,25.03 102.26,25.03 102.26,23.57 103.45,22.38 104.92,22.38 106.38,22.38 107.58,23.57 107.58,25.03 107.58,25.03 107.58,31.55 107.58,31.55 Z';
    if (usage < 0.5) {
      return {icon: {
        path: path,
        scale: 0.23,
        strokeColor: 'white',
        fillColor: 'green',
        fillOpacity: 1,
        strokeWeight: 1.1
      }};
    } else if (usage < 1) {
      return {icon: {
        path: path,
        scale: 0.23,
        strokeColor: 'white',
        fillColor: 'orange',
        fillOpacity: 1,
        strokeWeight: 1.1
      }};
    } else {
      return {icon: {
        path: path,
        scale: 0.23,
        strokeColor: 'white',
        fillColor: 'red',
        fillOpacity: 1,
        strokeWeight: 1.1
      }}
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.parkades !== this.props.parkades) {
      console.log(this.props.parkades);
      this.setState({parkades: this.props.parkades})
    }
    // when Map.jsx receives new parking spots
    if (this.state.spots !== this.props.spots) {
      this.setState({spots: this.props.spots});
    }
  }

  render() {
    console.log('Rendering <Map/>');

    return (
      <div>
        <MyMapComponent className="map" parkades={this.state.parkades} iconColor={this.iconColor} onMarkerClick={this.onMarkerClick.bind(this)} />
        
        <Drawer
            docked={false}
            width={window.screen.availWidth < 400 ? '100%' : 400}
            disableSwipeToOpen={true}
            openSecondary={true}
            open={this.state.infoOpen}
            onRequestChange={(open) => this.setState({infoOpen: open})}
            containerStyle={style}
        >
        { this.state.currentParkade &&
          <div className="parkade-info">
            <div className="title">          
              <h2> { this.state.currentParkade.name }</h2>
              <MdClose className="close-button" onClick={this.handleClose.bind(this)}></MdClose>
            </div>
            {this.state.spots && 
            <ParkadeInfo parkade={this.state.currentParkade} price={this.state.spots[0].cents_per_kwh}/> }
            <div className="spot-info">
              { this.state.spots && <ParkingSpotDisplay spots={this.state.spots}/> }
            </div>
          </div>
        }
        </Drawer>
      </div>
    );
  }
}


export default Map;