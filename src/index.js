import './styles.scss';

import fetchData from './helpers/fetchData';
import buildScatterPlot from './helpers/buildScatterPlot';

// When DOM content is loaded, fetch data then build graph
document.addEventListener('DOMContentLoaded', async () => {
  await import('bootstrap'); // Dynamic Import of Bootstrap JS after DOM Loads

  // Fetch Data from API / File and then build the plot
  fetchData(
    'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json'
  ).then((graphData) => {
    buildScatterPlot(graphData);
  });
});
