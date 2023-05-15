console.log('comeing from place.js')

let fiberCableData = null;
let spliceClosureData = null;

map.on('load', function () {
  fetch('/api/combined_map/')
    .then(response => response.json())
    .then(data => {
      fiberCableData = data.fibercables;
      spliceClosureData = data.spliceclosures;

      // Add FiberCable data source and layer
      map.addSource('fiberCable', {
        'type': 'geojson',
        'data': fiberCableData
      });

      map.addLayer({
        'id': 'FiberCable',
        'type': 'line',
        'source': 'fiberCable',
        'paint': {
          'line-color': 'blue',
          'line-width': 2
        },
        'filter': ['==', '$type', 'LineString']
      });

      // Add SpliceClosure data source and layer
      map.addSource('spliceClosure', {
        'type': 'geojson',
        'data': spliceClosureData
      });

      map.addLayer({
        'id': 'SpliceClosure',
        'type': 'circle',
        'source': 'spliceClosure',
        'paint': {
          'circle-radius': 5,
          'circle-color': 'purple'
        },
        'filter': ['==', '$type', 'Point']
      });
    });
});
