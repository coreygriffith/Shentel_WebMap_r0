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

      // Define unique styles for each cable_use value
      const cableUseStyles = {
        'Other': {
          'line-color': 'blue',
          'line-width': 3,

        },
        'Drop': {
          'line-color': 'green',
          'line-width': 3,

        },
        'Access': {
          'line-color': 'yellow',
          'line-width': 3,

        },
        'Distribution': {
          'line-color': 'orange',
          'line-width': 5,

        },
        'Backbone': {
          'line-color': 'purple',
          'line-width': 5,

        }
      };

      // Add a layer for each cable_use value
      for (const cableUse in cableUseStyles) {
        const filter = ['==', ['get', 'cable_use'], cableUse];
        const paint = cableUseStyles[cableUse];
        let minZoom = 14.5;
        let maxZoom = 20;

        if (cableUse === 'Backbone' || cableUse === 'Distribution') {
          minZoom = 11;
        }

        map.addLayer({
          'id': 'FiberCable' + cableUse,
          'type': 'line',
          'source': 'fiberCable',
          'filter': filter,
          'paint': paint,
          'minzoom': minZoom,
          'maxzoom': maxZoom
        });
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
      ////////////////////////////////////////////////////////////////////

      map.on('mousemove', 'FiberCableDistribution', function (event) {
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
      
      map.on('mouseout', 'FiberCableDistribution', function () {
        if (popup) {
          popup.remove();
          popup = null;
        }
      });
      
      map.on('click', 'FiberCableDistribution', function (event) {
        // Zoom to the clicked location
        map.flyTo({
          center: event.lngLat,
          zoom: 17
        });
      });
      ////////////////////////////////////////
      map.on('mousemove', 'FiberCableAccess', function (event) {
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
      
      map.on('mouseout', 'FiberCableAccess', function () {
        if (popup) {
          popup.remove();
          popup = null;
        }
      });
      
      map.on('click', 'FiberCableAccess', function (event) {
        // Zoom to the clicked location
        map.flyTo({
          center: event.lngLat,
          zoom: 17
        });
      });
      ////////////////////////////////////////
      map.on('mousemove', 'FiberCableDrop', function (event) {
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
      
      map.on('mouseout', 'FiberCableDrop', function () {
        if (popup) {
          popup.remove();
          popup = null;
        }
      });
      
      map.on('click', 'FiberCableDrop', function (event) {
        // Zoom to the clicked location
        map.flyTo({
          center: event.lngLat,
          zoom: 17
        });
      });
      ////////////////////////////////////////

      map.on('mousemove', 'FiberCableOther', function (event) {
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
      
      map.on('mouseout', 'FiberCableOther', function () {
        if (popup) {
          popup.remove();
          popup = null;
        }
      });
      
      map.on('click', 'FiberCableOther', function (event) {
        // Zoom to the clicked location
        map.flyTo({
          center: event.lngLat,
          zoom: 17
        });
      });
      ////////////////////////////////////////

      
      

      // Update the dashboard with fiber cable distribution
      // updateDashboard();
    });
});
