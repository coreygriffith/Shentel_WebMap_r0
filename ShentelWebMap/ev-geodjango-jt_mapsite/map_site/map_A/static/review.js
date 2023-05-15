// THIS SCRIPT LOADS IN A GEOJSON FROM THE DATABASE THAT WILL BE USED
// TO SEND COMMENTS BACK TO DESIN FROM THE CLIENT
// THIS IS DONE BY HAVING A BUTTON TO ENABLE/DISABLE IF A POINT CAN BE ADDED OR NOT. 
// IT WILL ALSO HAVE A POP-UP WITH INFO WHERE ONE OF THE FIELDS IS A TEXT FIELD AND 
// THAT STRING HAS TO BE SENT BACK TO THE DATABSE 

// This code adds a new point layer to the map.
map.on('load', function () {
  // map.addSource('fromReview', {
  //   'type': 'geojson',
  //   'data': "/api/markers",
  //   // 'generateId': true
  // });

  // map.addLayer({
  //   'id': 'Review',
  //   'type': 'circle',
  //   'source': 'fromReview',
  //   'paint': {
  //     'circle-radius': 5,
  //     'circle-color': 'purple'
  //   },
  //   'filter': ['==', '$type', 'Point']
  // });
    map.addSource('newPoint', {
      'type': 'geojson',
      'data': {
        'type': 'FeatureCollection',
        'features': []
      }
    });
  
    map.addLayer({
      'id': 'new-points',
      'type': 'circle',
      'source': 'newPoint',
      'paint': {
        'circle-radius': 5,
        'circle-color': 'purple'
      },
      'filter': ['==', '$type', 'Point']
    });
  });
  
  // This function creates a new point feature.
  function createNewPointFeature(coordinates) {
    return {
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': coordinates
      },
      'properties': {
        'approved': null
      }
    };
  }
  
  // This variable tracks whether or not the user is currently adding points.
  let isAddingPointsEnabled = false;
  var popup = new maplibregl.Popup({
    closeButton: true
  });
  // This function toggles the adding points feature.
  document.getElementById('toggle-add-points').addEventListener('click', function () {
    isAddingPointsEnabled = !isAddingPointsEnabled;
    this.textContent = isAddingPointsEnabled ? 'Disable Adding Points' : 'Enable Adding Points';
  });
  

  
  map.on('click', function (e) {
    // Check if the clicked features belong to the 'chargers' layer
    var chargerFeatures = map.queryRenderedFeatures(e.point, {
      layers: ['chargers']
    });
    
  
    // Check if the clicked features belong to the 'new-points' layer
    var newPointFeatures = map.queryRenderedFeatures(e.point, {
      layers: ['new-points']
    });
  
    // If no features from the 'chargers' layer were clicked and adding points is enabled, add a new point
    if (!chargerFeatures.length && isAddingPointsEnabled) {
      var newPointFeature = createNewPointFeature([e.lngLat.lng, e.lngLat.lat]);
  
      // Add the new point feature to the 'newPoint' source
      var newPointSource = map.getSource('newPoint');
      newPointSource._data.features.push(newPointFeature);
      newPointSource.setData(newPointSource._data);
  
      // Open the popup
      var latitude = newPointFeature.geometry.coordinates[1];
      var longitude = newPointFeature.geometry.coordinates[0];
      var popupContent =
        '<div class="map-popup">' +
        '<h4>New Point</h4>' +
        '<p><strong>Latitude:</strong> ' + latitude + '</p>' +
        '<p><strong>Longitude:</strong> ' + longitude + '</p>' +
        '<p><strong>Comment:</strong> <textarea id="comment" rows="3" cols="20"></textarea></p>' +
        '<button id="submit-comment">Submit Comment</button>' + // Add the button here
        '</div>';
  
      popup.setLngLat([longitude, latitude])
        .setHTML(popupContent)
        .addTo(map);
  
      // Add an event listener to the button that sends the point and comment to the database
      document.getElementById('submit-comment').addEventListener('click', function () {
        var comment = document.getElementById('comment').value;
        sendComment(latitude, longitude, comment);
      });
  
      return;
    }
  
    // If a feature from the 'new-points' layer was clicked, create a pop-up with the coordinates
    if (newPointFeatures.length) {
      var feature = newPointFeatures[0];
      var latitude = feature.geometry.coordinates[1];
      var longitude = feature.geometry.coordinates[0];
  
      var popupContent =
        '<div class="map-popup">' +
        '<h4>New Point</h4>' +
        '<p><strong>Latitude:</strong> ' + latitude + '</p>' +
        '<p><strong>Longitude:</strong> ' + longitude + '</p>' +
        '<p><strong>Comment:</strong> <textarea id="comment" rows="3" cols="20"></textarea></p>' +
        '<button id="submit-comment">Submit Comment</button>' + // Add the button here
        '</div>';
  
      popup.setLngLat([longitude, latitude])
        .setHTML(popupContent)
        .addTo(map);
  
      // Add an event listener to the button that sends the point and comment to the database
      document.getElementById('submit-comment').addEventListener('click', function () {
        var comment = document.getElementById('comment').value;
        sendComment(latitude, longitude, comment);
      });
    }

// Function to send comment data to the server
function sendComment(latitude, longitude, comment) {
  let xhr = new XMLHttpRequest();
  let url = "/map_A/create_note_pt/"; // Set this to the appropriate endpoint for saving comments

  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log("Response received:", this.responseText);

      // Reload the data source for the 'chargers' layer
      map.getSource('fromReview').setData("/api/markers");
    }
  };

  // Convert the data to a JSON string
  var data = JSON.stringify({
    "latitude": latitude,
    "longitude": longitude,
    "comment": comment,
    "action": "create"
  });

  // Send data with the request
  xhr.send(data);
  console.log(data);

    }
    
  });
  

