//import "mapbox-gl/dist/mapbox-gl.css";
//import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { useRef, useState, useCallback, useEffect } from "react";

import Header from "./Header";
import Map from "./Map";
import Sidebar from './Sidebar';
import Legend from "./Legend";
import "./index.css";
import './Sidebar.css';

let mapstyles = require('./mapstyles.json');

const App = () => {

  const [device, setDevice] = useState(!!navigator.maxTouchPoints ? 'mobile' : 'computer');
  const [res6toggle, setRes6Toggle] = useState(localStorage.getItem('res6toggle') === "true" || false);
  const [res7toggle, setRes7Toggle] = useState(localStorage.getItem('res7toggle') === "true" || false);
  const [res8toggle, setRes8Toggle] = useState(localStorage.getItem('res8toggle') === "true" || false);
  const [res9toggle, setRes9Toggle] = useState(localStorage.getItem('res9toggle') === "true" || false);
  const [res10toggle, setRes10Toggle] = useState(localStorage.getItem('res10toggle') === "true" || false);
  const [sweetspotToggle, setSweetSpotToggle] = useState(localStorage.getItem('sweetspottoggle') === "true" || true);
  const [locationRedzoneToggle, setLocationRedzoneToggle] = useState(localStorage.getItem('locationredzonetoggle') === "true" || true);
  const [redzoneToggle, setRedzoneToggle] = useState(false);
  const [mapstyle, setMapstyle] = useState(localStorage.getItem('mapstyle') || mapstyles.streets);
  const [trackuserToggle, setTrackuserToggle] = useState(false);
  const geocoderContainerRef = useRef();

useEffect(() => {
  localStorage.setItem("mapstyle", mapstyle)
}, [mapstyle]);

useEffect(() => {
  localStorage.setItem("sweetspottoggle", sweetspotToggle)
}, [sweetspotToggle]);

useEffect(() => {
  localStorage.setItem("redzonetoggle", redzoneToggle)
}, [redzoneToggle]);

useEffect(() => {
  localStorage.setItem("locationredzonetoggle", locationRedzoneToggle)
}, [locationRedzoneToggle]);

useEffect(() => {
  localStorage.setItem("res6toggle", res6toggle)
}, [res6toggle]);

useEffect(() => {
  localStorage.setItem("res7toggle", res7toggle)
}, [res7toggle]);

useEffect(() => {
  localStorage.setItem("res8toggle", res8toggle)
}, [res8toggle]);

useEffect(() => {
  localStorage.setItem("res9toggle", res9toggle)
}, [res9toggle]);

useEffect(() => {
  localStorage.setItem("res10toggle", res10toggle)
}, [res10toggle]);

const handleSweetspotToggle = useCallback(
  (checked) => {
    setSweetSpotToggle(checked);
  },
  []
);

const handleRedzoneToggle = useCallback(
  (checked) => {
    setRedzoneToggle(checked);
    if (checked){
      setLocationRedzoneToggle(!checked)
    };
  },
  []
);

const handleLocationRedzoneToggle = useCallback(
  (checked) => {
    setLocationRedzoneToggle(checked);
    if (checked) {
      setRedzoneToggle(!checked);
    }
  },
  []
);

const handleRes6Toggle = useCallback(
  (checked) => {
    setRes6Toggle(checked);
  },
  []
);

const handleRes7Toggle = useCallback(
  (checked) => {
    setRes7Toggle(checked);
  },
  []
);

const handleRes8Toggle = useCallback(
  (checked) => {
    setRes8Toggle(checked);
  },
  []
);

const handleRes9Toggle = useCallback(
  (checked) => {
    setRes9Toggle(checked);
  },
  []
);

const handleRes10Toggle = useCallback(
  (checked) => {
    setRes10Toggle(checked);
  },
  []
);

const handleMapStyle = useCallback(
  (value) => {
    setMapstyle(value.target.value);
  },
  []
);

const handleTrackuserToggle = useCallback(
  (checked) => {
    setTrackuserToggle(checked);
  },
  []
);

return (
  <div className="App">
    <Header geocoderContainerRef={geocoderContainerRef} >
    </Header>
    <Map
      sweetspotToggle={sweetspotToggle}
      redzoneToggle={redzoneToggle}
      locationRedzoneToggle={locationRedzoneToggle}
      res6toggle={res6toggle}
      res7toggle={res7toggle}
      res8toggle={res8toggle}
      res9toggle={res9toggle}
      res10toggle={res10toggle}
      mapstyle={mapstyle}
      geocoderContainerRef={geocoderContainerRef}
      trackuserToggle={trackuserToggle}
    />
    <Sidebar
      sweetspotToggle={sweetspotToggle}
      handleSweetspotToggle={handleSweetspotToggle}
      locationRedzoneToggle={locationRedzoneToggle}
      handleLocationRedzoneToggle={handleLocationRedzoneToggle}
      redzoneToggle={redzoneToggle}
      handleRedzoneToggle={handleRedzoneToggle}
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
      trackuserToggle={trackuserToggle}
      handleTrackuserToggle={handleTrackuserToggle}
      device={device}
    ></Sidebar>
    <Legend></Legend>
  </div>
);
};

export default App;
