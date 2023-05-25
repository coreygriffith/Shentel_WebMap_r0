console.log('coming from spliceclosue_legned!!!!!')

// Add legend
const legend = document.getElementById('legend');

// Array of closure sizes and corresponding colors
const closureSizes = [
  { size: 'Other', color: 'gray' },
  { size: '864 Case', color: 'red' },
  { size: '48 Cabinet', color: 'blue' },
  { size: '72 Cabinet', color: 'green' },
  { size: '96 Cabinet', color: 'yellow' },
  { size: '144 Cabinet', color: 'orange' },
  { size: '288 Cabinet', color: 'purple' },
  { size: '432 Cabinet', color: 'pink' },
  { size: '576 Cabinet', color: 'cyan' },
  { size: '2MP', color: 'darkgray' },
  { size: '4MP', color: 'brown' },
  { size: '6MP', color: 'magenta' },
  { size: '8MP', color: 'teal' },
  { size: '12MP', color: 'olive' },
  { size: 'B', color: 'navy' },
  { size: 'C', color: 'maroon' },
  { size: 'D', color: 'gold' }
];

// Generate legend HTML
let legendHTML = '';
closureSizes.forEach(closureSize => {
  legendHTML += `<div class="legend-item">
                    <span class="legend-color" style="background-color: ${closureSize.color}"></span>
                    <span class="legend-label" style="font-weight: bold;">${closureSize.size}</span>
                </div>`;
});

// Update legend HTML
legend.innerHTML = legendHTML;


// Add event listener to the legend button
const legendButton = document.getElementById('legendButton');
const legendContainer = document.getElementById('legendContainer');
// const legend = document.getElementById('legend');

legendButton.addEventListener('click', function () {
  if (legend.style.display === 'none') {
    legend.style.display = 'block'; // Show the legend
  } else {
    legend.style.display = 'none'; // Hide the legend
  }
});




const zoomWidget = document.getElementById('zoom-widget');
const zoomLevelElement = document.getElementById('zoom-level');

map.on('zoom', function () {
  const zoom = map.getZoom();
  zoomLevelElement.textContent = zoom.toFixed(2);
});

// Optional: Initialize the zoom level on page load
const initialZoom = map.getZoom();
zoomLevelElement.textContent = initialZoom.toFixed(2);

