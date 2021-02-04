export const getHotspots = async () => {
    fetch("https://helium-place-hotstpots.s3.amazonaws.com/hotspots.json")
    .then((response) => response.json())
    .then((hotspots_data) => {
        return hotspots_data;
    });
};

export const getHotspotsGeojson = async (hotspots) => {
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
  