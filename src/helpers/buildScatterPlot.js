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

  const DOPED_COLOR = 'rgba(255,0,0,0.3)';
  const CLEAN_COLOR = 'rgba(0,0,255,0.3)';

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
    .range([padding, width - padding]);

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
    .attr('class', 'dot')
    .attr('data-xvalue', (d) => d.Year)
    .attr('data-yvalue', (d) => new Date(d.Seconds * 1000))
    .attr('cx', (d) => xscale(d.Year))
    .attr('cy', (d) => yscale(d.Seconds))
    .attr('r', 5)
    .attr('fill', (d) => {
      return d.Doping ? DOPED_COLOR : CLEAN_COLOR;
    });

  // Add on hover tool-tip to graph

  const tooltip = graphContainer
    .append('div')
    .style('position', 'absolute')
    .style('opacity', 0.0)
    .attr('id', 'tooltip');

  graphSVG
    .selectAll('circle')
    .data(raceData)
    .on('mouseover', function (event, pointData) {
      console.log('Mouse over!', pointData);

      console.log('This is: ', this);

      // Move tooltip to mouse position
      tooltip
        .html('')
        .attr('data-year', pointData.Year)
        .attr('data-time', pointData.Seconds)
        .style('display', 'block')
        .style('width', '200px')
        .style('opacity', 1.0)
        .style('background-color', pointData.Doping ? '#ffb2b2' : '#b2b2ff')
        .style('top', `${event.layerY - 20}px`);

      // Position tooltip to the left or right of the cursor depending on position
      console.log(pointData.Year - xMin);
      if (pointData.Year - xMin < (xMax - xMin) / 2) {
        tooltip.style('left', `${event.layerX + 20}px`);
      } else {
        tooltip.style('left', `${event.layerX - 220}px`);
      }

      // Add datapoint text to tooltip
      tooltip
        .append('p')
        .style('font-weight', 600)
        .text(`${pointData.Name} (${pointData.Nationality})`);

      tooltip
        .append('p')
        .text(`Year: ${pointData.Year},  Time: ${pointData.Time}`);

      if (pointData.Doping) {
        tooltip.append('p').attr('class', 'details').text(pointData.Doping);
      }

      // Highlight all datapoints for the same athlete
      graphSVG
        .selectAll('circle')
        .data(raceData)
        .attr('stroke', (d) => {
          return d.Name === pointData.Name ? 'black' : 'none';
        })
        .attr('r', (d) => {
          return d.Name === pointData.Name ? 10 : 5;
        });
    })
    .on('mouseout', () => {
      // Undo any mouseover effects
      tooltip.style('opacity', 0.0).style('width', '0');
      graphSVG.selectAll('circle').attr('stroke', 'none').attr('r', 5);
    });
}
