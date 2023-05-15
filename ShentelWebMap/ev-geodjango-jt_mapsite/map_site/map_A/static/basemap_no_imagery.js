// Define the OpenStreetMap source
const osmSource = {
  "type": "raster",
  "tiles": ["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"],
  "tileSize": 256,
  "attribution": "&copy; OpenStreetMap Contributors",
  "maxzoom": 19
};

// Define the MapTiler source
const mapTilerSource = {
  "type": "raster",
  "tiles": ["https://api.maptiler.com/maps/hybrid/256/{z}/{x}/{y}.jpg?key=eVQ2Kpte0VeCIr0ofzU7"],
  "tileSize": 256,
  "attribution": "&copy; OpenStreetMap Contributors",
  "maxzoom": 19
};

// Initialise the map
const map = new maplibregl.Map({
  container: 'map',
  style: {
    "version": 8,
    "sources": {
      "basemap": osmSource
    },
    "layers": [
      {
        "id": "basemap",
        "type": "raster",
        "source": "basemap"
      }
    ]
  },
  center: [-77.36647266197348, 37.76883697732219],  
  zoom: 13
});

var nav = new maplibregl.NavigationControl();
map.addControl(nav, 'top-right');

// Create a function to switch the basemap source
function switchBasemap() {
  const currentSource = map.getSource('basemap');

  // Find the first data layer's ID
  const firstDataLayer = map.getStyle().layers.find(layer => layer.id !== 'basemap');
  const beforeId = firstDataLayer ? firstDataLayer.id : null;

  if (currentSource.tiles[0].includes('openstreetmap.org')) {
    map.removeLayer('basemap');
    map.removeSource('basemap');
    map.addSource('basemap', mapTilerSource);
    map.addLayer({
      "id": "basemap",
      "type": "raster",
      "source": "basemap"
    }, beforeId);
  } else {
    map.removeLayer('basemap');
    map.removeSource('basemap');
    map.addSource('basemap', osmSource);
    map.addLayer({
      "id": "basemap",
      "type": "raster",
      "source": "basemap"
    }, beforeId);
  }
}

// Add an event listener to the button
document.getElementById('switch-basemap').addEventListener('click', switchBasemap);