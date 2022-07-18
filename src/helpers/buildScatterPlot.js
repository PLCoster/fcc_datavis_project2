// Function to add a tooltip for the given data point to the tooltip container
function addToolTip(tooltipContainer, pointData) {
  // Add datapoint text to tooltip
  const tooltip = tooltipContainer
    .append('div')
    .style('background-color', pointData.Doping ? '#ffb2b2' : '#b2b2ff');

  tooltip
    .append('p')
    .style('font-weight', 600)
    .text(`${pointData.Name} (${pointData.Nationality})`);

  tooltip.append('p').text(`Year: ${pointData.Year},  Time: ${pointData.Time}`);

  if (pointData.Doping) {
    tooltip.append('p').attr('class', 'details').text(pointData.Doping);
  }
}

export default async function buildScatterPlot(raceData, containerWidth) {
  const d3 = await import('d3'); // Dynamic Import of d3

  const graphContainer = d3.select('#graph-container');
  graphContainer.html(''); // Remove 'Loading...' message or any previous graph svg

  // Add h1 title to graph
  graphContainer
    .append('h1')
    .attr('id', 'title')
    .text("35 Fastest Times Cycling Alpe d'Heuz");

  graphContainer
    .append('h3')
    .text('Comparison of Allegedy Doped vs. Clean Ascent Times');

  const width = Math.max(696, containerWidth);
  const height = 0.5 * width;
  const paddingLarge = 80;
  const paddingSmall = 20;

  const DOPED_COLOR = 'rgba(255,0,0,0.3)';
  const CLEAN_COLOR = 'rgba(0,0,255,0.3)';

  const graphSVG = graphContainer
    .append('svg')
    .attr('class', 'graph')
    .attr('width', width)
    .attr('height', height);

  graphContainer
    .append('label')
    .html(
      "<a href=\"https://en.wikipedia.org/wiki/Alpe_d'Huez\">L'Alpe d'Huez</a> is climbed regularly as a stage in the Tour de France",
    );
  graphContainer
    .append('label')
    .html('The above times are based on the 13.8km course to the summit');

  const [xMin, xMax] = d3.extent(raceData, (timeObj) => timeObj.Year);

  // Create Scales for x and y axes of graph:
  const xscale = d3
    .scaleLinear()
    .domain([xMin - 1, xMax + 1])
    .range([paddingLarge, width - paddingSmall]);

  const yscale = d3
    .scaleLinear()
    .domain(d3.extent(raceData, (timeObj) => timeObj.Seconds))
    .range([paddingSmall, height - paddingLarge / 2])
    .nice();

  // Add axes to the chart:
  const xAxis = d3.axisBottom(xscale).tickFormat((year) => year.toString());
  graphSVG
    .append('g')
    .attr('transform', `translate(0, ${height - paddingLarge / 2})`)
    .attr('id', 'x-axis')
    .call(xAxis);

  const yAxis = d3
    .axisLeft(yscale)
    .tickFormat(
      (seconds) =>
        `${Math.floor(seconds / 60)}:${(seconds % 60)
          .toString()
          .padStart(2, '0')}`,
    );
  graphSVG
    .append('g')
    .attr('transform', `translate(${paddingLarge}, 0)`)
    .attr('id', 'y-axis')
    .call(yAxis);

  // Add axis labels
  graphSVG
    .append('text')
    .attr('transform', 'rotate(-90)')
    .text('Time (MM:SS)')
    .attr('x', -height / 2)
    .attr('y', 30)
    .style('font-size', `${Math.max(Math.round(0.015 * width), 15)}px`)
    .style('font-weight', 600);

  graphSVG
    .append('text')
    .style('font-size', `${Math.max(Math.round(0.015 * width), 15)}px`)
    .text('Year')
    .attr('x', width / 2)
    .attr('y', height)
    .style('font-weight', 600);

  // Add data points to the ScatterPlot
  graphSVG
    .selectAll('circle')
    .data(raceData)
    .enter()
    .append('circle')
    .attr('class', 'dot')
    .attr('data-xvalue', (d) => d.Year)
    .attr('data-yvalue', (d) => new Date(d.Seconds * 1000))
    .attr('data-index', (d, i) => i)
    .attr('cx', (d) => xscale(d.Year))
    .attr('cy', (d) => yscale(d.Seconds))
    .attr('r', 5)
    .attr('fill', (d) => (d.Doping ? DOPED_COLOR : CLEAN_COLOR));

  // Add on hover tool-tip to graph
  const tooltipContainer = graphContainer
    .append('div')
    .style('position', 'absolute')
    .style('opacity', 0.0)
    .attr('id', 'tooltip');

  graphSVG
    .selectAll('.dot')
    .data(raceData)
    .on('mouseover', (event, pointData) => {
      // Move tooltip to mouse position
      tooltipContainer
        .html('')
        .attr('data-year', pointData.Year)
        .attr('data-time', pointData.Seconds)
        .style('display', 'block')
        .style('width', '200px')
        .style('opacity', 1.0)
        .style('top', `${event.layerY - 20}px`);

      // Position tooltip to the left or right of the cursor depending on position
      if (pointData.Year - xMin < (xMax - xMin) / 2) {
        tooltipContainer.style('left', `${event.layerX + 20}px`);
      } else {
        tooltipContainer.style('left', `${event.layerX - 220}px`);
      }

      // Add text to the ToolTip for any points lying under the mouse:
      const selectedRiders = new Set();
      graphSVG
        .selectAll('.dot')
        .nodes()
        .forEach((node) => {
          const index = parseInt(node.getAttribute('data-index'), 10);
          if (
            raceData[index].Year === pointData.Year &&
            raceData[index].Seconds === pointData.Seconds
          ) {
            selectedRiders.add(raceData[index].Name);
            addToolTip(tooltipContainer, raceData[index]);
          }
        });

      // Position the tooltip vertically based on its height:
      tooltipContainer.style(
        'top',
        `${
          event.layerY -
          Math.round(tooltipContainer.node().getBoundingClientRect().height / 2)
        }px`,
      );

      // Highlight all datapoints for the same athlete
      graphSVG
        .selectAll('.dot')
        .data(raceData)
        .attr('stroke', (d) => (selectedRiders.has(d.Name) ? 'black' : 'none'))
        .attr('r', (d) => (selectedRiders.has(d.Name) ? 10 : 5));
    })
    .on('mouseout', () => {
      // Undo any mouseover effects
      tooltipContainer.style('opacity', 0.0).style('width', '0');
      graphSVG.selectAll('.dot').attr('stroke', 'none').attr('r', 5);
    });

  // Add Legend to the chart (done last to avoid conflict with .dot circles)
  const legendContainer = graphSVG.append('g').attr('id', 'legend');

  const legendX = width - paddingSmall - 220;
  const legendY = paddingSmall + 50;

  legendContainer
    .append('text')
    .attr('x', legendX + 20)
    .attr('y', legendY)
    .text('Alleged Doping');

  legendContainer
    .append('circle')
    .attr('cx', legendX)
    .attr('cy', legendY - 5)
    .attr('r', 5)
    .attr('fill', DOPED_COLOR);

  legendContainer
    .append('text')
    .attr('x', legendX + 20)
    .attr('y', legendY + 30)
    .text('No Doping Allegations');

  legendContainer
    .append('circle')
    .attr('cx', legendX)
    .attr('cy', legendY + 25)
    .attr('r', 5)
    .attr('fill', CLEAN_COLOR);
}
