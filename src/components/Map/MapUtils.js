import { geoToH3, h3ToGeoBoundary, h3ToParent } from "h3-js";


// Load hotspots and create geojson object
export const createHotspotsGeojson = (hotspots, res) => {
  const features = [];
  var i;
  for (i = 0; i < hotspots.length; i++) {
      let hexBoundary = h3ToGeoBoundary(h3ToParent(geoToH3(hotspots[i].latitude, hotspots[i].longitude, 12), res));
      //console.log("res: ",res, hexBoundary);
      hexBoundary.push(hexBoundary[0]);

      let arr = [];
      for (const i of hexBoundary) {
          arr.push([i[1], i[0]]);
      }
      features.push({
          type: "Feature",
          properties: {
              title: hotspots[i].name,
              name: hotspots[i].name,
              latitude: hotspots[i].latitude,
              longitude: hotspots[i].longitude,
              address: hotspots[i].address,
              rewardScale: hotspots[i].reward_scale,
              //coordinates: [hotspots[i].longitude, hotspots[i].latitude],
              status: hotspots[i].status,
          },
          geometry: {
              type: "Polygon",
              coordinates: [arr],
          },
      });
      //console.log(hotspots[i]);
  }

  const geojson = {
      type: "FeatureCollection",
      features: features,
  };
  //console.log(geojson);
  return geojson;
};

export const createSearchHotspotsGeojson = (hotspots) => {
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

export default {
  createHotspotsGeojson,
  createSearchHotspotsGeojson
}