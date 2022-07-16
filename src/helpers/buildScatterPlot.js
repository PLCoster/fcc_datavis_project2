export default async function buildScatterPlot(raceData, width) {
  const d3 = await import('d3'); // Dynamic Import of d3
  console.log('ScatterPlot Data: ', raceData);
  console.log('D3 is: ', d3);

  const graphContainer = d3.select('#graph-container');
  graphContainer.html(''); // Remove 'Loading...' message or any previous graph svg
  // d3.select('#graph-container').text(data);

  // Add h1 title to graph
  graphContainer
    .append('h1')
    .attr('id', 'title')
    .text("35 Fastest Times Cycling Alpe d'Heuz");

  width = 1000;
  const height = 0.6 * width;
  const padding = 80;

  const graphSVG = graphContainer
    .append('svg')
    .attr('class', 'graph')
    .attr('width', width)
    .attr('height', height);

  graphContainer.append('label').html('TODO - ADD LABEL');

  const [xMin, xMax] = d3.extent(raceData, (timeObj) => timeObj.Year);

  // Create Scales for x and y axes of graph:
  const xscale = d3
    .scaleLinear()
    .domain([xMin - 1, xMax + 1])
    .range([padding, width - padding])
    .nice();

  const yscale = d3
    .scaleLinear()
    .domain(d3.extent(raceData, (timeObj) => timeObj.Seconds))
    .range([padding, height - padding])
    .nice();

  // Add axes to the chart:
  const xAxis = d3.axisBottom(xscale).tickFormat((year) => year.toString());
  graphSVG
    .append('g')
    .attr('transform', `translate(0, ${height - padding})`)
    .attr('id', 'x-axis')
    .call(xAxis);

  const yAxis = d3
    .axisLeft(yscale)
    .tickFormat(
      (seconds) =>
        `${Math.floor(seconds / 60)}:${(seconds % 60)
          .toString()
          .padStart(2, '0')}`
    );
  graphSVG
    .append('g')
    .attr('transform', `translate(${padding}, 0)`)
    .attr('id', 'y-axis')
    .call(yAxis);

  // !!! Add axis labels
  graphSVG
    .append('text')
    .attr('transform', 'rotate(-90)')
    .text('Time (MM:SS)')
    .attr('x', -yscale(0))
    .attr('y', 30)
    .style('font-size', `${Math.round(0.015 * width)}px`);

  graphSVG
    .append('text')
    .style('font-size', `${Math.round(0.015 * width)}px`)
    .text('Year')
    .attr('x', width / 2 - 45)
    .attr('y', height - 40);

  // Add data points to the ScatterPlot
  graphSVG
    .selectAll('circle')
    .data(raceData)
    .enter()
    .append('circle')
    .attr('cx', (d) => xscale(d.Year))
    .attr('cy', (d) => yscale(d.Seconds))
    .attr('r', 5)
    .attr('fill', (d) =>
      d.Doping ? 'rgba(255,0,0,0.5)' : 'rgba(0,0,255,0.5)'
    );

  console.log('Made it here!!!!');
}
