//import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { useState, useRef, useCallback, useEffect, useMemo, memo } from "react";
//import { render } from "react-dom";
import { GeolocateControl, NavigationControl, Source, Layer, Popup } from "react-map-gl";
import MapGL from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import mapboxgl from "mapbox-gl"; // This is a dependency of react-map-gl even if you didn't explicitly install it
import Switch from "react-switch";


import { geoToH3, h3ToGeoBoundary } from "h3-js";
import { kRing, hexRing } from "h3-js";

import HotSpotInfo from "./HotspotInfo";
import Footer from  "./Footer";
import Header from "./Header";
//import hotspots from './hotspots.json';
import mapstyles from "./mapstyles.json";

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

// Please be a decent human and don't abuse my Mapbox API token.
// If you fork this sandbox, replace my API token with your own.
// Ways to set Mapbox token: https://uber.github.io/react-map-gl/#/Documentation/getting-started/about-mapbox-tokens

const MAPBOX_TOKEN =
  "pk.eyJ1IjoicmFkcm9iIiwiYSI6ImNrYndpYTJ4ZjBnYWkzNG5zMzFhYnVoN2IifQ.gE5y3Jl_13TTk6Q71wLNnQ";

const polygonPaint = {
  'line-color': 'black'
};

const tooClosePaint = {
  'fill-color': '#FF4136',
  'fill-opacity': 0.4,
  //'background': 'red'
}

const safeRingPaint = {
  'fill-color': 'green',
  'fill-opacity': 0.7,
  //'background': 'green'
}

const locationPaint = {
  'fill-color': '#0074D9',
  'fill-opacity': 1,
  //'background': 'blue'
}

const nearbyPaint = {
  'fill-color': '#001f3f',
  'fill-opacity': 1,
  //'background': 'purple'
}

const createHotspotsGeojson = (hotspots) => {
  const features = [];
  var i;
  for (i = 0; i < hotspots.length; i++) {
    //console.log(hotspots[i]);
    features.push({
      type: 'Feature',
      properties: {
        title: hotspots[i].name,
        name: hotspots[i].name
      },
      geometry: {
        type: "Point",
        coordinates: [hotspots[i].longitude, hotspots[i].latitude]
      }
    })

  }

  const geojson = {
    type: 'FeatureCollection',
    features: features
  };
  //console.log(geojson);
  return geojson;
}

const positionOptions = { enableHighAccuracy: true };
const navStyle = {
  position: 'absolute',
  top: 36,
  left: 0,
  padding: '10px'
};


let hotspots = [];
let hotspotsGeojson = [];
const hashtagLocation = window.location.hash.substr(1);

const App = () => {
  useEffect(() => {
    fetch("https://helium-place-hotstpots.s3.amazonaws.com/hotspots.json")
      .then(response => response.json())
      .then(hotspots_data => {
        //console.log("First hotspot: ", hotspots[0]); 
        hotspots = hotspots_data;
        hotspotsGeojson = createHotspotsGeojson(hotspots);
        if (hashtagLocation ){
          console.log(hashtagLocation);
          console.log(hotspots);
          var hotspot = hotspots.find(function (element) {
            return element.name === hashtagLocation;
          });
          //console.log(hotspot);
          handleOnResult({coords: {longitude: hotspot.longitude, latitude: hotspot.latitude}})
          setViewport({longitude: hotspot.longitude, latitude: hotspot.latitude, zoom: 15})
        }
      })
  }, []);

  const [viewport, setViewport] = useState({
    latitude: 40.229447620978966,
    longitude: -98.84343917535838,
    zoom: 4
  });
  const mapRef = useRef();
  const geocoderContainerRef = useRef();
  const toggleswitchContainerRef = useRef();
  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );
  const [res7Data, setRes7Data] = useState();
  const [res8Data, setRes8Data] = useState();
  const [res9Data, setRes9Data] = useState();
  const [res10Data, setRes10Data] = useState();
  const [res11SafeRing, setRes11SafeRing] = useState();
  const [res11TooClose, setRes11TooClose] = useState();
  const [res12location, setRes12Location] = useState();
  const [nearbyHotspots, setNearbyHotspots] = useState();
  const [hoveredFeature, setHoveredFeature] = useState();
  const [x, setX] = useState();
  const [y, setY] = useState();
  const [res8toggle, setRes8Toggle] = useState(false);
  const [res7toggle, setRes7Toggle] = useState(false);
  const [res9toggle, setRes9Toggle] = useState(false);
  const [res10toggle, setRes10Toggle] = useState(false);
  const [sweetspotToggle, setSweetSpotToggle] = useState(false);

  const [location, setLocation] = useState({
    latitude: '',
    longitude: '',
    res8hex: '',
    res12hex: ''
  });

  const _onHover = useCallback((event) => {
    const {
      features,
      srcEvent: {
        offsetX,
        offsetY
      }
    } = event;
    const hotspotFeature = features && features.find(f => f.layer.id === 'hotspots');
    //const hexFeatureTooClose = features && features.find(f => f.layer.id === 'tooclose');
    //const hexFeatureSafe = features && features.find(f => f.layer.id === 'safedistance');

    let hoveredFeature = null;
    if(typeof hotspotFeature != "undefined"){
      //console.log(hotspotFeature);
      hoveredFeature = hotspotFeature;
      setX(offsetX);
      setY(offsetY);
      setHoveredFeature(hoveredFeature);
      console.log(hoveredFeature);
    }
    else {
      setHoveredFeature(null);
    }
  });

  const _renderTooltip = useCallback(() => {
    return (
      hoveredFeature && (
        <Popup
          tipSize={8}
          anchor="top"
          longitude={hoveredFeature.properties.longitude}
          latitude={hoveredFeature.properties.latitude}
          closeButton={true}
          closeOnClick={true}
        >
          <HotSpotInfo info={hoveredFeature} />
        </Popup>
      )
    );
  },[hoveredFeature]);

  const updateNearbyHotspots = (value) => {
    console.log("NearbyHotspots:", value);
    if (typeof value != "undefined") {
      setNearbyHotspots(value);
    }
  };

  const updateRes12Location = (value) => {
    console.log("res12location:", value);
    if (typeof value != "undefined") {
      setRes12Location(value);
    }
  };

  const updateLocation = (value) => {
    console.log(value);
    if (typeof value != "undefined") {
      setLocation(value);
    }
  };

  const updateRes11SafeRing = (value) => {
    console.log("res11SafeRing:", value);
    if (typeof value != "undefined") {
      setRes11SafeRing(value);
    }
  };

  const updateRes11TooClose = (value) => {
    console.log("res11TooClose:", value);
    if (typeof value != "undefined") {
      setRes11TooClose(value);
    }
  };

  const updateRes8Data = (value) => {
    console.log("res8Data:", value);
    if (typeof value != "undefined") {
      setRes8Data(value);
    }
  };

  const updateRes7Data = (value) => {
    if (typeof value != "undefined") {
      setRes7Data(value);
    }
  };

  const updateRes9Data = (value) => {
    if (typeof value != "undefined") {
      setRes9Data(value);
    }
  };

  const updateRes10Data = (value) => {
    if (typeof value != "undefined") {
      setRes10Data(value);
    }
  };

  const handleOnResult = useCallback(
    (newlocation) => {
      console.log(newlocation);
      //console.log(geoToH3(location.result.geometry.coordinates[1], location.result.geometry.coordinates[0], 8))
      let newlatitude =  0;
      let newlongitude = 0;
      let res7hex = null;
      let res8hex = null;
      let res9hex = null;
      let res10hex = null;
      let res12hex = null;
      let res11hex = null;
      try {
        newlatitude = newlocation.result.geometry.coordinates[0];
        newlongitude = newlocation.result.geometry.coordinates[1];
        res7hex = geoToH3(newlocation.result.geometry.coordinates[1], newlocation.result.geometry.coordinates[0], 7);
        res8hex = geoToH3(newlocation.result.geometry.coordinates[1], newlocation.result.geometry.coordinates[0], 8);
        res9hex = geoToH3(newlocation.result.geometry.coordinates[1], newlocation.result.geometry.coordinates[0], 9);
        res10hex = geoToH3(newlocation.result.geometry.coordinates[1], newlocation.result.geometry.coordinates[0], 10);
        res12hex = geoToH3(newlocation.result.geometry.coordinates[1], newlocation.result.geometry.coordinates[0], 12);
        res11hex = geoToH3(newlocation.result.geometry.coordinates[1], newlocation.result.geometry.coordinates[0], 11);
      }
      catch {
        console.log("handleOnResult: Geolocate")
        newlatitude = newlocation.coords.latitude;
        newlongitude = newlocation.coords.longitude;
        res7hex = geoToH3(newlocation.coords.latitude, newlocation.coords.longitude, 7);
        res8hex = geoToH3(newlocation.coords.latitude, newlocation.coords.longitude, 8);
        res9hex = geoToH3(newlocation.coords.latitude, newlocation.coords.longitude, 9);
        res10hex = geoToH3(newlocation.coords.latitude, newlocation.coords.longitude, 10);
        res12hex = geoToH3(newlocation.coords.latitude, newlocation.coords.longitude, 12);
        res11hex = geoToH3(newlocation.coords.latitude, newlocation.coords.longitude, 11);
      }
      //const res8neighbors = kRing(res8hex,1);
      //console.log(res8neighbors);
      const updatedlocation = {
        latitude: newlatitude,
        longitude: newlongitude,
        res8hex: res8hex,
        res12hex: res12hex,
        res11hex: res11hex,
        res7hex: res7hex,
        res9hex: res9hex,
        res10hex: res10hex
        //res8neighbors: res8neighbors
      };
      //console.log(updatedlocation.res8neighbors);
      updateLocation(updatedlocation);
      const res7hexes = kRing(updatedlocation.res7hex, 1);
      const res8hexes = kRing(updatedlocation.res8hex, 5);
      const res9hexes = kRing(updatedlocation.res9hex, 8);
      const res10hexes = kRing(updatedlocation.res10hex, 10);
      const nearbyHotspots = [];
      var n;
      for (n=0; n < res8hexes.length;n++){
        var res8 = res8hexes[n];
        for (var i in hotspots){
          if (hotspots[i].res8_location === res8){
            nearbyHotspots.push({
              location: hotspots[i].location,
              name: hotspots[i].name,
              longitude: hotspots[i].longitude,
              latitude: hotspots[i].latitude,
              address: hotspots[i].address,
              rewardScale: hotspots[i].reward_scale
            })
          }
        }
      }
      //console.log("nearbyHotspots: ", nearbyHotspots);
      var i;
      var features = []
      for (i = 0; i < nearbyHotspots.length; i++) {
        let hexBoundary = h3ToGeoBoundary(nearbyHotspots[i].location)
        hexBoundary.push(hexBoundary[0])

        let arr = []
        for (const i of hexBoundary) {
          arr.push([i[1], i[0]])
        }
        console.log(nearbyHotspots[i]);
        features.push({
          type: 'Feature',
          properties: {
            title: nearbyHotspots[i].name,
            name: nearbyHotspots[i].name,
            latitude: nearbyHotspots[i].latitude,
            longitude: nearbyHotspots[i].longitude,
            address: nearbyHotspots[i].address,
            rewardScale: nearbyHotspots[i].rewardScale
          },
          geometry: {
            type: "Polygon",
            coordinates: [arr]
          }
        })
      }
      const nearbygeojson = {
        type: 'FeatureCollection',
        features: features
      };
      updateNearbyHotspots(nearbygeojson);

      const res11closehexes = kRing(updatedlocation.res11hex, 7);
      const res11safehexes = []
      res11safehexes.push(hexRing(updatedlocation.res11hex, 8));
      res11safehexes.push(hexRing(updatedlocation.res11hex, 9));
      res11safehexes.push(hexRing(updatedlocation.res11hex, 10));
      res11safehexes.push(hexRing(updatedlocation.res11hex, 11));

      // Get all  res 7 neighbor boundaries
      if (typeof res7hexes !== 'undefined' && res7hexes.length > 0) {
        let res7hexboundaries = [];
        var i;
        for (i = 0; i < res8hexes.length; i++) {
          let hexBoundary = h3ToGeoBoundary(res7hexes[i])
          hexBoundary.push(hexBoundary[0])

          let arr = []
          for (const i of hexBoundary) {
            arr.push([i[1], i[0]])
          }
          res7hexboundaries.push(arr)
        }

        var i;
        var features = []
        for (i = 0; i < res7hexboundaries.length; i++) {
          features.push({
            type: 'Feature',
            geometry: {
              type: "Polygon",
              coordinates: [res7hexboundaries[i]]
            }
          })
        }
        const geojson = {
          type: 'FeatureCollection',
          features: features
        };
        updateRes7Data(geojson);
      }

      // Get all  res 8 neighbor boundaries
      if (typeof res8hexes !== 'undefined' && res8hexes.length > 0) {
        let res8hexboundaries = [];
        var i;
        for (i = 0; i < res8hexes.length; i++) {
          let hexBoundary = h3ToGeoBoundary(res8hexes[i])
          hexBoundary.push(hexBoundary[0])

          let arr = []
          for (const i of hexBoundary) {
            arr.push([i[1], i[0]])
          }
          res8hexboundaries.push(arr)
        }

        var i;
        var features = []
        for (i = 0; i < res8hexboundaries.length; i++) {
          features.push({
            type: 'Feature',
            geometry: {
              type: "Polygon",
              coordinates: [res8hexboundaries[i]]
            }
          })
        }
        const geojson = {
          type: 'FeatureCollection',
          features: features
        };
        updateRes8Data(geojson);
      }

      // Get all res 9 neighbor boundaries
      if (typeof res9hexes !== 'undefined' && res9hexes.length > 0) {
        let res9hexboundaries = [];
        var i;
        for (i = 0; i < res9hexes.length; i++) {
          let hexBoundary = h3ToGeoBoundary(res9hexes[i])
          hexBoundary.push(hexBoundary[0])

          let arr = []
          for (const i of hexBoundary) {
            arr.push([i[1], i[0]])
          }
          res9hexboundaries.push(arr)
        }

        var i;
        var features = []
        for (i = 0; i < res9hexboundaries.length; i++) {
          features.push({
            type: 'Feature',
            geometry: {
              type: "Polygon",
              coordinates: [res9hexboundaries[i]]
            }
          })
        }
        const geojson = {
          type: 'FeatureCollection',
          features: features
        };
        updateRes9Data(geojson);
      }

            // Get all res 10 neighbor boundaries
      if (typeof res10hexes !== 'undefined' && res10hexes.length > 0) {
        let res10hexboundaries = [];
        var i;
        for (i = 0; i < res10hexes.length; i++) {
          let hexBoundary = h3ToGeoBoundary(res10hexes[i])
          hexBoundary.push(hexBoundary[0])

          let arr = []
          for (const i of hexBoundary) {
            arr.push([i[1], i[0]])
          }
          res10hexboundaries.push(arr)
        }

        var i;
        var features = []
        for (i = 0; i < res10hexboundaries.length; i++) {
          features.push({
            type: 'Feature',
            geometry: {
              type: "Polygon",
              coordinates: [res10hexboundaries[i]]
            }
          })
        }
        const geojson = {
          type: 'FeatureCollection',
          features: features
        };
        updateRes10Data(geojson);
      }

      // Get all res 9 neighbor boundaries
      if (typeof res9hexes !== 'undefined' && res9hexes.length > 0) {
        let res9hexboundaries = [];
        var i;
        for (i = 0; i < res9hexes.length; i++) {
          let hexBoundary = h3ToGeoBoundary(res9hexes[i])
          hexBoundary.push(hexBoundary[0])

          let arr = []
          for (const i of hexBoundary) {
            arr.push([i[1], i[0]])
          }
          res9hexboundaries.push(arr)
        }

        var i;
        var features = []
        for (i = 0; i < res9hexboundaries.length; i++) {
          features.push({
            type: 'Feature',
            geometry: {
              type: "Polygon",
              coordinates: [res9hexboundaries[i]]
            }
          })
        }
        const geojson = {
          type: 'FeatureCollection',
          features: features
        };
        updateRes9Data(geojson);
      }      

      if (typeof res11closehexes !== 'undefined' && res11closehexes.length > 0) {
        let res11hexboundaries = [];
        var i;
        for (i = 0; i < res11closehexes.length; i++) {
          let hexBoundary = h3ToGeoBoundary(res11closehexes[i])
          hexBoundary.push(hexBoundary[0])

          let arr = []
          for (const i of hexBoundary) {
            arr.push([i[1], i[0]])
          }
          res11hexboundaries.push(arr)
        }

        var i;
        var features = []
        for (i = 0; i < res11hexboundaries.length; i++) {
          features.push({
            type: 'Feature',
            properties: {
              title: "Too Close",
              name: "Too Close",
              longitude: res11hexboundaries[i][0][0],
              latitude: res11hexboundaries[i][0][1]
            },
            geometry: {
              type: "Polygon",
              coordinates: [res11hexboundaries[i]]
            }
          })
        }
        const geojson = {
          type: 'FeatureCollection',
          features: features
        };
        updateRes11TooClose(geojson);
      }

      if (typeof res11safehexes !== 'undefined' && res11safehexes.length > 0) {
        let res11hexboundaries = [];
        var j;
        for (j = 0; j < res11safehexes.length; j++) {
          var i;
          for (i = 0; i < res11safehexes[j].length; i++) {
            let hexBoundary = h3ToGeoBoundary(res11safehexes[j][i])
            hexBoundary.push(hexBoundary[0])

            let arr = []
            for (const i of hexBoundary) {
              arr.push([i[1], i[0]])
            }
            res11hexboundaries.push(arr)
          }
        }

        var i;
        var features = []
        for (i = 0; i < res11hexboundaries.length; i++) {
          features.push({
            type: 'Feature',
            properties: {
              title: "Safe distance",
              name: "Safe distance",
              longitude: res11hexboundaries[i][0][0],
              latitude: res11hexboundaries[i][0][1]
            },
            geometry: {
              type: "Polygon",
              coordinates: [res11hexboundaries[i]]
            }
          })
        }
        const geojson = {
          type: 'FeatureCollection',
          features: features
        };
        updateRes11SafeRing(geojson);
      }

      let hexBoundary = h3ToGeoBoundary(res12hex)
      hexBoundary.push(hexBoundary[0])

      let arr = []
      for (const i of hexBoundary) {
        arr.push([i[1], i[0]])
      }
      //console.log(arr);
      const geojson = {
        type: 'Feature',
        properties: {
            title: "Searched Location",
            name: "Searched Location"
        },
        geometry: {
          type: "Polygon",
          coordinates: [arr]
        }        
      };
      updateRes12Location(geojson);
    },
    []
  );

  const mapClick = (event) => {
    console.log(event);
    const newlocation = {
      coords: {
        latitude: event.lngLat[1],
        longitude: event.lngLat[0],
        zoom: 16, 
        //transitionInterpolator: ViewportFlyToInterpolator, 
        transitionDuration: 3000
      }
    }
    //handleOnGeolocate(newlocation);
    handleOnResult(newlocation);
    if(window.history.pushState) {
      window.history.pushState('', '/', window.location.pathname)
    } else {
      window.location.hash = '';
    }
  };

  /*
  const handleOnGeolocate = useCallback(
    (newlocation) => {
      console.log(newlocation);
      //console.log(geoToH3(location.result.geometry.coordinates[1], location.result.geometry.coordinates[0], 8))
      const newlatitude = newlocation.coords.latitude;
      const newlongitude = newlocation.coords.longitude;
      const res8hex = geoToH3(newlocation.coords.latitude, newlocation.coords.longitude, 8);
      const res12hex = geoToH3(newlocation.coords.latitude, newlocation.coords.longitude, 12);
      const res11hex = geoToH3(newlocation.coords.latitude, newlocation.coords.longitude, 11);
      //const res8neighbors = kRing(res8hex,1);
      //console.log(res8neighbors);
      const updatedlocation = {
        latitude: newlatitude,
        longitude: newlongitude,
        res8hex: res8hex,
        res12hex: res12hex,
        res11hex: res11hex,
        //res8neighbors: res8neighbors
      };
      //console.log(updatedlocation.res8neighbors);
      updateLocation(updatedlocation);
      const res8hexes = kRing(updatedlocation.res8hex, 1);
      const nearbyHotspots = [];
      var n;
      for (n=0; n < res8hexes.length;n++){
        var res8 = res8hexes[n];
        for (var i in hotspots){
          if (hotspots[i].res8_location === res8){
            nearbyHotspots.push({
              location: hotspots[i].location,
              name: hotspots[i].name,
              longitude: hotspots[i].longitude,
              latitude: hotspots[i].latitude,
              address: hotspots[i].address,
              rewardScale: hotspots[i].reward_scale
            })
          }
        }
      }
      console.log("nearbyHotspots: ", nearbyHotspots);
      var i;
      var features = []
      for (i = 0; i < nearbyHotspots.length; i++) {
        let hexBoundary = h3ToGeoBoundary(nearbyHotspots[i].location)
        hexBoundary.push(hexBoundary[0])

        let arr = []
        for (const i of hexBoundary) {
          arr.push([i[1], i[0]])
        }
        features.push({
          type: 'Feature',
          properties: {
            title: nearbyHotspots[i].name,
            name: nearbyHotspots[i].name,
            longitude: nearbyHotspots[i].longitude,
            latitude: nearbyHotspots[i].latitude,
            address: nearbyHotspots[i].address
          },
          geometry: {
            type: "Polygon",
            coordinates: [arr]
          }
        })
      }
      const nearbygeojson = {
        type: 'FeatureCollection',
        features: features
      };
      updateNearbyHotspots(nearbygeojson);
      const res11closehexes = kRing(updatedlocation.res11hex, 7);
      const res11safehexes = []
      res11safehexes.push(hexRing(updatedlocation.res11hex, 8));
      res11safehexes.push(hexRing(updatedlocation.res11hex, 9));
      res11safehexes.push(hexRing(updatedlocation.res11hex, 10));
      //console.log(res8hexes);
      if (typeof res8hexes !== 'undefined' && res8hexes.length > 0) {
        let res8hexboundaries = [];
        var i;
        for (i = 0; i < res8hexes.length; i++) {
          let hexBoundary = h3ToGeoBoundary(res8hexes[i])
          hexBoundary.push(hexBoundary[0])

          let arr = []
          for (const i of hexBoundary) {
            arr.push([i[1], i[0]])
          }
          res8hexboundaries.push(arr)
        }

        var i;
        var features = []
        for (i = 0; i < res8hexboundaries.length; i++) {
          features.push({
            type: 'Feature',
            geometry: {
              type: "Polygon",
              coordinates: [res8hexboundaries[i]]
            }
          })
        }
        const geojson = {
          type: 'FeatureCollection',
          features: features
        };
        updateRes8Data(geojson);
      }

      if (typeof res11closehexes !== 'undefined' && res11closehexes.length > 0) {
        let res11hexboundaries = [];
        var i;
        for (i = 0; i < res11closehexes.length; i++) {
          let hexBoundary = h3ToGeoBoundary(res11closehexes[i])
          hexBoundary.push(hexBoundary[0])

          let arr = []
          for (const i of hexBoundary) {
            arr.push([i[1], i[0]])
          }
          res11hexboundaries.push(arr)
        }

        var i;
        var features = []
        for (i = 0; i < res11hexboundaries.length; i++) {
          features.push({
            type: 'Feature',
            properties: {
              name: "Too Close",
              title:  "Too Close",
              longitude: res11hexboundaries[i][0][0],
              latitude: res11hexboundaries[i][0][1]
            },
            geometry: {
              type: "Polygon",
              coordinates: [res11hexboundaries[i]]
            }
          })
        }
        const geojson = {
          type: 'FeatureCollection',
          features: features
        };
        updateRes11TooClose(geojson);
      }

      if (typeof res11safehexes !== 'undefined' && res11safehexes.length > 0) {
        let res11hexboundaries = [];
        var j;
        for (j = 0; j < res11safehexes.length; j++) {
          var i;
          for (i = 0; i < res11safehexes[j].length; i++) {
            let hexBoundary = h3ToGeoBoundary(res11safehexes[j][i])
            hexBoundary.push(hexBoundary[0])

            let arr = []
            for (const i of hexBoundary) {
              arr.push([i[1], i[0]])
            }
            res11hexboundaries.push(arr)
          }
        }

        var i;
        var features = []
        for (i = 0; i < res11hexboundaries.length; i++) {
          features.push({
            type: 'Feature',
            properties: {
              title: "Safe distance",
              name: "Safe distance",
              longitude: res11hexboundaries[i][0][0],
              latitude: res11hexboundaries[i][0][1]
            },
            geometry: {
              type: "Polygon",
              coordinates: [res11hexboundaries[i]]
            }
          })
        }
        const geojson = {
          type: 'FeatureCollection',
          features: features
        };
        updateRes11SafeRing(geojson);
      }

      let hexBoundary = h3ToGeoBoundary(res12hex)
      hexBoundary.push(hexBoundary[0])

      let arr = []
      for (const i of hexBoundary) {
        arr.push([i[1], i[0]])
      }
      //console.log(arr);
      const geojson = {
        type: 'Feature',
        properties: {
            title: "Searched Location",
            name: "Searched Location"
        },
        geometry: {
          type: "Polygon",
          coordinates: [arr]
        }        
      };
      updateRes12Location(geojson);
    },
    [location]
  );
  */

    const handleRes7Toggle = useCallback((checked) =>{
      setRes7Toggle(checked);
    },[res7toggle]);
  
    const handleRes8Toggle = useCallback((checked) =>{
      setRes8Toggle(checked);
    },[res8toggle]);

    const handleRes9Toggle = useCallback((checked) =>{
      setRes9Toggle(checked);
    },[res9toggle]);

    const handleRes10Toggle = useCallback((checked) =>{
      setRes10Toggle(checked);
    },[res10toggle]);

    const handleSweetspotToggle = useCallback((checked) =>{
      setSweetSpotToggle(checked);
    },[sweetspotToggle]);

  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      console.log("handleGeocoderViewportChange: ", newViewport);
      if(window.history.pushState) {
        window.history.pushState('', '/', window.location.pathname)
      } else {
        window.location.hash = '';
      }
      const geocoderDefaultOverrides = { transitionDuration: 1000, zoom: 15 };

      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides
      });
    },
    [handleViewportChange]
  );

  
  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  const handleGeolocateViewportChange = useCallback(
    (newViewport) => {
      console.log(newViewport);
      const geolocateDefaultOverrides = { transitionDuration: 1000, zoom: 15 };

      return handleViewportChange({
        ...newViewport,
        ...geolocateDefaultOverrides
      });
    },
    [handleViewportChange]
  );

  const searchHotspots = useCallback((query) => {
    var matchingFeatures = [];
    console.log(hotspotsGeojson); 
    for (var i = 0; i < hotspotsGeojson.features.length; i++) {
      var feature = hotspotsGeojson.features[i];
      //console.log(feature);
      // handle queries with different capitalization than the source data by calling toLowerCase()
      if (
        feature.properties.title
          .toLowerCase()
          .search(query.toLowerCase()) !== -1
      ) {
        // add a tree emoji as a prefix for custom data results
        // using carmen geojson format: https://github.com/mapbox/carmen/blob/master/carmen-geojson.md
        feature['place_name'] = feature.properties.title;
        feature['center'] = feature.geometry.coordinates;
        feature['place_type'] = ['hotspot'];
        matchingFeatures.push(feature);
      }
    }
    return matchingFeatures;
  },[]);


  return (
    <div style={{ height: "90vh" }}>
      <div
        ref={geocoderContainerRef}
        style={{ position: "absolute", top: 70, right: 20, zIndex: 1 }}
      />
      <div
        ref={toggleswitchContainerRef}
        style={{ position: "absolute", bottom: 400, left: 20, zIndex: 1 }}
      />
      <Header />
      <MapGL
        mapboxApiAccessToken={MAPBOX_TOKEN}
        ref={mapRef}
        {...viewport}
        width="100%"
        height="100%"
        onViewportChange={setViewport}
        mapStyle={mapstyles.light}
        onHover={_onHover}
        onClick={mapClick}
      >
        {_renderTooltip()}
        
        {res12location && (
            <Source type="geojson" data={res12location}>
              <Layer type="fill" paint={locationPaint} />
            </Source>
          )}

        {res7Data && res7toggle && (
          <Source type="geojson" data={res7Data}>
            <Layer type="line" paint={polygonPaint} />
          </Source>
        )}

        {res8Data && res8toggle && (
          <Source type="geojson" data={res8Data}>
            <Layer type="line" paint={polygonPaint} />
          </Source>
        )}

        {res9Data && res9toggle && (
          <Source type="geojson" data={res9Data}>
            <Layer type="line" paint={polygonPaint} />
          </Source>
        )}

        {res10Data && res10toggle && (
          <Source type="geojson" data={res10Data}>
            <Layer type="line" paint={polygonPaint} />
          </Source>
        )}

        {res11SafeRing && sweetspotToggle && (
          <Source type="geojson" data={res11SafeRing}>
            <Layer id="safedistance" type="fill" paint={safeRingPaint} />
          </Source>
        )}

        {res11TooClose && (
          <Source type="geojson" data={res11TooClose}>
            <Layer id="tooclose" type="fill" paint={tooClosePaint} />
          </Source>
        )}

        {nearbyHotspots && (
          <Source type="geojson" data={nearbyHotspots}>
            <Layer id="hotspots" type="fill" paint={nearbyPaint} />
          </Source>
        )}
        <div id="hex-legend" class="legend">
          <h4>Hex Color Legend</h4>
          <div><span style={{background: '#0074D9'}}></span>Searched Location</div>
          <div><span style={{background: '#001f3f'}}></span>Helium Hotspot</div>
          <div><span style={{background: '#FF4136'}}></span>Too close to witness</div>
          {/*<div><span style={{background: 'green'}}></span>Sweet spot</div>*/}
        </div>

        {hotspots && (
          <Geocoder
              mapRef={mapRef}
              containerRef={geocoderContainerRef}
              onViewportChange={handleGeocoderViewportChange}
              mapboxApiAccessToken={MAPBOX_TOKEN}
              position="top-right"
              marker={false}
              //countries={"US,CA"}
              onResult={handleOnResult}
              reverseGeocode
              placeholder="Search for an address, GPS coords, or hotspot name"
              localGeocoder={searchHotspots}
              clearOnBlur={true}
              clearAndBlurOnEsc={true}
            />
        )}
        <div>
        <GeolocateControl
          positionOptions={positionOptions}
          style={{ position: 'absolute', right: 0, bottom: 0, margin: 10, marginBottom: 96 }}
          trackUserLocation={false}
          onViewportChange={handleGeolocateViewportChange}
          onGeolocate={handleOnResult}
        //auto
        />
        </div>
        <div className="nav" style={navStyle}>
          <NavigationControl
            showCompass={false}
            position={"top-right"}
          />
        </div>
      </MapGL>
      <div id="hex-toggle-legend" class="toggle-legend" containerRef={toggleswitchContainerRef}>
          <h4>Hex Resolution Toggle</h4>
          <div>
            <span >res 7</span>          
                <label htmlFor="material-switch">
                  <Switch
                    checked={res7toggle}
                    onChange={handleRes7Toggle}
                    onColor="#86d3ff"
                    onHandleColor="#2693e6"
                    handleDiameter={10}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                    height={12}
                    width={30}
                    className="react-switch"
                    id="material-switch"
                  />
              </label>
          </div>
          <div>
            <span >res 8</span>          
                <label htmlFor="material-switch">
                  <Switch
                    checked={res8toggle}
                    onChange={handleRes8Toggle}
                    onColor="#86d3ff"
                    onHandleColor="#2693e6"
                    handleDiameter={10}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                    height={12}
                    width={30}
                    className="react-switch"
                    id="material-switch"
                  />
              </label>
          </div>
          <div>
            <span >res 9</span>          
                <label htmlFor="material-switch">
                  <Switch
                    checked={res9toggle}
                    onChange={handleRes9Toggle}
                    onColor="#86d3ff"
                    onHandleColor="#2693e6"
                    handleDiameter={10}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                    height={12}
                    width={30}
                    className="react-switch"
                    id="material-switch"
                  />
              </label>
          </div>
          <div>
            <span>res 10</span>          
                <label htmlFor="material-switch">
                  <Switch
                    checked={res10toggle}
                    onChange={handleRes10Toggle}
                    onColor="#86d3ff"
                    onHandleColor="#2693e6"
                    handleDiameter={10}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                    height={12}
                    width={30}
                    className="react-switch"
                    id="material-switch"
                  />
              </label>
          </div>
          <div>
            <span>sweetspot</span>          
                <label htmlFor="material-switch">
                  <Switch
                    checked={sweetspotToggle}
                    onChange={handleSweetspotToggle}
                    onColor="#86d3ff"
                    onHandleColor="#2693e6"
                    handleDiameter={10}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                    height={12}
                    width={30}
                    className="react-switch"
                    id="material-switch"
                  />
              </label>
          </div>
        </div>
      <Footer />
    </div>
  );
};

export default App;
