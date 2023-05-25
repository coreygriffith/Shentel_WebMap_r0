console.log('coming from fibercable_popup');

function getFeatureAttributes(feature) {
  var attributes = [];
  for (var key in feature.properties) {
    if (feature.properties.hasOwnProperty(key)) {
      attributes.push(key + ': ' + feature.properties[key]);
    }
  }
  return attributes;
}

function extractAttributeValue(attribute) {
  var parts = attribute.split(":");
  return parts[1].trim();
}

map.on('mousemove', 'FiberCableBackbone', function (event) {
  var feature = event.features[0];
  var attributes = feature.properties;

  var placement = attributes.placement;
  var cable_use = attributes.cable_use;
  var hierarchy = attributes.hierarchy;
  var owner = attributes.owner;
  var cable_type = attributes.cable_type;
  var name = attributes.name;

  // Create the content string for the popup using template string
  var content = `
  <div class="map-popup_cool">
    <div class="card">
      <div class="card-header">Fiber Cable Details:</div>
      <div class="card-body">
        <p>Placement: <strong>${placement}</strong></p>
        <p>Cable Use: <strong>${cable_use}</strong></p>
        <p>Hierarchy: <strong>${hierarchy}</strong></p>
        <p>Owner: <strong>${owner}</strong></p>
        <p>Name: <strong>${name}</strong></p>
        <p>Cable Type: <strong>${cable_type}</strong></p>
      </div>
    </div>
  </div>`;

  // Remove the current popup if it exists
  if (popup) {
    popup.remove();
  }

  // Create a new popup
  popup = new maplibregl.Popup({
    closeButton: false,
    className: 'map-popup_cool'
  });

  popup.setLngLat(event.lngLat);
  popup.setHTML(content);

  // Open the popup on the map
  popup.addTo(map);
});

map.on('mouseout', 'FiberCableBackbone', function () {
  if (popup) {
    popup.remove();
    popup = null;
  }
});

map.on('click', 'FiberCableBackbone', function (event) {
  // Zoom to the clicked location
  map.flyTo({
    center: event.lngLat,
    zoom: 17
  });
});

