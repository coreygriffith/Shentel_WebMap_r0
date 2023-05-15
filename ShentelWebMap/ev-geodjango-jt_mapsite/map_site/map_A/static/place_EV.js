console.log('comeing from place.js!!!!!')

let modifiedData = null;

map.on('load', function () {
  fetch('/api/markers')
    .then(response => response.json())
    .then(data => {
      const geojsonData = data;

      map.addSource('fromReview', {
        'type': 'geojson',
        'data': geojsonData
      });

      map.addLayer({
        'id': 'Review',
        'type': 'circle',
        'source': 'fromReview',
        'paint': {
          'circle-radius': 5,
          'circle-color': 'purple'
        },
        'filter': ['==', '$type', 'Point']
      });

      let modifiedData = null;

      // Set up cursor style and click event for draggable points
      map.on('mouseenter', 'Review', function () {
        map.getCanvas().style.cursor = 'move';
      });
      
      map.on('mouseleave', 'Review', function () {
        map.getCanvas().style.cursor = '';
      });
      
      let isDragging = false;
      let draggedFeature = null;
      
      map.on('mousedown', 'Review', function (e) {
        e.preventDefault();
        isDragging = true;
        draggedFeature = e.features[0];
      
        map.on('mousemove', onMove);
        map.once('mouseup', onUp);
      });
      
      function onMove(e) {
        if (!isDragging) return;
        const coords = e.lngLat;
      
        // Set a UI indicator for dragging.
        map.getCanvas().style.cursor = 'grabbing';
      
        // Update the point's coordinates in the geojsonData
        geojsonData.features.forEach((feature, index) => {
          if (feature.id === draggedFeature.id) {
            geojsonData.features[index].geometry.coordinates = [coords.lng, coords.lat];
            updatedFeatureIndex = index; // Save the updated feature's index
          }
        });
        map.getSource('fromReview').setData(geojsonData);
      }
      
      function onUp(e) {
        if (!isDragging) return;
      
        const coords = e.lngLat;
      
        // Update the point's coordinates in the geojsonData
        geojsonData.features.forEach((feature, index) => {
          if (feature.id === draggedFeature.id) {
            geojsonData.features[index].geometry.coordinates = [coords.lng, coords.lat];
            updatedFeatureIndex = index; // Save the updated feature's index
          }
        });
        modifiedData = geojsonData;
      
        // Unbind the handlers for the move and up events
        map.off('mousemove', onMove);
        map.off('mouseup', onUp);
      
        // Clear the UI indicator
        map.getCanvas().style.cursor = '';
      
        // Reset the state
        isDragging = false;
        draggedFeature = null;
      }
      
      map.on('click', function (e) {
        // Check if the clicked features belong to the 'Review' layer
        var reviewFeatures = map.queryRenderedFeatures(e.point, {
          layers: ['Review']
        });
      
        // If a feature from the 'Review' layer was clicked, create a pop-up with the information
        if (reviewFeatures.length) {
          var feature = reviewFeatures[0];
          var latitude = feature.geometry.coordinates[1];
          var longitude = feature.geometry.coordinates[0];
          var issues = feature.properties.issue; // Access the 'issues' property from the data
          var id = feature.id;
      
          var popupContent =
          '<div class="map-popup">' +
          '<h4>Review Point</h4>' +
          '<p><strong>Latitude:</strong> ' + latitude + '</p>' +
          '<p><strong>Longitude:</strong> ' + longitude + '</p>' +
          '<p><strong>Issues:</strong> ' + issues + '</p>' +
          '<p><strong>Comment:</strong> <textarea id="comment" rows="3" cols="20"></textarea></p>' +
          '<button id="submitLocation" class="submit-button">Submit</button>' +
          '</div>';
      
          popup.setLngLat([longitude, latitude])
            .setHTML(popupContent)
            .addTo(map);
      
            map.once('render', function () {
              document.getElementById('submitLocation').addEventListener('click', function () {
                if (updatedFeatureIndex !== null && modifiedData !== null) {
            
                  // Use the updated latitude and longitude from the modifiedData
                  const updatedLatitude = modifiedData.features[updatedFeatureIndex].geometry.coordinates[1];
                  const updatedLongitude = modifiedData.features[updatedFeatureIndex].geometry.coordinates[0];
                  const issues = modifiedData.features[updatedFeatureIndex].properties.issue;
                  const id = modifiedData.features[updatedFeatureIndex].id;
                  updatedFeatureIndex = null; // Reset the updated feature's index
            
                  sendLocation(updatedLatitude, updatedLongitude, issues, id); // Call sendLocation with updated coordinates
                } else {
                  // If the updated feature is not found, use the original latitude and longitude
                  sendLocation(latitude, longitude, issues, id);
                }
              });
            });
        }
      });
      
      function sendLocation(latitude, longitude, issues, id) {
        let xhr = new XMLHttpRequest();
        let url = "/map_A/create_note_pt/"; // Set this to the appropriate endpoint for updating locations
      
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
      
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 200) {
            console.log("Response received:", this.responseText);
      
            // Reload the data source for the 'Review' layer
            map.getSource('fromReview').setData("/api/markers");
          }
        };
      
        // Get the comment value from the comment box
        const comment = document.getElementById('comment').value;
      
        // Convert the data to a JSON string
        var data = JSON.stringify({
          "latitude": latitude,
          "longitude": longitude,
          "comment": comment, // Replace 'issues' with 'comment' here
          "id": id,
          "action": "update"
        });
      
        // Send data with the request
        xhr.send(data);
        console.log(data);
      }
    })
  })
