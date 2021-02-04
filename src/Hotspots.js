import * as React from "react";
import mapboxgl from "mapbox-gl"; 
import {
  Source,
  Layer,
} from "react-map-gl";

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const hotspotPaint = {
  "fill-color": "#001f3f",
  "fill-opacity": 1,
  //'background': 'purple'
};

const Hotspots = ({geojsondata}) => {
  console.log("Hotspots.js geojsondata:", geojsondata);
  return (
    <Source type="geojson" data={geojsondata}>
      <Layer type="fill" paint={hotspotPaint} />
    </Source>
  );
};

export default Hotspots;
