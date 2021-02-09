//import "mapbox-gl/dist/mapbox-gl.css";
//import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { useRef, useState, useCallback } from "react";

import Header from "./Header";
import Map from "./Map";
import Sidebar from './Sidebar';
import './Sidebar.css';
let mapstyles = require('./mapstyles.json');


const polygonPaint = {
  "line-color": "black",
};

const tooClosePaint = {
  "fill-color": "#FF4136",
  "fill-opacity": 0.4,
  //'background': 'red'
};

const safeRingPaint = {
  "fill-color": "green",
  "fill-opacity": 0.7,
  //'background': 'green'
};

const locationPaint = {
  "fill-color": "#0074D9",
  "fill-opacity": 1,
  //'background': 'blue'
};

const nearbyPaint = {
  "fill-color": "#001f3f",
  "fill-opacity": 1,
  //'background': 'purple'
};

const App = () => {

  const [res6toggle, setRes6Toggle] = useState(false);
  const [res7toggle, setRes7Toggle] = useState(false);
  const [res8toggle, setRes8Toggle] = useState(false);
  const [res9toggle, setRes9Toggle] = useState(false);
  const [res10toggle, setRes10Toggle] = useState(false);
  const [sweetspotToggle, setSweetSpotToggle] = useState(false);
  const [mapstyle, setMapstyle] = useState(mapstyles.light);
  const geocoderContainerRef = useRef();
  const toggleswitchContainerRef = useRef();

  const handleSweetspotToggle = useCallback(
    (checked) => {
      setSweetSpotToggle(checked);
      console.log(sweetspotToggle)
    },
    [sweetspotToggle]
  );

  const handleRes6Toggle = useCallback(
    (checked) => {
      setRes6Toggle(checked);
    },
    [res6toggle]
  );

  const handleRes7Toggle = useCallback(
    (checked) => {
      setRes7Toggle(checked);
    },
    [res7toggle]
  );

  const handleRes8Toggle = useCallback(
    (checked) => {
      setRes8Toggle(checked);
    },
    [res8toggle]
  );

  const handleRes9Toggle = useCallback(
    (checked) => {
      setRes9Toggle(checked);
    },
    [res9toggle]
  );

  const handleRes10Toggle = useCallback(
    (checked) => {
      setRes10Toggle(checked);
    },
    [res10toggle]
  );

  const handleMapStyle = useCallback(
    (value) => {
      console.log(value);
      setMapstyle(value.target.value);
    },
    [mapstyle]
  );

  return (
    <div className="App" id="outer-container">
      <div id="page-wrap">
        <Header geocoderContainerRef={geocoderContainerRef} >
        </Header>
        <Sidebar
          pageWrapId={'page-wrap'}
          outerContainerId={'outer-container'}
          sweetspotToggle={sweetspotToggle}
          handleSweetspotToggle={handleSweetspotToggle}
          res6toggle={res6toggle}
          handleRes6Toggle={handleRes6Toggle}
          res7toggle={res7toggle}
          handleRes7Toggle={handleRes7Toggle}
          res8toggle={res8toggle}
          handleRes8Toggle={handleRes8Toggle}
          res9toggle={res9toggle}
          handleRes9Toggle={handleRes9Toggle}
          res10toggle={res10toggle}
          handleRes10Toggle={handleRes10Toggle}
          handleMapStyle={handleMapStyle}
          mapstyles={mapstyles}
        />
        <Map
          sweetspotToggle={sweetspotToggle}
          res6toggle={res6toggle}
          res7toggle={res7toggle}
          res8toggle={res8toggle}
          res9toggle={res9toggle}
          res10toggle={res10toggle}
          mapstyle={mapstyle}
          geocoderContainerRef={geocoderContainerRef}
        />
        <div id="hex-legend" class="legend">
          <h4>Hex Color Legend</h4>
          <div>
            <span style={{ background: "#0074D9" }}></span>Searched Location
          </div>
          <div>
            <span style={{ background: "black" }}></span>Helium Hotspot
          </div>
          <div>
            <span style={{ background: "#F66F67" }}></span>Too close to witness
          </div>
          {/*<div><span style={{background: 'green'}}></span>Sweet spot</div>*/}
        </div>
      </div>
    </div>
  );
};

export default App;
