//import "mapbox-gl/dist/mapbox-gl.css";
//import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { useRef } from "react";

import Header from "./Header";
import Map from "./Map";
import ResToggle from "./ResToggle";


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
  const toggleswitchContainerRef = useRef();
  return (
    <div>
      <div
        ref={toggleswitchContainerRef}
        style={{ position: "absolute", bottom: 400, left: 20, zIndex: 1 }}
      />
      <Header />
      <Map />
      <div id="hex-legend" class="legend">
        <h4>Hex Color Legend</h4>
        <div>
          <span style={{ background: "#0074D9" }}></span>Searched Location
          </div>
        <div>
          <span style={{ background: "#001f3f" }}></span>Helium Hotspot
          </div>
        <div>
          <span style={{ background: "#FF4136" }}></span>Too close to witness
          </div>
        {/*<div><span style={{background: 'green'}}></span>Sweet spot</div>*/}
      </div>
      <ResToggle ref={toggleswitchContainerRef}/>
    </div>
  );
};

export default App;
