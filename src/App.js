//import "mapbox-gl/dist/mapbox-gl.css";
//import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { useRef, useState, useCallback, useEffect } from "react";

import Header from "./components/Header";
import Map from "./components/Map";
import Sidebar from './components/Sidebar';
import Donatebar from './components/Donatebar';
import Legend from "./components/Legend";
import RewardLegend from "./components/RewardLegend";
import "./index.css";

let mapstyles = require('./mapstyles.json');

const App = () => {

  const [device, setDevice] = useState(!!navigator.maxTouchPoints ? 'mobile' : 'computer');
  const [locationHexToggle, setLocationHexToggle] = useState(false);
  
  const [res4toggle, setRes4Toggle] = useState(localStorage.getItem('res4toggle') === "true" || false);
  const [res5toggle, setRes5Toggle] = useState(localStorage.getItem('res5toggle') === "true" || false);
  const [res6toggle, setRes6Toggle] = useState(localStorage.getItem('res6toggle') === "true" || false);
  const [res7toggle, setRes7Toggle] = useState(localStorage.getItem('res7toggle') === "true" || false);
  const [res8toggle, setRes8Toggle] = useState(localStorage.getItem('res8toggle') === "true" || false);
  const [res9toggle, setRes9Toggle] = useState(localStorage.getItem('res9toggle') === "true" || false);
  const [res10toggle, setRes10Toggle] = useState(localStorage.getItem('res10toggle') === "true" || false);


  //const [sweetspotToggle, setSweetSpotToggle] = useState(localStorage.getItem('sweetspottoggle') === "true" || false);
  const [locationRedzoneToggle, setLocationRedzoneToggle] = useState(localStorage.getItem('locationredzonetoggle') === "true" || true);
  const [redzoneToggle, setRedzoneToggle] = useState(false);
  const [mapstyle, setMapstyle] = useState(localStorage.getItem('mapstyle') || mapstyles.streets);
  const [trackuserToggle, setTrackuserToggle] = useState(false);
  const geocoderContainerRef = useRef();

  useEffect(() => {
    localStorage.setItem("mapstyle", mapstyle)
  }, [mapstyle]);

  /*
  useEffect(() => {
    localStorage.setItem("sweetspottoggle", sweetspotToggle)
  }, [sweetspotToggle]);
*/
  useEffect(() => {
    localStorage.setItem("redzonetoggle", redzoneToggle)
  }, [redzoneToggle]);

  useEffect(() => {
    localStorage.setItem("locationredzonetoggle", locationRedzoneToggle)
  }, [locationRedzoneToggle]);

  useEffect(() => {
    localStorage.setItem("locationHexToggle", locationHexToggle)
  }, [locationHexToggle]);

  useEffect(() => {
    localStorage.setItem("res4toggle", res4toggle)
  }, [res4toggle]);

  useEffect(() => {
    localStorage.setItem("res5toggle", res5toggle)
  }, [res5toggle]);

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

  /*
  const handleSweetspotToggle = useCallback(
    (checked) => {
      setSweetSpotToggle(checked);
    },
    []
  );
*/
  const handleRedzoneToggle = useCallback(
    (checked) => {
      setRedzoneToggle(checked);
      if (checked) {
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

  const handleRes4Toggle = useCallback(
    (checked) => {
      setRes4Toggle(checked);
    },
    []
  );

  const handleRes5Toggle = useCallback(
    (checked) => {
      setRes5Toggle(checked);
    },
    []
  );

  const handleRes6Toggle = useCallback(
    (checked) => {
      setRes6Toggle(checked);
    },
    []
  );

  const handleLocationHexToggle = useCallback(
    (checked) => {
      setLocationHexToggle(checked);
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
      <Header
        geocoderContainerRef={geocoderContainerRef}
        device={device} 
      />
      <Map
        //sweetspotToggle={sweetspotToggle}
        redzoneToggle={redzoneToggle}
        locationRedzoneToggle={locationRedzoneToggle}
        locationHexToggle={locationHexToggle}
        res4toggle={res4toggle}
        res5toggle={res5toggle}
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
        //sweetspotToggle={sweetspotToggle}
        //handleSweetspotToggle={handleSweetspotToggle}
        locationRedzoneToggle={locationRedzoneToggle}
        handleLocationRedzoneToggle={handleLocationRedzoneToggle}
        redzoneToggle={redzoneToggle}
        handleRedzoneToggle={handleRedzoneToggle}
        locationHexToggle={locationHexToggle}
        handleLocationHexToggle={handleLocationHexToggle}

        res4toggle={res4toggle}
        handleRes4Toggle={handleRes4Toggle}
        res5toggle={res5toggle}
        handleRes5Toggle={handleRes5Toggle}
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
      />
      <Donatebar device={device} />
      <Legend/>
      <RewardLegend/>
    </div>
  );
};

export default App;
