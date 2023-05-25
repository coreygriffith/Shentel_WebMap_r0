    // Get the counts of each closure_size of splice closures from the filtered data
    const spliceClosureSizes = spliceClosureFeatures.reduce((sizes, feature) => {
        let closure_size = feature.properties.closure_size;
        if (!sizes[closure_size]) {
          sizes[closure_size] = 0;
        }
        sizes[closure_size]++;
        return sizes;
      }, {});
  
      // Update the dashboard elements with the counts
      Object.entries(spliceClosureSizes).forEach(([closure_size, count]) => {
        const sizeCountElement = document.getElementById(`splice-closure-size-${closure_size}-count`);
        if (sizeCountElement) {
          sizeCountElement.innerText = `Splice Closures (closure size ${closure_size}): ${count}`;
        } else {
          // Create a new paragraph element for this closure_size if it doesn't exist
          const p = document.createElement('p');
          p.id = `splice-closure-size-${closure_size}-count`;
          p.innerText = `Splice Closures (closure size ${closure_size}): ${count}`;
          document.getElementById('splice-closure-distribution').appendChild(p);
        }
      });
  
      // Splice Closure pie chart data
      const dataSpliceClosure = {
        labels: Object.keys(spliceClosureSizes),
        datasets: [{
          data: Object.values(spliceClosureSizes),
          backgroundColor: ['red', 'purple', 'blue', 'green', 'yellow'], // provide appropriate colors for your data
        }]
      };
  
      // Check if a pie chart already exists for splice closures
      if (pieChart2) {
        // Destroy the existing pie chart before creating a new one
        pieChart2.destroy();
      }
  
      // Create the pie chart for splice closures
      pieChart2 = new Chart(pieChartCanvas2, {
        type: 'pie',
        data: dataSpliceClosure,
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
    console.log('search-input, search-button, pie-chart, or pie-chart2 elements not found');
  }
  



  //////////////////////////////////////////////////////////////////////////////////////////////////////


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
  })