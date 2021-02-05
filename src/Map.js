import React, {
    useState,
    useRef,
    useCallback,
    useEffect,
} from "react";

import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import MapGL from "react-map-gl";
import mapboxgl from "mapbox-gl"; // This is a dependency of react-map-gl even if you didn't explicitly install it
import {
    GeolocateControl,
    Popup,
    Source,
    Layer
} from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";

// H3 geo hex map used to create hex shapes and locations
import { geoToH3, h3ToGeoBoundary } from "h3-js";
import { kRing, hexRing } from "h3-js";

// Local imports
import HotSpotInfo from "./HotspotInfo";
import mapstyles from "./mapstyles.json";
import Hotspots from "./Hotspots";
import { getHotspotsGeojson, getHotspots } from "./data";

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

// Please be a decent human and don't abuse my Mapbox API token.
// If you fork this sandbox, replace my API token with your own.
// Ways to set Mapbox token: https://uber.github.io/react-map-gl/#/Documentation/getting-started/about-mapbox-tokens

const MAPBOX_TOKEN =
    "pk.eyJ1IjoicmFkcm9iIiwiYSI6ImNrYndpYTJ4ZjBnYWkzNG5zMzFhYnVoN2IifQ.gE5y3Jl_13TTk6Q71wLNnQ";
const positionOptions = { enableHighAccuracy: true };


const hashtagLocation = window.location.hash.substr(1);


const polygonPaint = {
    "line-color": "black",
  };
  
  const tooClosePaint = {
    //"fill-color": "#FF4136",
    "fill-color": "#FC4445",
    "fill-opacity": 0.4,
    //'background': 'red'
  };
  
  const safeRingPaint = {
    "fill-color": "#97caef",
    "fill-opacity": 0.5,
    //'background': 'green'
  };
  
  const locationPaint = {
    "fill-color": "#0074D9",
    "fill-opacity": 1,
    //'background': 'blue'
  };
  
  const nearbyPaint = {
    "fill-color": "#A984FF",
    //"fill-color": "#afd275",
    "fill-opacity": 1,
    //'background': 'purple'
  };

// Load hotspots and create geojson object
const createHotspotsGeojson = (hotspots) => {
    const features = [];
    var i;
    for (i = 0; i < hotspots.length; i++) {
        //console.log(hotspots[i]);
        features.push({
            type: "Feature",
            properties: {
                title: hotspots[i].name,
                name: hotspots[i].name,
            },
            geometry: {
                type: "Point",
                coordinates: [hotspots[i].longitude, hotspots[i].latitude],
            },
        });
    }

    const geojson = {
        type: "FeatureCollection",
        features: features,
    };
    //console.log(geojson);
    return geojson;
};

let hotspots = [];
let hotspotsGeojson = [];
/**
 *  Main map component
 */
const Map = (props) => {
    // Fetch all the hotspot data and convert to geojson
    //console.log(props);
    useEffect(() => {
        fetch("https://helium-place-hotstpots.s3.amazonaws.com/hotspots.json")
            .then((response) => response.json())
            .then((hotspots_data) => {
                //console.log("First hotspot: ", hotspots[0]);
                hotspots = hotspots_data;
                hotspotsGeojson = createHotspotsGeojson(hotspots);
                if (hashtagLocation) {
                    console.log(hashtagLocation);
                    console.log(hotspots);
                    var hotspot = hotspots.find(function (element) {
                        return element.name === hashtagLocation;
                    });
                    //console.log(hotspot);
                    handleOnResult({
                        coords: {
                            longitude: hotspot.longitude,
                            latitude: hotspot.latitude,
                        },
                    });
                    setViewport({
                        longitude: hotspot.longitude,
                        latitude: hotspot.latitude,
                        zoom: 15,
                    });
                }
            });
    }, []);

    const [viewport, setViewport] = useState({
        latitude: 40.229447620978966,
        longitude: -98.84343917535838,
        zoom: 4,
    });
    const mapRef = useRef();
    const geocoderContainerRef = useRef();
    const handleViewportChange = useCallback(
        (newViewport) => setViewport(newViewport),
        []
    );
    const [location, setLocation] = useState({
        latitude: "",
        longitude: "",
        res8hex: "",
        res12hex: "",
    });
    const [res6Data, setRes6Data] = useState();
    const [res7Data, setRes7Data] = useState();
    const [res8Data, setRes8Data] = useState();
    const [res9Data, setRes9Data] = useState();
    const [res10Data, setRes10Data] = useState();
    const [res11SafeRing, setRes11SafeRing] = useState();
    const [res11TooClose, setRes11TooClose] = useState();
    const [res12location, setRes12Location] = useState();
    const [nearbyHotspots, setNearbyHotspots] = useState();
    const [hoveredFeature, setHoveredFeature] = useState();

    const updateLocation = (value) => {
        console.log(value);
        if (typeof value != "undefined") {
            setLocation(value);
        }
    };

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

    const updateRes6Data = (value) => {
        if (typeof value != "undefined") {
            setRes6Data(value);
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

    const _onHover = useCallback((event) => {
        const {
            features,
            srcEvent: { offsetX, offsetY },
        } = event;
        const hotspotFeature =
            features && features.find((f) => f.layer.id === "hotspots");
        //const hexFeatureTooClose = features && features.find(f => f.layer.id === 'tooclose');
        //const hexFeatureSafe = features && features.find(f => f.layer.id === 'safedistance');

        let hoveredFeature = null;
        if (typeof hotspotFeature != "undefined") {
            //console.log(hotspotFeature);
            hoveredFeature = hotspotFeature;
            setHoveredFeature(hoveredFeature);
            console.log(hoveredFeature);
        } else {
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
    }, [hoveredFeature]);

    const handleOnResult = useCallback((newlocation) => {
        console.log(newlocation);
        //console.log(geoToH3(location.result.geometry.coordinates[1], location.result.geometry.coordinates[0], 8))
        let newlatitude = 0;
        let newlongitude = 0;
        let res6hex = null;
        let res7hex = null;
        let res8hex = null;
        let res9hex = null;
        let res10hex = null;
        let res12hex = null;
        let res11hex = null;
        try {
            newlatitude = newlocation.result.geometry.coordinates[0];
            newlongitude = newlocation.result.geometry.coordinates[1];
            res6hex = geoToH3(
                newlocation.result.geometry.coordinates[1],
                newlocation.result.geometry.coordinates[0],
                6
            );
            res7hex = geoToH3(
                newlocation.result.geometry.coordinates[1],
                newlocation.result.geometry.coordinates[0],
                7
            );
            res8hex = geoToH3(
                newlocation.result.geometry.coordinates[1],
                newlocation.result.geometry.coordinates[0],
                8
            );
            res9hex = geoToH3(
                newlocation.result.geometry.coordinates[1],
                newlocation.result.geometry.coordinates[0],
                9
            );
            res10hex = geoToH3(
                newlocation.result.geometry.coordinates[1],
                newlocation.result.geometry.coordinates[0],
                10
            );
            res12hex = geoToH3(
                newlocation.result.geometry.coordinates[1],
                newlocation.result.geometry.coordinates[0],
                12
            );
            res11hex = geoToH3(
                newlocation.result.geometry.coordinates[1],
                newlocation.result.geometry.coordinates[0],
                11
            );
        } catch {
            console.log("handleOnResult: Geolocate");
            newlatitude = newlocation.coords.latitude;
            newlongitude = newlocation.coords.longitude;
            res6hex = geoToH3(
                newlocation.coords.latitude,
                newlocation.coords.longitude,
                6
            );
            res7hex = geoToH3(
                newlocation.coords.latitude,
                newlocation.coords.longitude,
                7
            );
            res8hex = geoToH3(
                newlocation.coords.latitude,
                newlocation.coords.longitude,
                8
            );
            res9hex = geoToH3(
                newlocation.coords.latitude,
                newlocation.coords.longitude,
                9
            );
            res10hex = geoToH3(
                newlocation.coords.latitude,
                newlocation.coords.longitude,
                10
            );
            res12hex = geoToH3(
                newlocation.coords.latitude,
                newlocation.coords.longitude,
                12
            );
            res11hex = geoToH3(
                newlocation.coords.latitude,
                newlocation.coords.longitude,
                11
            );
        }
        //const res8neighbors = kRing(res8hex,1);
        //console.log(res8neighbors);
        const updatedlocation = {
            latitude: newlatitude,
            longitude: newlongitude,
            res8hex: res8hex,
            res12hex: res12hex,
            res11hex: res11hex,
            res6hex: res6hex,
            res7hex: res7hex,
            res9hex: res9hex,
            res10hex: res10hex,
            //res8neighbors: res8neighbors
        };
        //console.log(updatedlocation.res8neighbors);
        updateLocation(updatedlocation);
        const res6hexes = kRing(updatedlocation.res6hex, 1);
        const res7hexes = kRing(updatedlocation.res7hex, 4);
        const res8hexes = kRing(updatedlocation.res8hex, 12);
        const res9hexes = kRing(updatedlocation.res9hex, 24);
        const res10hexes = kRing(updatedlocation.res10hex, 48);
        const nearbyHotspots = [];
        var n;
        for (n = 0; n < res8hexes.length; n++) {
            var res8 = res8hexes[n];
            for (var i in hotspots) {
                if (hotspots[i].res8_location === res8) {
                    nearbyHotspots.push({
                        location: hotspots[i].location,
                        name: hotspots[i].name,
                        longitude: hotspots[i].longitude,
                        latitude: hotspots[i].latitude,
                        address: hotspots[i].address,
                        rewardScale: hotspots[i].reward_scale,
                    });
                }
            }
        }
        //console.log("nearbyHotspots: ", nearbyHotspots);
        var i;
        var features = [];
        for (i = 0; i < nearbyHotspots.length; i++) {
            let hexBoundary = h3ToGeoBoundary(nearbyHotspots[i].location);
            hexBoundary.push(hexBoundary[0]);

            let arr = [];
            for (const i of hexBoundary) {
                arr.push([i[1], i[0]]);
            }
            console.log(nearbyHotspots[i]);
            features.push({
                type: "Feature",
                properties: {
                    title: nearbyHotspots[i].name,
                    name: nearbyHotspots[i].name,
                    latitude: nearbyHotspots[i].latitude,
                    longitude: nearbyHotspots[i].longitude,
                    address: nearbyHotspots[i].address,
                    rewardScale: nearbyHotspots[i].rewardScale,
                },
                geometry: {
                    type: "Polygon",
                    coordinates: [arr],
                },
            });
        }
        const nearbygeojson = {
            type: "FeatureCollection",
            features: features,
        };
        updateNearbyHotspots(nearbygeojson);

        const res11closehexes = kRing(updatedlocation.res11hex, 7);
        const res11safehexes = [];
        res11safehexes.push(hexRing(updatedlocation.res11hex, 8));
        res11safehexes.push(hexRing(updatedlocation.res11hex, 9));
        res11safehexes.push(hexRing(updatedlocation.res11hex, 10));
        res11safehexes.push(hexRing(updatedlocation.res11hex, 11));

        // Get all  res 6 neighbor boundaries
        if (typeof res6hexes !== "undefined" && res6hexes.length > 0) {
            let res6hexboundaries = [];
            var i;
            for (i = 0; i < res6hexes.length; i++) {
                let hexBoundary = h3ToGeoBoundary(res6hexes[i]);
                hexBoundary.push(hexBoundary[0]);

                let arr = [];
                for (const i of hexBoundary) {
                    arr.push([i[1], i[0]]);
                }
                res6hexboundaries.push(arr);
            }

            var i;
            var features = [];
            for (i = 0; i < res6hexboundaries.length; i++) {
                features.push({
                    type: "Feature",
                    geometry: {
                        type: "Polygon",
                        coordinates: [res6hexboundaries[i]],
                    },
                });
            }
            const geojson = {
                type: "FeatureCollection",
                features: features,
            };
            updateRes6Data(geojson);
        }

        // Get all  res 7 neighbor boundaries
        if (typeof res7hexes !== "undefined" && res7hexes.length > 0) {
            let res7hexboundaries = [];
            var i;
            for (i = 0; i < res7hexes.length; i++) {
                let hexBoundary = h3ToGeoBoundary(res7hexes[i]);
                hexBoundary.push(hexBoundary[0]);

                let arr = [];
                for (const i of hexBoundary) {
                    arr.push([i[1], i[0]]);
                }
                res7hexboundaries.push(arr);
            }

            var i;
            var features = [];
            for (i = 0; i < res7hexboundaries.length; i++) {
                features.push({
                    type: "Feature",
                    geometry: {
                        type: "Polygon",
                        coordinates: [res7hexboundaries[i]],
                    },
                });
            }
            const geojson = {
                type: "FeatureCollection",
                features: features,
            };
            updateRes7Data(geojson);
        }

        // Get all  res 8 neighbor boundaries
        if (typeof res8hexes !== "undefined" && res8hexes.length > 0) {
            let res8hexboundaries = [];
            var i;
            for (i = 0; i < res8hexes.length; i++) {
                let hexBoundary = h3ToGeoBoundary(res8hexes[i]);
                hexBoundary.push(hexBoundary[0]);

                let arr = [];
                for (const i of hexBoundary) {
                    arr.push([i[1], i[0]]);
                }
                res8hexboundaries.push(arr);
            }

            var i;
            var features = [];
            for (i = 0; i < res8hexboundaries.length; i++) {
                features.push({
                    type: "Feature",
                    geometry: {
                        type: "Polygon",
                        coordinates: [res8hexboundaries[i]],
                    },
                });
            }
            const geojson = {
                type: "FeatureCollection",
                features: features,
            };
            updateRes8Data(geojson);
        }

        // Get all res 9 neighbor boundaries
        if (typeof res9hexes !== "undefined" && res9hexes.length > 0) {
            let res9hexboundaries = [];
            var i;
            for (i = 0; i < res9hexes.length; i++) {
                let hexBoundary = h3ToGeoBoundary(res9hexes[i]);
                hexBoundary.push(hexBoundary[0]);

                let arr = [];
                for (const i of hexBoundary) {
                    arr.push([i[1], i[0]]);
                }
                res9hexboundaries.push(arr);
            }

            var i;
            var features = [];
            for (i = 0; i < res9hexboundaries.length; i++) {
                features.push({
                    type: "Feature",
                    geometry: {
                        type: "Polygon",
                        coordinates: [res9hexboundaries[i]],
                    },
                });
            }
            const geojson = {
                type: "FeatureCollection",
                features: features,
            };
            updateRes9Data(geojson);
        }

        // Get all res 10 neighbor boundaries
        if (typeof res10hexes !== "undefined" && res10hexes.length > 0) {
            let res10hexboundaries = [];
            var i;
            for (i = 0; i < res10hexes.length; i++) {
                let hexBoundary = h3ToGeoBoundary(res10hexes[i]);
                hexBoundary.push(hexBoundary[0]);

                let arr = [];
                for (const i of hexBoundary) {
                    arr.push([i[1], i[0]]);
                }
                res10hexboundaries.push(arr);
            }

            var i;
            var features = [];
            for (i = 0; i < res10hexboundaries.length; i++) {
                features.push({
                    type: "Feature",
                    geometry: {
                        type: "Polygon",
                        coordinates: [res10hexboundaries[i]],
                    },
                });
            }
            const geojson = {
                type: "FeatureCollection",
                features: features,
            };
            updateRes10Data(geojson);
        }

        // Get all res 9 neighbor boundaries
        if (typeof res9hexes !== "undefined" && res9hexes.length > 0) {
            let res9hexboundaries = [];
            var i;
            for (i = 0; i < res9hexes.length; i++) {
                let hexBoundary = h3ToGeoBoundary(res9hexes[i]);
                hexBoundary.push(hexBoundary[0]);

                let arr = [];
                for (const i of hexBoundary) {
                    arr.push([i[1], i[0]]);
                }
                res9hexboundaries.push(arr);
            }

            var i;
            var features = [];
            for (i = 0; i < res9hexboundaries.length; i++) {
                features.push({
                    type: "Feature",
                    geometry: {
                        type: "Polygon",
                        coordinates: [res9hexboundaries[i]],
                    },
                });
            }
            const geojson = {
                type: "FeatureCollection",
                features: features,
            };
            updateRes9Data(geojson);
        }

        if (typeof res11closehexes !== "undefined" && res11closehexes.length > 0) {
            let res11hexboundaries = [];
            var i;
            for (i = 0; i < res11closehexes.length; i++) {
                let hexBoundary = h3ToGeoBoundary(res11closehexes[i]);
                hexBoundary.push(hexBoundary[0]);

                let arr = [];
                for (const i of hexBoundary) {
                    arr.push([i[1], i[0]]);
                }
                res11hexboundaries.push(arr);
            }

            var i;
            var features = [];
            for (i = 0; i < res11hexboundaries.length; i++) {
                features.push({
                    type: "Feature",
                    properties: {
                        title: "Too Close",
                        name: "Too Close",
                        longitude: res11hexboundaries[i][0][0],
                        latitude: res11hexboundaries[i][0][1],
                    },
                    geometry: {
                        type: "Polygon",
                        coordinates: [res11hexboundaries[i]],
                    },
                });
            }
            const geojson = {
                type: "FeatureCollection",
                features: features,
            };
            updateRes11TooClose(geojson);
        }

        if (typeof res11safehexes !== "undefined" && res11safehexes.length > 0) {
            let res11hexboundaries = [];
            var j;
            for (j = 0; j < res11safehexes.length; j++) {
                var i;
                for (i = 0; i < res11safehexes[j].length; i++) {
                    let hexBoundary = h3ToGeoBoundary(res11safehexes[j][i]);
                    hexBoundary.push(hexBoundary[0]);

                    let arr = [];
                    for (const i of hexBoundary) {
                        arr.push([i[1], i[0]]);
                    }
                    res11hexboundaries.push(arr);
                }
            }

            var i;
            var features = [];
            for (i = 0; i < res11hexboundaries.length; i++) {
                features.push({
                    type: "Feature",
                    properties: {
                        title: "Safe distance",
                        name: "Safe distance",
                        longitude: res11hexboundaries[i][0][0],
                        latitude: res11hexboundaries[i][0][1],
                    },
                    geometry: {
                        type: "Polygon",
                        coordinates: [res11hexboundaries[i]],
                    },
                });
            }
            const geojson = {
                type: "FeatureCollection",
                features: features,
            };
            updateRes11SafeRing(geojson);
        }

        let hexBoundary = h3ToGeoBoundary(res12hex);
        hexBoundary.push(hexBoundary[0]);

        let arr = [];
        for (const i of hexBoundary) {
            arr.push([i[1], i[0]]);
        }
        //console.log(arr);
        const geojson = {
            type: "Feature",
            properties: {
                title: "Searched Location",
                name: "Searched Location",
            },
            geometry: {
                type: "Polygon",
                coordinates: [arr],
            },
        };
        updateRes12Location(geojson);
    }, []);

    const mapClick = (event) => {
        console.log(event);
        const newlocation = {
            coords: {
                latitude: event.lngLat[1],
                longitude: event.lngLat[0],
                zoom: 16,
                //transitionInterpolator: ViewportFlyToInterpolator,
                transitionDuration: 3000,
            },
        };
        //handleOnGeolocate(newlocation);
        handleOnResult(newlocation);
        if (window.history.pushState) {
            window.history.pushState("", "/", window.location.pathname);
        } else {
            window.location.hash = "";
        }
    };

    // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
    const handleGeocoderViewportChange = useCallback(
        (newViewport) => {
            //console.log("handleGeocoderViewportChange: ", newViewport);
            if (window.history.pushState) {
                window.history.pushState("", "/", window.location.pathname);
            } else {
                window.location.hash = "";
            }
            const geocoderDefaultOverrides = { transitionDuration: 1000, zoom: 15 };

            return handleViewportChange({
                ...newViewport,
                ...geocoderDefaultOverrides,
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
                ...geolocateDefaultOverrides,
            });
        },
        [handleViewportChange]
    );

    /*
    * Used by the geocoder component as a local supplemental search
    *  returns list of matching hotspot names
    */
    const searchHotspots = useCallback((query) => {
        var matchingFeatures = [];
        console.log(hotspotsGeojson);
        for (var i = 0; i < hotspotsGeojson.features.length; i++) {
            var feature = hotspotsGeojson.features[i];
            //console.log(feature);
            // handle queries with different capitalization than the source data by calling toLowerCase()
            if (
                feature.properties.title.toLowerCase().search(query.toLowerCase()) !==
                -1
            ) {
                // add a tree emoji as a prefix for custom data results
                // using carmen geojson format: https://github.com/mapbox/carmen/blob/master/carmen-geojson.md
                feature["place_name"] = feature.properties.title;
                feature["center"] = feature.geometry.coordinates;
                feature["place_type"] = ["hotspot"];
                matchingFeatures.push(feature);
            }
        }
        return matchingFeatures;
    }, []);

    return (
        <div style={{ height: "95vh" }}>
            <div
                ref={geocoderContainerRef}
                style={{ position: "absolute", top: 70, right: 20, zIndex: 1 }}
            />
            <MapGL
                mapboxApiAccessToken={MAPBOX_TOKEN}
                ref={mapRef}
                {...viewport}
                width="100%"
                height="100%"
                onViewportChange={setViewport}
                mapStyle={props.mapstyle}
                onHover={_onHover}
                onClick={mapClick}
            >
                {_renderTooltip()}

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
                <GeolocateControl
                    positionOptions={positionOptions}
                    style={{
                        position: "absolute",
                        right: 0,
                        bottom: 0,
                        margin: 10,
                        marginBottom: 96,
                    }}
                    trackUserLocation={false}
                    onViewportChange={handleGeolocateViewportChange}
                    onGeolocate={handleOnResult}
                />
                {res12location && (
                    <Source type="geojson" data={res12location}>
                        <Layer type="fill" paint={locationPaint} />
                    </Source>
                )}

                {res6Data && props.res6toggle && (
                    <Source type="geojson" data={res6Data}>
                        <Layer type="line" paint={polygonPaint} />
                    </Source>
                )}

                {res7Data && props.res7toggle && (
                    <Source type="geojson" data={res7Data}>
                        <Layer type="line" paint={polygonPaint} />
                    </Source>
                )}

                {res8Data && props.res8toggle && (
                    <Source type="geojson" data={res8Data}>
                        <Layer type="line" paint={polygonPaint} />
                    </Source>
                )}

                {res9Data && props.res9toggle && (
                    <Source type="geojson" data={res9Data}>
                        <Layer type="line" paint={polygonPaint} />
                    </Source>
                )}

                {res10Data && props.res10toggle && (
                    <Source type="geojson" data={res10Data}>
                        <Layer type="line" paint={polygonPaint} />
                    </Source>
                )}

                {res11SafeRing && props.sweetspotToggle && (
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

            </MapGL>
        </div>
    );
};

export default Map;