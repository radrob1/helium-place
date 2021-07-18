
const polygonPaint = {
  "line-color": "black",
};

const darkmodePolygonPaint = {
  "line-color": "white",
};

const tooClosePaint = {
  //"fill-color": "#FF4136",
  //"fill-color": "#FC4445",
  "fill-color": "#F66F67",
  "fill-opacity": 0.8,
  "fill-outline-color": "#8b0000"
  //'background': 'red'
};


const safeRingPaint = {
  "fill-color": "#A8C686",
  //"fill-outline-color": "white",
  "fill-opacity": [
      'interpolate',
      ['linear'],
      ['get', 'ring'],
      8,
      0.9,
      10,
      0.8,
      12,
      0.7,
      14,
      0.6,
      16,
      0.5,
      18,
      0.3,
      20,
      0.1
  ],
  //'background': 'green'
};

const locationPaint = {
  "fill-color": "darkslategray",
  "fill-opacity": 1,
  //'background': 'blue'
};

const darkmodeLocationHexPaint = {
  "fill-color": "white",
  "fill-opacity": 0.1
};

const locationHexesPaint = {
  "fill-color": "black",
  "fill-opacity": 0.1
};

const nearbyPaint = {
  //"fill-color": "#0074D9",
  'fill-color': [
      "case",
      ["==", ["get", "rewardScale"], null],
      "black",
      ["==", ["get", "status"], "offline"],
      "black",
      [
          'interpolate',
          ['linear'],
          ['get', 'rewardScale'],
          0.1,
          '#D4070F',
          0.3,
          '#F18009',
          0.5,
          '#FFDA13',
          0.8,
          '#00FFFF',
          0.9,
          '#0066E7',
          1,
          '#1C1AAF',
      ],
  ],
  "fill-opacity": 1,
  "fill-outline-color": "white"
  //'background': 'purple'
};

const positionOptions = { enableHighAccuracy: true };

// Please be a decent human and don't abuse my Mapbox API token.
// If you fork this sandbox, replace my API token with your own.
// Ways to set Mapbox token: https://uber.github.io/react-map-gl/#/Documentation/getting-started/about-mapbox-tokens

const MAPBOX_TOKEN =
    "pk.eyJ1IjoicmFkcm9iIiwiYSI6ImNrYndpYTJ4ZjBnYWkzNG5zMzFhYnVoN2IifQ.gE5y3Jl_13TTk6Q71wLNnQ";

export default  {
  MAPBOX_TOKEN, 
  positionOptions,
  polygonPaint,
  darkmodePolygonPaint,
  nearbyPaint,
  locationHexesPaint,
  locationPaint,
  darkmodeLocationHexPaint,
  tooClosePaint, 
  safeRingPaint
}