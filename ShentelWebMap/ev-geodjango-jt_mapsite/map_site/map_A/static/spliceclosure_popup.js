console.log('coming from spliceclose_popup')

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

// Define the list of layer IDs
var layerIds = ['SpliceClosure-initialZoom', 'SpliceClosure-mediumZoom', 'SpliceClosure-localZoom'];

// Set up event listeners for each layer
layerIds.forEach(function(layerId) {
  map.on('mouseenter', layerId, function (event) {
    var feature = event.features[0];
    var attributes = getFeatureAttributes(feature);
    // console.log(attributes)

    // console.log(attributes)

    var name = extractAttributeValue(attributes[9]);
    var owner = extractAttributeValue(attributes[6]);
    var placement = extractAttributeValue(attributes[4]);
    var type = extractAttributeValue(attributes[1]);

    var content = `
    <div class="map-popup_cool">
      <div class="card">
        <div class="card-header">Splice Closure Details:</div>
        <div class="card-body">
        <p>Name: <strong>${name}</strong></p>
        <p>Owner: <strong>${owner}</strong></p>
        <p>Placement: <strong>${placement}</strong></p>
        <p>Type: <strong>${type}</strong></p>
      </div>
    </div>`;

    if (currentPopup) {
      currentPopup.remove();
    }

    currentPopup = new maplibregl.Popup({
      closeButton: false,
      closeOnClick: false,
      className: 'map-popup_cool'
    });

    currentPopup.setLngLat(event.lngLat);
    currentPopup.setHTML(content);

    currentPopup.addTo(map);
  });

  map.on('mouseleave', layerId, function () {
    if (currentPopup) {
      currentPopup.remove();
      currentPopup = null;
    }
  });

  map.on('click', layerId, function (event) {
    // Zoom in to the point
    map.flyTo({
      center: [event.lngLat.lng, event.lngLat.lat],
      zoom: 15
    });
  });
});
