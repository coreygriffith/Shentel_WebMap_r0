console.log('coming from filter and sa')

// Define the searchInput and searchButton variables
let searchInput = document.getElementById('search-input');
let searchButton = document.getElementById('search-button');
let pieChartCanvas = document.getElementById('pie-chart');  // Get the existing canvas for the pie chart
let pieChart = null; // Variable to hold the pie chart object

// Check if the searchInput, searchButton and pieChartCanvas are found
if (searchInput && searchButton && pieChartCanvas) {
  // Add the event listener to the searchButton
  searchButton.addEventListener('click', performSearch);

  // Add the event listener to the searchInput for the Enter key
  searchInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission or page reload
      performSearch();
    }
  });

  // Add the event listener to the searchInput for the input event
  searchInput.addEventListener('input', function(event) {
    if (event.target.value === '') {
      resetSearch();
    }
  });

 // Function to perform the search
 function performSearch() {
  let searchTerm = searchInput.value.trim(); // Get the search term

  // Filter the fiberCableData based on the search term
  let filteredFiberCableData = fiberCableData.features.filter(feature => {
    let name = feature.properties.name;
    return name && name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Filter the spliceClosureData based on the search term
  let filteredSpliceClosureData = spliceClosureData.features.filter(feature => {
    let name = feature.properties.name;
    return name && name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Create new GeoJSON objects with the filtered data
  let filteredFiberCableGeoJSON = {
    'type': 'FeatureCollection',
    'features': filteredFiberCableData
  };

  let filteredSpliceClosureGeoJSON = {
    'type': 'FeatureCollection',
    'features': filteredSpliceClosureData
  };

  // Update the source data for the 'fiberCable' layer
  map.getSource('fiberCable').setData(filteredFiberCableGeoJSON);

  // Update the source data for the 'spliceClosure' layer
  map.getSource('spliceClosure').setData(filteredSpliceClosureGeoJSON);

  // Zoom to the extent of the filtered features
  if (filteredFiberCableData.length > 0 || filteredSpliceClosureData.length > 0) {
    let bounds;

    if (filteredFiberCableData.length > 0) {
      bounds = turf.bbox(filteredFiberCableGeoJSON);
    } else {
      bounds = turf.bbox(filteredSpliceClosureGeoJSON);
    }

    map.fitBounds(bounds, { padding: 50 });
  } else {
    // No matching features found
    console.log('No matching features found.');
  }

  // Update the dashboard
  updateDashboard(filteredFiberCableData, filteredSpliceClosureData);
}

// Function to reset the search
function resetSearch() {
  // Reset the source data for the 'fiberCable' and 'spliceClosure' layers
  map.getSource('fiberCable').setData(fiberCableData);
  map.getSource('spliceClosure').setData(spliceClosureData);

  // Update the dashboard
  updateDashboard(fiberCableData.features, spliceClosureData.features);
}

// Function to update the dashboard
function updateDashboard(fiberCableFeatures) {
  // Get the counts of aerial and underground fiber cables from the filtered data
  const aerialCount = fiberCableFeatures.filter(feature => feature.properties.placement === 'Aerial').length;
  const undergroundCount = fiberCableFeatures.filter(feature => feature.properties.placement === 'Underground').length;

  // Update the dashboard elements with the counts
  const aerialCountElement = document.getElementById('aerial-count');
  const undergroundCountElement = document.getElementById('underground-count');
  aerialCountElement.innerText = `Aerial Fiber Cables: ${aerialCount}`;
  undergroundCountElement.innerText = `Underground Fiber Cables: ${undergroundCount}`;

  

  // Get the canvas element for the pie chart
  const pieChartCanvas = document.getElementById('pie-chart');

  // Prepare the data for the pie chart
  const data = {
    labels: ['Aerial', 'Underground'],
    datasets: [{
      data: [aerialCount, undergroundCount],
      backgroundColor: ['red', 'purple'],
    }]
  };

    // Check if a pie chart already exists
    if (pieChart) {
      // Destroy the existing pie chart before creating a new one
      pieChart.destroy();
    }

    // Create the pie chart
    pieChart = new Chart(pieChartCanvas, {
      type: 'pie',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              font: {
                weight: 'bold',
                color: 'black'
              }
            }
          }
        }
      }
    });
  }
} else {
  console.log('search-input, search-button or pie-chart elements not found');
}

// Call the updateDashboard function initially to display the chart when the page loads
updateDashboard(fiberCableData.features);


          // Filter setup
    let filterActive = false;

    filterButton.addEventListener('click', function() {
      filterActive = !filterActive;
      map.setFilter('FiberCable', filterActive ? ['==', 'placement', 'Underground'] : null);
      filterButton.textContent = filterActive ? 'Show All Fiber Cable' : 'Filter Fiber Cable';
    });

    map.on('click', 'FiberCable', function (e) {
      map.flyTo({
        center: e.lngLat,
        zoom: 15.5
      });
    });