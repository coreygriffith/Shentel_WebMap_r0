console.log('coming from splicecloser.js!!!')

let spliceClosureData = null;
let currentPopup = null;

// These are the features you want to show when the webmaps loads
const initialZoomFeatures = [
  'Other', '864 Case', '48 Cabinet', '72 Cabinet', '96 Cabinet', '144 Cabinet', '288 Cabinet', '432 Cabinet', '576 Cabinet'
];

// These are the features you want to show at a medium zoom level
const mediumZoomFeatures = ['B', 'C', 'D'];

// These are the features you want to show at a local zoom level
const localZoomFeatures = ['2MP', '4MP', '6MP', '8MP', '12MP'];

// Variables to store splice closure counts
let spliceClosureCounts = {};

map.on('load', function () {
  fetch('/api/combined_map/')
    .then(response => response.json())
    .then(data => {
      spliceClosureData = data.spliceclosures;

      // Function to determine circle color based on closure_size
      function getClosureColor(size) {
        switch (size) {
          case 'Other':
            return 'gray';
          case '864 Case':
            return 'red';
          case '48 Cabinet':
            return 'blue';
          case '72 Cabinet':
            return 'green';
          case '96 Cabinet':
            return 'yellow';
          case '144 Cabinet':
            return 'orange';
          case '288 Cabinet':
            return 'purple';
          case '432 Cabinet':
            return 'pink';
          case '576 Cabinet':
            return 'cyan';
          case '2MP':
            return 'darkgray';
          case '4MP':
            return 'brown';
          case '6MP':
            return 'magenta';
          case '8MP':
            return 'teal';
          case '12MP':
            return 'olive';
          case 'B':
            return 'navy';
          case 'C':
            return 'maroon';
          case 'D':
            return 'gold';
          default:
            return 'green'; // Default color if closure_size is not matched
        }
      }

      // Variables to store splice closure counts for different zoom levels
      let initialZoomSpliceClosureCounts = {};
      let mediumZoomSpliceClosureCounts = {};
      let localZoomSpliceClosureCounts = {};

      // Count the number of splice closures for each size
      function countSpliceClosures() {
        for (const feature of spliceClosureData.features) {
          const size = feature.properties.closure_size;

          if (initialZoomFeatures.includes(size)) {
            if (initialZoomSpliceClosureCounts[size]) {
              initialZoomSpliceClosureCounts[size]++;
            } else {
              initialZoomSpliceClosureCounts[size] = 1;
            }
          }

          if (mediumZoomFeatures.includes(size)) {
            if (mediumZoomSpliceClosureCounts[size]) {
              mediumZoomSpliceClosureCounts[size]++;
            } else {
              mediumZoomSpliceClosureCounts[size] = 1;
            }
          }

          if (localZoomFeatures.includes(size)) {
            if (localZoomSpliceClosureCounts[size]) {
              localZoomSpliceClosureCounts[size]++;
            } else {
              localZoomSpliceClosureCounts[size] = 1;
            }
          }
        }
      }

      countSpliceClosures();

      // Function to create the chart
      function createChart(canvasId, spliceClosureCounts) {
        const labels = Object.keys(spliceClosureCounts);
        const chartData = {
          labels: labels,
          datasets: [{
            label: 'Splice Closure Sizes',
            data: Object.values(spliceClosureCounts),
            // Use getClosureColor to set backgroundColors based on the labels
            backgroundColor: labels.map(getClosureColor),
            borderWidth: 1
          }]
        };

        const chartOptions = {
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
          
        };

        const ctx = document.getElementById(canvasId).getContext('2d');
        new Chart(ctx, {
          type: 'pie',
          data: chartData,
          options: chartOptions
        });
      }

      createChart('initialZoomChart', initialZoomSpliceClosureCounts);
      createChart('mediumZoomChart', mediumZoomSpliceClosureCounts);
      createChart('localZoomChart', localZoomSpliceClosureCounts);

      map.addSource('spliceClosure', {
        'type': 'geojson',
        'data': spliceClosureData
      });

      map.addLayer({
        'id': 'SpliceClosure-initialZoom',
        'type': 'circle',
        'source': 'spliceClosure',
        'minzoom': 11,
        'maxzoom': 20, // adjust this based on your needs
        'filter': ['in', 'closure_size', ...initialZoomFeatures],
        'paint': {
          'circle-radius': 9,
          'circle-color': [
            'match',
            ['get', 'closure_size'],
            'Other', 'gray',
            '864 Case', 'red',
            '48 Cabinet', 'blue',
            '72 Cabinet', 'green',
            '96 Cabinet', 'yellow',
            '144 Cabinet', 'orange',
            '288 Cabinet', 'purple',
            '432 Cabinet', 'pink',
            '576 Cabinet', 'cyan',
            'green', // Default color if closure_size is not matched
          ],
          'circle-stroke-color': 'black',   // Add black outline
          'circle-stroke-width': 1          // Adjust the width of the outline as needed
        },
      });

      // Add a separate layer for each set of features
      map.addLayer({
        'id': 'SpliceClosure-localZoom',
        'type': 'circle',
        'source': 'spliceClosure',
        'minzoom': 16.5,
        'maxzoom': 20,  // adjust this based on your needs
        'filter': ['in', 'closure_size', ...localZoomFeatures],
        'paint': {
          'circle-radius': 5.5,
          'circle-color': [
            'match',
            ['get', 'closure_size'],
            '2MP', 'darkgray',
            '4MP', 'brown',
            '6MP', 'magenta',
            '8MP', 'teal',
            '12MP', 'olive',
            'green' // Default color if closure_size is not matched
          ],
          'circle-stroke-color': 'black',   // Add black outline
          'circle-stroke-width': 1          // Adjust the width of the outline as needed
        },
      });

      // Add a separate layer for each set of features
      map.addLayer({
        'id': 'SpliceClosure-mediumZoom',
        'type': 'circle',
        'source': 'spliceClosure',
        'minzoom': 15,
        'maxzoom': 20,  // adjust this based on your needs
        'filter': ['in', 'closure_size', ...mediumZoomFeatures],
        'paint': {
          'circle-radius': 5,
          'circle-color': [
            'match',
            ['get', 'closure_size'],
            'B', 'darkgray',  // use the appropriate colors for 'B', 'C', and 'D'
            'C', 'brown',
            'D', 'magenta',
            'green' // Default color if closure_size is not matched
          ],
          'circle-stroke-color': 'black',   // Add black outline
          'circle-stroke-width': 1          // Adjust the width of the outline as needed
        },
      });
    });
});
