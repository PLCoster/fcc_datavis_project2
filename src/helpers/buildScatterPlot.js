export default async function buildScatterPlot(data) {
  const d3 = await import('d3'); // Dynamic Import of d3
  console.log('ScatterPlot Data: ', data);
  console.log('D3 is: ', d3);

  d3.select('#graph-container').text(data);
}
