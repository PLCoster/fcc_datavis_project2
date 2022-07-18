import './styles.scss';

import fetchData from './helpers/fetchData';
import buildScatterPlot from './helpers/buildScatterPlot';

// Helper function that returns the width of the element specified by the selectorString
function getWidth(selectorString) {
  return document.querySelector(selectorString).getBoundingClientRect().width;
}

// When DOM content is loaded, fetch data then build graph
document.addEventListener('DOMContentLoaded', async () => {
  await import('bootstrap'); // Dynamic Import of Bootstrap JS after DOM Loads

  // Fetch Data from API / File and then build the plot
  fetchData(
    'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json',
  ).then((graphData) => {
    // Build initial plot and set event to re-render plot on window width change
    buildScatterPlot(graphData, getWidth('#graph-container'));

    window.addEventListener('resize', () => {
      buildScatterPlot(graphData, getWidth('#graph-container'));
    });
  });
});
