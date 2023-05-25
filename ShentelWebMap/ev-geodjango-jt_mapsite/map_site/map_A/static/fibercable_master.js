console.log('coming from fibercable.js');

let fiberCableData = null;
let popup = null;

map.on('load', function () {
  fetch('/api/combined_map/')
    .then(response => response.json())
    .then(data => {
      fiberCableData = data.fibercables;

      map.addSource('fiberCable', {
        'type': 'geojson',
        'data': fiberCableData
      });

      map.addLayer({
        'id': 'FiberCableUnderground',
        'type': 'line',
        'source': 'fiberCable',
        'filter': ['==', ['get', 'placement'], 'Underground'],
        'paint': {
          'line-color': 'purple',
          'line-width': 5,
        },
      });

      map.addLayer({
        'id': 'FiberCableAerial',
        'type': 'line',
        'source': 'fiberCable',
        'filter': ['==', ['get', 'placement'], 'Aerial'],
        'paint': {
          'line-color': 'red',
          'line-width': 5,
          'line-dasharray': [2, 1]
        },
      });

      // // Update the dashboard with fiber cable distribution
      // updateDashboard();
    });
});