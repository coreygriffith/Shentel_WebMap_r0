// THIS SCRIPT LOADS THE MAP. THE BASEMAP IS FROM OPEN STREET MAPS
// Define the map syle (OpenStreetMap raster tiles)
const style = {
  "version": 8,
	"sources": {
    "osm": {
			"type": "raster",
			"tiles": ["https://api.maptiler.com/maps/hybrid/256/{z}/{x}/{y}.jpg?key=eVQ2Kpte0VeCIr0ofzU7"],
			"tileSize": 256,
      "attribution": "&copy; OpenStreetMap Contributors",
      "maxzoom": 13
    }
  },
  "layers": [
    {
      "id": "osm",
      "type": "raster",
      "source": "osm" // This must match the source key above
    }
  ]
};

// Initialise the map
const map = new maplibregl.Map({
  container: 'map',
  style: style,
  center: [-77.36647266197348, 37.76883697732219],
  zoom: 19
});
