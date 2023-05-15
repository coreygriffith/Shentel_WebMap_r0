// THIS SCRIPT LOADS IN THE DESIN FEATURES FROM THE DATABASE AND DISPLAYS THEM. 
// THEY ARE DISPLAYED BY COLOR. GREEN APPROVED, RED REJECTED, PURPLE NULL(IN-PROGRESS).
// FOR THE POP-UP IT DISPLAYS DIFFERNT FIELDS FROM THE DATABASE. 
// IT HAS A DROP DOWN WHERE THE STATUS OF THE FEATURE CAN ETHER BE ACCPETED OR REJECTED.
// DEPENDING ON ITS STATUS THE FEATUE WILL CHANGE COLOR AND THAT CHANGE WILL BE REFECTED IN THE DATABASE.



map.on('load', function () {
    map.addSource('fromJson', {
      'type': 'geojson',
      'data': "/api/design",
      // 'generateId': true
    });
  
    map.addLayer({
      'id': 'chargers',
      'type': 'circle',
      'source': 'fromJson',
      'paint': {
        'circle-radius': 5,
        'circle-color': [
          'case',
          ['==', ['get', 'approved'], true],
          'green',
          ['==', ['get', 'approved'], false],
          'red',
          ['==', ['get', 'approved'], null],
          'purple',
          'purple'
        ]
      },
      'filter': ['==', '$type', 'Point']
    });
  
    map.setPaintProperty('chargers', 'circle-color', [
      'case',
      ['==', ['get', 'approved'], true],
      'green',
      ['==', ['get', 'approved'], false],
      'red',
      ['==', ['get', 'approved'], null],
      'purple',
      'purple'
    ]);
    
  
  ////// Pop-Up start
  
  
  var popup = new maplibregl.Popup({
    closeButton: false
  });
  
  map.on('click', 'chargers', function (e) {
    var features = map.queryRenderedFeatures(e.point, {
      layers: ['chargers']
    });
  
    if (!features.length || !features[0].properties) { // Check if the features array is not empty and the properties object is defined
      return;
    }
  
    var feature = features[0];
  
  if (!features.length) {
    return;
  }
  
  var feature = features[0];
  var latitude = feature.geometry.coordinates[1].toFixed(3);
  var longitude = feature.geometry.coordinates[0].toFixed(3);
  var id = feature.id;
  var whoMadeIT = feature.properties.created_user;
  var approvedStatus = feature.properties.approved;


  // Create the popup HTML content using the new structure and styles
  var popupContent =
  '<div class="map-popup">' +
  '<h4>Electric Vehicle Charging Station Status</h4>' +
  '<p><strong>Latitude:</strong> <span id="latitude">' + latitude + '</span></p>' +
  '<p><strong>Longitude:</strong> <span id="longitude">' + longitude + '</span></p>' +
  '<p><strong>KEY:</strong> <span id="id">' + id + '</span></p>' +
  '<p><strong>Who made it:</strong> <span id="created-user">' + whoMadeIT + '</span></p>' +
  '<p><strong>approved?:</strong> <span id="approved">' + approvedStatus + '</span></p>' +
  '<select id="status-dropdown">' +
  '<option value="true">Accepted</option>' +
  '<option value="false">Rejected</option>' +
  '</select>' +
  '<button id="popup-button" name = "idfk">Update Status</button>' +
  '</div>';
  
  popup.setLngLat(feature.geometry.coordinates)
  .setHTML(popupContent)
  .addTo(map);
  
  // Add an event listener to the dropdown select element
  var statusDropdown = document.getElementById('status-dropdown');
  statusDropdown.addEventListener('change', function () {
    approvedStatus = statusDropdown.value;
  });
  
  // Add an event listener to the button that changes the circle color based on the status
  var button = document.getElementById('popup-button');
  button.addEventListener('click', function () {
    var selectedStatus = statusDropdown.value;
  
    var created_user = feature.properties.created_user;
    sendJSON(selectedStatus, created_user, id);
  
    function sendJSON(selectedStatus, created_user, id) {
      // Create a XHR object
      let xhr = new XMLHttpRequest();
      let url = "/map_A/deserial/";
    
      // open a connection
      xhr.open("POST", url, true);
    
      // Set the request header i.e. which type of content you are sending
      xhr.setRequestHeader("Content-Type", "application/json");
    
      // Create a state change callback
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          console.log("Response received:", this.responseText);
  
          // Reload the data source for the 'chargers' layer
          map.getSource('fromJson').setData("/api/design");
        }
      };
    
      // Converting JSON data to string
      var data = JSON.stringify({ "approved": selectedStatus, "created_user": created_user, "id": id });
    
      // Sending data with the request
      xhr.send(data);
  
    }
  
    // Set the feature state
    map.setFeatureState(
      {
        source: 'fromJson',
        id: feature.id,
      },
      {
        status: selectedStatus,
      }
    );
    popup.remove();
    });
    });
  });