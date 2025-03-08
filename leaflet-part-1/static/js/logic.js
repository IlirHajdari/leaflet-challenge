// create the tile layers for the backgrounds of the map
const defaultMap = L.tileLayer(
  "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }
);

// grayscale layer for the map
const grayscale = L.tileLayer(
  "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.{ext}",
  {
    minZoom: 0,
    maxZoom: 20,
    attribution:
      '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    ext: "png",
  }
);

const WorldImagery = L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  {
    attribution:
      "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
  }
);

const NatGeoWorldMap = L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}",
  {
    attribution:
      "Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC",
    maxZoom: 16,
  }
);

// make a baseMaps object
let basemaps = {
  Default: defaultMap,
  Grayscale: grayscale,
  "World Imagery": WorldImagery,
  "Nat Geo Map": NatGeoWorldMap,
};

// make a map object
let myMap = L.map("map", {
  center: [36.7783, -119.4179],
  zoom: 5,
  layers: [defaultMap, grayscale, WorldImagery, NatGeoWorldMap],
});

// add the default map to the map object
defaultMap.addTo(myMap);
//grayscale.addTo(myMap);

// add the layer control
//L.control.layers(basemaps).addTo(myMap);

// create var to hold earthquake data
let earthquake = new L.LayerGroup();

// define overlays object
let overlays = {
  Earthquake: earthquake,
};

// add the layer control with both base maps and overlays
L.control.layers(basemaps, overlays).addTo(myMap);

// get the data for the quakes and populate the layergroup
// call the USGS GeoJson API
d3.json(
  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
).then(function (earthquakeData) {
  // console log to make sure the data is coming in
  console.log(earthquakeData);
  // plot circles, where the radius is dependent on the magnitude
  // and the color is dependent on the depth

  // make a function that chooses the color of the data point
  function dataColor(depth) {
    if (depth > 90) {
      return "red";
    } else if (depth > 70) {
      return "orangered";
    } else if (depth > 50) {
      return "orange";
    } else if (depth > 30) {
      return "gold";
    } else if (depth > 10) {
      return "yellow";
    } else {
      return "green";
    }
  }

  // make a function that determines the size of the radius
  function radiusSize(mag) {
    if (mag == 0) {
      return 1; // makes sure that a 0 mag earthquake shows on the map
    } else {
      return mag * 5; // makes the radius 5 times the magnitude
    }
  }

  // add on to the style for each data point
  function dataStyle(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: dataColor(feature.geometry.coordinates[2]), // use index 2 for the depth
      color: "#000000", // black
      radius: radiusSize(feature.properties.mag),
      stroke: true,
      weight: 0.5,
    };
  }

  // add the GeoJson data
  L.geoJson(earthquakeData, {
    // make each feature a marker that is on the map
    // each marker is going to be a circle
    pointToLayer: function (feature, latLng) {
      return L.circleMarker(latLng);
    },
    // set the style for each marker
    style: dataStyle, // calls the data style function and passes in the earthquake data
    // add popups
    onEachFeature: function (feature, layer) {
      layer.bindPopup(`Magnitude: <b>${feature.properties.mag}</b><br>
                      Depth: <b>${feature.geometry.coordinates[2]}</b><br>
                      Location: <b>${feature.properties.place}</b>`);
    },
  }).addTo(earthquake);
});
