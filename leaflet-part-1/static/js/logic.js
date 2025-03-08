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
  zoom: 3,
  layers: [defaultMap, grayscale, WorldImagery, NatGeoWorldMap],
});

// add the default map to the map object
defaultMap.addTo(myMap);
//grayscale.addTo(myMap);

// add the layer control
L.control.layers(basemaps).addTo(myMap);

// create var to hold earthquake data
let earthquake = new L.LayerGroup();

// get the data for the quakes and populate the layergroup
// call the USGS GeoJson API
d3.json(
  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
).then(function (earthquakeData) {
  // console log to make sure the data is coming in
  console.log(earthquakeData);
});
