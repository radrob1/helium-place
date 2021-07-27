import React, {
    useState,
    useRef,
    useCallback,
    useEffect,
} from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
//import { distance as turfDistance, point as turfPoint } from '@turf/turf'

import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import MapGL from "react-map-gl";
import mapboxgl from "mapbox-gl"; // This is a dependency of react-map-gl even if you didn't explicitly install it
import {
    GeolocateControl,
    Popup,
    Source,
    Layer
} from "react-map-gl";
import Geocoder from "../Geocoder/Geocoder";

// H3 geo hex map used to create hex shapes and locations
import { geoToH3, h3ToGeoBoundary, h3ToParent } from "h3-js";
import { kRing, hexRing } from "h3-js";

// Local imports
import HotSpotInfo from "../HotspotInfo/HotspotInfo";

import MapConstants from '../../constants/MapConstants'
import { createHotspotsGeojson } from './MapUtils';

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const hashtagLocation = window.location.hash.substr(1);

let hotspots = [];
//let hotspotsSearchGeojson = [];
let hotspotsGeojson = [];
//let hotspotsGPSGeojson = [];
//let hotspotDensities = {};
/**
 *  Main map component
 */
export const Map = (props) => {
    const [viewport, setViewport] = useState({
        latitude: 40.229447620978966,
        longitude: -98.84343917535838,
        zoom: 4,
    });
    const [dataLoading, setDataloading] = useState(true);
    const mapRef = useRef();
    //const geocoderContainerRef = useRef();
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

    const [res4Data, setRes4Data] = useState();
    const [res5Data, setRes5Data] = useState();
    const [res6Data, setRes6Data] = useState();
    const [res7Data, setRes7Data] = useState();
    const [res8Data, setRes8Data] = useState();
    const [res9Data, setRes9Data] = useState();
    const [res10Data, setRes10Data] = useState();
    //const [res11SafeRing, setRes11SafeRing] = useState();
    const [res11TooClose, setRes11TooClose] = useState();
    const [locationTooClose, setLocationTooClose] = useState();
    const [res12location, setRes12Location] = useState();
    const [locationHexData, setLocationHexData] = useState();
    const [locationHexCount, setLocationHexCount] = useState()
    const [nearbyHotspots, setNearbyHotspots] = useState();
    //const [nearbydataLoading, setNearbyDataloading] = useState(true);
    const [hoveredFeature, setHoveredFeature] = useState();

    const updateLocation = (value) => {
        //console.log(value);
        if (typeof value != "undefined") {
            setLocation(value);
        }
    };

    const updateNearbyHotspots = (value) => {
        //console.log("NearbyHotspots:", value);
        if (typeof value != "undefined") {
            setNearbyHotspots(value);
        }
    };

    const updateRes12Location = (value) => {
        //console.log("res12location:", value);
        if (typeof value != "undefined") {
            setRes12Location(value);
        }
    };

    /*
    const updateRes11SafeRing = (value) => {
        //console.log("res11SafeRing:", value);
        if (typeof value != "undefined") {
            setRes11SafeRing(value);
        }
    };
    */

    /*
    const updateRes11TooClose = (value) => {
        //console.log("res11TooClose:", value);
        if (typeof value != "undefined") {
            setRes11TooClose(value);
        }
    };
    */

    const updateLocationTooClose = (value) => {
        //console.log("locationTooClose:", value);
        if (typeof value != "undefined") {
            setLocationTooClose(value);
        }
    };

    const updateLocationHexData = (value) => {
        //console.log("res8Data:", value);
        if (typeof value != "undefined") {
            setLocationHexData(value);
        }
    };

    const updateLocationHexCount = (value) => {
        //console.log("res8Data:", value);
        if (typeof value != "undefined") {
            setLocationHexCount(value);
            props.updateHexCounts(value);
        }
    };

    const updateRes8Data = (value) => {
        //console.log("res8Data:", value);
        if (typeof value != "undefined") {
            setRes8Data(value);
        }
    };

    const updateRes4Data = (value) => {
        if (typeof value != "undefined") {
            setRes4Data(value);
        }
    };

    const updateRes5Data = (value) => {
        if (typeof value != "undefined") {
            setRes5Data(value);
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

    const getHoveredFeature = () => {
        if (typeof hoveredFeature === "undefined") {
            return null
        }
        else {
            return hoveredFeature;
        }
    };

    const _onHover = useCallback((event) => {
        //console.log("event: ",event);
        const {
            features
        } = event;
        //console.log("features: ",features);
        const hotspotFeature =
            features && features.find((f) => f.layer.id === "hotspots");

        /*
        const nearbyFeature =
           features && features.find((f) => f.layer.id === "nearbyhotspots");
        */

        //let hoveredFeature = null;
        /*
        if (typeof hotspotFeature != "undefined" && typeof nearbyFeature != "undefined") {
            //console.log(hotspotFeature);
            hoveredFeature = nearbyFeature;
            setHoveredFeature(hoveredFeature);
            //console.log(hoveredFeature);
        }
        else */
        let hoveredFeature = getHoveredFeature();
        if (typeof hotspotFeature != "undefined") {
            //let featureslnglat = [hotspotFeature.properties.longitude.toFixed(3), hotspotFeature.properties.latitude.toFixed(3)];
            //let eventlnglat = [event.lngLat[0].toFixed(3), event.lngLat[1].toFixed(3)]
            //console.log(featureslnglat, eventlnglat);
            if (hoveredFeature === null || hoveredFeature.properties.name !== hotspotFeature.properties.name) {
                setHoveredFeature(hotspotFeature);
            }
        }
        else {
            //console.log("Null feature");
        }
    });

    const _renderTooltip = useCallback(() => {
        return (
            hoveredFeature && (
                <Popup
                    tipSize={12}
                    anchor="bottom"
                    longitude={hoveredFeature.properties.longitude}
                    latitude={hoveredFeature.properties.latitude}
                    closeButton={true}
                    closeOnClick={false}
                    onClose={() => setHoveredFeature(null)}
                >
                    <HotSpotInfo info={hoveredFeature} location={location} />
                </Popup>
            )
        );
    }, [hoveredFeature, location]);

    const handleOnResult = useCallback((newlocation) => {
        console.log(newlocation);
        //console.log(geoToH3(location.result.geometry.coordinates[1], location.result.geometry.coordinates[0], 8))
        let newlatitude = 0;
        let newlongitude = 0;
        let res4hex = null;
        let res5hex = null;
        let res6hex = null;
        let res7hex = null;
        let res8hex = null;
        let res9hex = null;
        let res10hex = null;
        let res12hex = null;
        let res11hex = null;
        try {
            newlatitude = newlocation.result.geometry.coordinates[1];
            newlongitude = newlocation.result.geometry.coordinates[0];
            res4hex = geoToH3(
                newlocation.result.geometry.coordinates[1],
                newlocation.result.geometry.coordinates[0],
                4
            );
            res5hex = geoToH3(
                newlocation.result.geometry.coordinates[1],
                newlocation.result.geometry.coordinates[0],
                5
            );
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
            //console.log("handleOnResult: Geolocate");
            newlatitude = newlocation.coords.latitude;
            newlongitude = newlocation.coords.longitude;
            res4hex = geoToH3(
                newlocation.coords.latitude,
                newlocation.coords.longitude,
                4
            );
            res5hex = geoToH3(
                newlocation.coords.latitude,
                newlocation.coords.longitude,
                5
            );
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
            //console.log("GPS: ", newlocation.coords.latitude,newlocation.coords.longitude);
            res8hex = geoToH3(
                newlocation.coords.latitude,
                newlocation.coords.longitude,
                8
            );
            //console.log("res8hex: ", res8hex);
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
            res4hex: res4hex,
            res5hex: res5hex,
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
        let res11closehexeslist = kRing(updatedlocation.res11hex, 7);
        const res4hexes = kRing(updatedlocation.res4hex, 1);
        const res5hexes = kRing(updatedlocation.res5hex, 1);
        const res6hexes = kRing(updatedlocation.res6hex, 1);
        const res7hexes = kRing(updatedlocation.res7hex, 4);
        const res8hexes = kRing(updatedlocation.res8hex, 12);
        const res9hexes = kRing(updatedlocation.res9hex, 24);
        const res10hexes = kRing(updatedlocation.res10hex, 48);
        /* Nearby hotspots no longer used
        const nearbyHotspots = [];
        var n;
        for (n = 0; n < res8hexes.length; n++) {
            var res8 = res8hexes[n];
            for (var i in hotspots) {
                if (hotspots[i].res8_location === res8 && hotspots[i].status === 'online') {
                    nearbyHotspots.push({
                        location: hotspots[i].location,
                        name: hotspots[i].name,
                        longitude: hotspots[i].longitude,
                        latitude: hotspots[i].latitude,
                        address: hotspots[i].address,
                        rewardScale: hotspots[i].reward_scale,
                        status: hotspots[i].status
                    });
                }
            }
        }
        //console.log("nearbyHotspots: ", nearbyHotspots);
        var i;
        var features = [];
        for (i = 0; i < nearbyHotspots.length; i++) {
            let nearbyres11closehexes = kRing(h3ToParent(nearbyHotspots[i].location, 11), 7);
            res11closehexeslist.push(...nearbyres11closehexes);
            let hexBoundary = h3ToGeoBoundary(nearbyHotspots[i].location);
            hexBoundary.push(hexBoundary[0]);

            let arr = [];
            for (const i of hexBoundary) {
                arr.push([i[1], i[0]]);
            }
            const from = turfPoint([
                updatedlocation.longitude,
                updatedlocation.latitude,
            ])
            const to = turfPoint([h3ToGeo(nearbyHotspots[i].location)[1], h3ToGeo(nearbyHotspots[i].location)[0]])
            let distance = turfDistance(from, to, { units: 'meters' })
            //console.log("distance: ", distance)
            //console.log(nearbyHotspots[i]);
            features.push({
                type: "Feature",
                properties: {
                    title: nearbyHotspots[i].name,
                    name: nearbyHotspots[i].name,
                    latitude: nearbyHotspots[i].latitude,
                    longitude: nearbyHotspots[i].longitude,
                    address: nearbyHotspots[i].address,
                    rewardScale: nearbyHotspots[i].rewardScale,
                    distance: Math.round(distance),
                    status: nearbyHotspots[i].status
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
        //console.log(nearbygeojson);
        updateNearbyHotspots(nearbygeojson);
*/
        const res11safehexes = [];
        res11safehexes.push({ ring: 1, hexes: hexRing(updatedlocation.res11hex, 8) });
        res11safehexes.push({ ring: 2, hexes: hexRing(updatedlocation.res11hex, 9) });
        res11safehexes.push({ ring: 3, hexes: hexRing(updatedlocation.res11hex, 10) });
        res11safehexes.push({ ring: 4, hexes: hexRing(updatedlocation.res11hex, 11) });
        res11safehexes.push({ ring: 5, hexes: hexRing(updatedlocation.res11hex, 12) });
        res11safehexes.push({ ring: 6, hexes: hexRing(updatedlocation.res11hex, 13) });
        res11safehexes.push({ ring: 7, hexes: hexRing(updatedlocation.res11hex, 14) });
        res11safehexes.push({ ring: 8, hexes: hexRing(updatedlocation.res11hex, 15) });
        res11safehexes.push({ ring: 9, hexes: hexRing(updatedlocation.res11hex, 16) });
        res11safehexes.push({ ring: 10, hexes: hexRing(updatedlocation.res11hex, 17) });
        res11safehexes.push({ ring: 11, hexes: hexRing(updatedlocation.res11hex, 18) });
        res11safehexes.push({ ring: 12, hexes: hexRing(updatedlocation.res11hex, 19) });
        res11safehexes.push({ ring: 13, hexes: hexRing(updatedlocation.res11hex, 20) });
        res11safehexes.push({ ring: 14, hexes: hexRing(updatedlocation.res11hex, 21) });
        res11safehexes.push({ ring: 15, hexes: hexRing(updatedlocation.res11hex, 22) });
        res11safehexes.push({ ring: 16, hexes: hexRing(updatedlocation.res11hex, 23) });
        res11safehexes.push({ ring: 17, hexes: hexRing(updatedlocation.res11hex, 24) });
        res11safehexes.push({ ring: 18, hexes: hexRing(updatedlocation.res11hex, 25) });
        res11safehexes.push({ ring: 19, hexes: hexRing(updatedlocation.res11hex, 26) });
        res11safehexes.push({ ring: 20, hexes: hexRing(updatedlocation.res11hex, 27) });

        // Get all location parent/child hexes
        let locationhexes = [];
        let locationhexboundaries = [];
        //locationhexes.push(res8hex);
        //locationhexes.push(res9hex);
        //locationhexes.push(res10hex);
        let location4hex = h3ToParent(updatedlocation.res12hex, 4);
        let location5hex = h3ToParent(updatedlocation.res12hex, 5);
        let location6hex = h3ToParent(updatedlocation.res12hex, 6);
        let location7hex = h3ToParent(updatedlocation.res12hex, 7);
        let location8hex = h3ToParent(updatedlocation.res12hex, 8);
        let location9hex = h3ToParent(updatedlocation.res12hex, 9);
        let location10hex = h3ToParent(updatedlocation.res12hex, 10);
        locationhexes.push(location4hex);
        locationhexes.push(location5hex);
        locationhexes.push(location6hex);
        locationhexes.push(location7hex);
        locationhexes.push(location8hex);
        locationhexes.push(location9hex);
        locationhexes.push(location10hex);
        //console.log("res8hex: ", res8hex);

        var i;
        for (i = 0; i < locationhexes.length; i++) {
            let hexBoundary = h3ToGeoBoundary(locationhexes[i]);
            hexBoundary.push(hexBoundary[0]);

            let arr = [];
            for (const i of hexBoundary) {
                arr.push([i[1], i[0]]);
            }
            locationhexboundaries.push(arr);
        }

        var i;
        var features = [];
        for (i = 0; i < locationhexboundaries.length; i++) {
            features.push({
                type: "Feature",
                geometry: {
                    type: "Polygon",
                    coordinates: [locationhexboundaries[i]],
                },
            });
        }
        const locationgeojson = {
            type: "FeatureCollection",
            features: features,
        };
        updateLocationHexData(locationgeojson);

        // Count all hotspots in each respective location hexes
        var locationhexcount = {
            res4: {
                hex: location4hex,
                count: 0
            },
            res5: {
                hex: location5hex,
                count: 0
            },
            res6: {
                hex: location6hex,
                count: 0
            },
            res7: {
                hex: location7hex,
                count: 0
            },
            res8: {
                hex: location8hex,
                count: 0
            },
            res9: {
                hex: location9hex,
                count: 0
            },
            res10: {
                hex: location10hex,
                count: 0
            },
        }

        searchHotspotsByDistance(updatedlocation).then((nearbyHotspots) => {
            //console.log("nearbyhotspots:", nearbyHotspots);
            for (i = 0; i < nearbyHotspots.length; i++){
                let nearbyRes4 = h3ToParent(nearbyHotspots[i].location, 4);
                let nearbyRes5 = h3ToParent(nearbyHotspots[i].location, 5);
                let nearbyRes6 = h3ToParent(nearbyHotspots[i].location, 6);
                let nearbyRes7 = h3ToParent(nearbyHotspots[i].location, 7);
                let nearbyRes8 = h3ToParent(nearbyHotspots[i].location, 8);
                let nearbyRes9 = h3ToParent(nearbyHotspots[i].location, 9);
                let nearbyRes10 = h3ToParent(nearbyHotspots[i].location, 10);
                if (nearbyHotspots[i].status.online === "online"){
                    if (nearbyRes4 === location4hex){
                        locationhexcount['res4']['count'] += 1;
                    }
                    if (nearbyRes5 === location5hex){
                        locationhexcount['res5']['count'] += 1;
                    }
                    if (nearbyRes6 === location6hex){
                        locationhexcount['res6']['count'] += 1;
                    }
                    if (nearbyRes7 === location7hex){
                        locationhexcount['res7']['count'] += 1;
                    }
                    if (nearbyRes8 === location8hex){
                        locationhexcount['res8']['count'] += 1;
                    }
                    if (nearbyRes9 === location9hex){
                        locationhexcount['res9']['count'] += 1;
                    }
                    if (nearbyRes10 === location10hex){
                        locationhexcount['res10']['count'] += 1;
                    }
                }
            }
            console.log(locationhexcount);
            updateLocationHexCount(locationhexcount);
        });
        //console.log(locationhexcount);

        // Get all  res 4 neighbor boundaries
        if (typeof res4hexes !== "undefined" && res4hexes.length > 0) {
            let res4hexboundaries = [];
            var i;
            for (i = 0; i < res4hexes.length; i++) {
                let hexBoundary = h3ToGeoBoundary(res4hexes[i]);
                hexBoundary.push(hexBoundary[0]);

                let arr = [];
                for (const i of hexBoundary) {
                    arr.push([i[1], i[0]]);
                }
                res4hexboundaries.push(arr);
            }

            var i;
            var features = [];
            for (i = 0; i < res4hexboundaries.length; i++) {
                features.push({
                    type: "Feature",
                    geometry: {
                        type: "Polygon",
                        coordinates: [res4hexboundaries[i]],
                    },
                });
            }
            const geojson = {
                type: "FeatureCollection",
                features: features,
            };
            updateRes4Data(geojson);
        }

        // Get all  res 5 neighbor boundaries
        if (typeof res5hexes !== "undefined" && res5hexes.length > 0) {
            let res5hexboundaries = [];
            var i;
            for (i = 0; i < res5hexes.length; i++) {
                let hexBoundary = h3ToGeoBoundary(res5hexes[i]);
                hexBoundary.push(hexBoundary[0]);

                let arr = [];
                for (const i of hexBoundary) {
                    arr.push([i[1], i[0]]);
                }
                res5hexboundaries.push(arr);
            }

            var i;
            var features = [];
            for (i = 0; i < res5hexboundaries.length; i++) {
                features.push({
                    type: "Feature",
                    geometry: {
                        type: "Polygon",
                        coordinates: [res5hexboundaries[i]],
                    },
                });
            }
            const geojson = {
                type: "FeatureCollection",
                features: features,
            };
            updateRes5Data(geojson);
        }

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

        /*
        // Get hex boundaries for all hotspot too close to witness zones
        const res11closehexes = [...new Set(res11closehexeslist)];
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
        };
        */

        const locationTooClosehexes = kRing(updatedlocation.res11hex, 7);
        if (typeof locationTooClosehexes !== "undefined" && locationTooClosehexes.length > 0) {
            let res11hexboundaries = [];
            var i;
            for (i = 0; i < locationTooClosehexes.length; i++) {
                let hexBoundary = h3ToGeoBoundary(locationTooClosehexes[i]);
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
            updateLocationTooClose(geojson);
        };
/*
        if (typeof res11safehexes !== "undefined" && res11safehexes.length > 0) {
            let res11hexboundaries = [];
            var j;
            for (j = 0; j < res11safehexes.length; j++) {
                var i
                for (i = 0; i < res11safehexes[j].hexes.length; i++) {
                    //console.log("res11safehexes[j].hexes[i]: ", res11safehexes[j].hexes[i]);
                    let hexBoundary = h3ToGeoBoundary(res11safehexes[j].hexes[i]);
                    hexBoundary.push(hexBoundary[0]);

                    let arr = [];
                    for (const i of hexBoundary) {
                        arr.push([i[1], i[0]]);
                    }
                    //console.log(res11safehexes[j].ring);
                    res11hexboundaries.push({ ring: res11safehexes[j].ring, boundaries: arr });
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
                        longitude: res11hexboundaries[i].boundaries[0][0],
                        latitude: res11hexboundaries[i].boundaries[0][1],
                        ring: res11hexboundaries[i].ring
                    },
                    geometry: {
                        type: "Polygon",
                        coordinates: [res11hexboundaries[i].boundaries],
                    },
                });
            }
            const geojson = {
                type: "FeatureCollection",
                features: features,
            };
            updateRes11SafeRing(geojson);
        }
        */

        let hexBoundary = h3ToGeoBoundary(res11hex);
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

    // Fetch all the hotspot data and convert to geojson
    //console.log(props);
    useEffect(() => {
        fetch("https://d32xu4rsl9zro4.cloudfront.net/hotspots.json")
            .then((response) => response.json())
            .then((hotspots_data) => {
                //console.log("First hotspot: ", hotspots[0]);
                hotspots = hotspots_data;
                //hotspotsSearchGeojson = createSearchHotspotsGeojson(hotspots);
                //hotspotsGPSGeojson = createHotspotsGeojson(hotspots, 13);
                hotspotsGeojson = createHotspotsGeojson(hotspots, 11);
                //hotspotDensities = getHexDensities(hotspots);
                //console.log(hotspotDensities);
                if (hashtagLocation) {
                    //console.log("hashtaglocation: ", hashtagLocation);
                    //console.log(hotspots);
                    var hotspot = hotspots.find(function (element) {
                        return (element.name === hashtagLocation || element.address === hashtagLocation);
                    });
                    //console.log(hotspot);
                    if (typeof hotspot != "undefined") {
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
                }
                setDataloading(false);
            });
    }, [handleOnResult]);

    const mapClick = (event) => {
        //console.log(event);
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
            //console.log(newViewport);
            const geolocateDefaultOverrides = { transitionDuration: 1000, zoom: 15 };

            return handleViewportChange({
                ...newViewport,
                ...geolocateDefaultOverrides,
            });
        },
        [handleViewportChange]
    );

    const searchHotspotsByDistance = (location, cursor = null, prevResp = []) => {
        props.setNearbyDataloading(true);
        let url = 'https://api.helium.io/v1/hotspots/location/distance?'
        if (cursor){
            url = url + 'lat='+location.latitude+'&lon='+location.longitude+'&distance=65000&cursor='+cursor
        }
        else {
            url = url+ 'lat='+location.latitude+'&lon='+location.longitude+'&distance=65000'
        }
        return fetch(url)
                .then((response) => response.json())
                .then((hotspots_data) => {
                    console.log(hotspots_data);
                    const response = [...prevResp, ...hotspots_data['data']];
                    let cursor = hotspots_data['cursor']
                    if (cursor){
                        return searchHotspotsByDistance(location, cursor, response);
                    }
                    
                    return response;
            })
    };
    /*
    * Used by the geocoder component as a local supplemental search
    *  returns list of matching hotspot names
    */
    const searchHotspots = useCallback(async (query) => {
        //var matchingFeatures = [];
        //console.log(hotspotsSearchGeojson);
        
        const [hotspots] = await Promise.all([
            fetch('https://api.helium.io/v1/hotspots/name?search='+query)
            .then((response) => response.json())
            .then((hotspots_data) => {
                var matchingFeatures = [];
                //console.log(hotspots_data);
                for (var i = 0; i < hotspots_data.data.length; i++) { 
                    var hs = hotspots_data.data[i];
                    var feature = {
                        place_name: hs.name,
                        center: [hs.lng,hs.lat],
                        place_type: ["hotspot"],
                        type: "Feature",
                        geometry: {
                            coordinates: [hs.lng,hs.lat],
                            type: "Point"
                        },
                        properties: {
                            name: hs.name,
                            title: hs.name
                        },
                    }
                    //console.log(feature);
                    matchingFeatures.push(feature);
                }
                return matchingFeatures;
            })
        ])
        //console.log(hotspots);
        return hotspots;
        
        /*
        for (var i = 0; i < hotspotsSearchGeojson.features.length; i++) {
            var feature = hotspotsSearchGeojson.features[i];
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
        console.log(matchingFeatures);
        return matchingFeatures;
        */

    }, []);

    if (dataLoading) {
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Loader type="ThreeDots" color="#162646" height={120} width={120} />
            </div>
        )
    }
    else {
        return (
            <div style={{ height: "94vh" }}>
                <MapGL
                    mapboxApiAccessToken={MapConstants.MAPBOX_TOKEN}
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
                            containerRef={props.geocoderContainerRef}
                            onViewportChange={handleGeocoderViewportChange}
                            mapboxApiAccessToken={MapConstants.MAPBOX_TOKEN}
                            position="top-right"
                            marker={false}
                            minLength={12}
                            //countries={"US,CA"}
                            onResult={handleOnResult}
                            reverseGeocode
                            placeholder="Search for an address, GPS coords, or hotspot name"
                            //localGeocoder={searchHotspots}
                            externalGeocoder={searchHotspots}
                            clearOnBlur={true}
                            clearAndBlurOnEsc={true}
                        />
                    )}
                    <div ref={props.geocoderContainerRef}>
                        <GeolocateControl
                            positionOptions={MapConstants.positionOptions}
                            style={{
                                flex: 1,
                                right: 0,
                                margin: 15,
                                top: 0,
                                position: 'absolute'
                            }}
                            trackUserLocation={props.trackuserToggle}
                            onViewportChange={handleGeolocateViewportChange}
                            onGeolocate={handleOnResult}
                            captureClick={true}
                            captureDoubleClick={true}
                        />
                    </div>

                    {res12location && (
                        <Source type="geojson" data={res12location}>
                            <Layer id="searchedlocation" type="fill" paint={MapConstants.locationPaint} />
                        </Source>
                    )}

                    {MapConstants.locationHexesPaint && props.locationHexToggle && (
                        <Source type="geojson" data={locationHexData}>
                            <Layer id="locationhexes" type="fill" paint={props.mapstyle.includes('dark') ? MapConstants.darkmodeLocationHexPaint : MapConstants.locationHexesPaint} beforeId={"searchedlocation"} />
                        </Source>
                    )}

                    {res4Data && props.res4toggle && (
                        <Source type="geojson" data={res4Data}>
                            <Layer type="line" paint={props.mapstyle.includes('dark') ? MapConstants.darkmodePolygonPaint : MapConstants.polygonPaint} />
                        </Source>
                    )}

                    {res5Data && props.res5toggle && (
                        <Source type="geojson" data={res5Data}>
                            <Layer type="line" paint={props.mapstyle.includes('dark') ? MapConstants.darkmodePolygonPaint : MapConstants.polygonPaint} />
                        </Source>
                    )}

                    {res6Data && props.res6toggle && (
                        <Source type="geojson" data={res6Data}>
                            <Layer type="line" paint={props.mapstyle.includes('dark') ? MapConstants.darkmodePolygonPaint : MapConstants.polygonPaint} />
                        </Source>
                    )}

                    {res7Data && props.res7toggle && (
                        <Source type="geojson" data={res7Data}>
                            <Layer type="line" paint={props.mapstyle.includes('dark') ? MapConstants.darkmodePolygonPaint : MapConstants.polygonPaint} />
                        </Source>
                    )}

                    {res8Data && props.res8toggle && (
                        <Source type="geojson" data={res8Data}>
                            <Layer type="line" paint={props.mapstyle.includes('dark') ? MapConstants.darkmodePolygonPaint : MapConstants.polygonPaint} />
                        </Source>
                    )}

                    {res9Data && props.res9toggle && (
                        <Source type="geojson" data={res9Data}>
                            <Layer type="line" paint={props.mapstyle.includes('dark') ? MapConstants.darkmodePolygonPaint : MapConstants.polygonPaint} />
                        </Source>
                    )}

                    {res10Data && props.res10toggle && (
                        <Source type="geojson" data={res10Data}>
                            <Layer type="line" paint={props.mapstyle.includes('dark') ? MapConstants.darkmodePolygonPaint : MapConstants.polygonPaint} />
                        </Source>
                    )}

                    {hotspotsGeojson && (
                        <Source type="geojson" data={hotspotsGeojson}>
                            <Layer id="hotspots" type="fill" paint={MapConstants.nearbyPaint} beforeId={"searchedlocation"} />
                        </Source>
                    )}

                    {/*res11SafeRing && props.sweetspotToggle && (
                        <Source type="geojson" data={res11SafeRing}>
                            <Layer id="safedistance" type="fill" paint={MapConstants.safeRingPaint} beforeId={"hotspots"} />
                        </Source>
                    )*/}

                    {res11TooClose && props.redzoneToggle && (
                        <Source type="geojson" data={res11TooClose}>
                            <Layer id="tooclose" type="fill" paint={MapConstants.tooClosePaint} beforeId={"hotspots"} />
                        </Source>
                    )}

                    {locationTooClose && props.locationRedzoneToggle && (
                        <Source type="geojson" data={locationTooClose}>
                            <Layer id="tooclose" type="fill" paint={MapConstants.tooClosePaint} beforeId={"hotspots"} />
                        </Source>
                    )}

                    {/*nearbyHotspots && (
                        <Source type="geojson" data={nearbyHotspots}>
                            <Layer id="nearbyhotspots" type="fill" paint={MapConstants.nearbyPaint}/>
                        </Source>
                    )*/}

                </MapGL>
            </div>
        );
    }
};

export default Map;
