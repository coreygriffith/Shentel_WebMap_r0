console.log('coming from buffer')

let isBufferVisible = false;


document.getElementById('bufferButton').addEventListener('click', () => {
  const bufferDistanceFeet = parseFloat(document.getElementById('bufferDistance').value) || 20;
  const bufferDistanceMeters = bufferDistanceFeet / 3.28084;

  if (isBufferVisible) {
    // Remove the buffer layer from the map
    map.removeLayer('BufferedReview');
    // Set isBufferVisible to false
    isBufferVisible = false;
  } else {
    // Load GeoJSON data and create buffer only if it doesn't exist
    if (!map.getSource('bufferedReview')) {
      fetch('/api/markers')
        .then(response => response.json())
        .then(data => {
          // Create a buffer for each feature
          const bufferedFeatures = data.features.map(feature => {
            const point = turf.point(feature.geometry.coordinates);
            return turf.buffer(point, bufferDistanceMeters, { units: 'meters' });
          });

          // Add buffered features as a new source
          map.addSource('bufferedReview', {
            'type': 'geojson',
            'data': {
              'type': 'FeatureCollection',
              'features': bufferedFeatures
            }
          });

          // Add buffered features as a new layer if the source is available
          if (map.getSource('bufferedReview')) {
            map.addLayer({
              'id': 'BufferedReview',
              'type': 'fill',
              'source': 'bufferedReview',
              'paint': {
                'fill-color': 'rgba(0, 255, 0, 0.3)',
                'fill-outline-color': 'rgba(0, 255, 0, 1)'
              },
            });
          }
        });
    } else {
      // Add buffered features as a new layer if the source is available
      if (map.getSource('bufferedReview')) {
        map.addLayer({
          'id': 'BufferedReview',
          'type': 'fill',
          'source': 'bufferedReview',
          'paint': {
            'fill-color': 'rgba(0, 255, 0, 0.3)',
            'fill-outline-color': 'rgba(0, 255, 0, 1)'
          },
        });
      }
    }

    // Set isBufferVisible to true
    isBufferVisible = true;
  }
});