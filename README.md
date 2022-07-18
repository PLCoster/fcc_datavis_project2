# Free Code Camp: Data Visualisation Project 2 - Scatterplot Graph

## Interactive Alpe d'Heuz Ascent Time Scatter Plot

The aim of this project was to build a small web app with functionality similar to: https://codepen.io/freeCodeCamp/full/bgpXyK

The project was built using the following technologies:

- **HTML**
- **JavaScript**
- **[D3](https://d3js.org/)** to generate the SVG scatter plot from the API data
- **[Bootstrap](https://getbootstrap.com/)** for styling with some custom **SASS**
- **[Bootstrap Icons](https://icons.getbootstrap.com/)** for logo icons
- **[webpack](https://webpack.js.org/)** to bundle JS / Styles and utilise development server

### Project Requirements:

- **User Story #1:** I can see a title element that has a corresponding `id="title"`.

- **User Story #2:** I can see an x-axis that has a corresponding `id="x-axis"`.

- **User Story #3:** I can see a y-axis that has a corresponding `id="y-axis"`.

- **User Story #4:** I can see dots, that each have a class of `dot`, which represent the data being plotted.

- **User Story #5:** Each dot should have the properties `data-xvalue` and `data-yvalue` containing their corresponding `x` and `y` values.

- **User Story #6:** The `data-xvalue` and `data-yvalue` of each dot should be within the range of the actual data and in the correct data format. For `data-xvalue`, integers (full years) or `Date` objects are acceptable for test evaluation. For `data-yvalue` (minutes), use `Date` objects.

- **User Story #7:** The `data-xvalue` and its corresponding dot should align with the corresponding point/value on the x-axis.

- **User Story #8:** The `data-yvalue` and its corresponding dot should align with the corresponding point/value on the y-axis.

- **User Story #9:** I can see multiple tick labels on the y-axis with `%M:%S` time format.

- **User Story #10:** I can see multiple tick labels on the x-axis that show the year.

- **User Story #11:** I can see that the range of the x-axis labels are within the range of the actual x-axis data.

- **User Story #12:** I can see that the range of the y-axis labels are within the range of the actual y-axis data.

- **User Story #13:** I can see a legend containing descriptive text that has `id="legend"`.

- **User Story #14:** I can mouse over an area and see a tooltip with a corresponding `id="tooltip"` which displays more information about the area.

- **User Story #15:** My tooltip should have a `data-year` property that corresponds to the `data-xvalue` of the active area.

### Project Writeup:

For thee second Free Code Camp: Data Visualisation Project, I created the scatter plot using the low-level D3 SVG API, building the plot by adding correctly positioned and coloured`<circle>` elements. The chart data is fetched from the source using the `fetch` API, with fallback to a saved copy of the data if the request fails. Once the data is received, the plot is generated.

Going beyond the required User Stories outlined above, the plot generated by the app is responsive to changes in the browser window size. Using the `window.onresize` event listener, when the window size changes, the graph is re-rendered to fit in the given screen size (down to a minimum useful size of the graph). In addition, the displayed tool-tip when the cursor is placed on a data bar in the graph adjusts its positioning to ensure it is always contained inside the graph area, and not hidden off screen.

Furthermore, as there are several overlapping data points on the graph, when mousing over a data point, the app checks for any other data points lying at the same position, and displays tool-tip info for every data-point at the cursor position. When hovering over a data point, the data point and all other data points associated with the same cyclist are enlarged, to allow the user to more easily identify cyclists with multiple times on the chart.

### Project Files:

- `index.html` - is a simple HTML template to mount the scatter plot SVG onto. Webpack adds the scripts required to load the JS bundle when the project is built.

- `index.js` - the entry point to the application, it first requests the required plot data using the `fetchData` helper function, and once it is received, builds the scatter plot by calling the `buildScatterPlot` helper function. It also sets up the `window.onresize` event listener to re-render the plot when the browser window is resized.

  - `helpers/fetchData.js` contains the `fetchData` helper function, which returns a promise that resolves when the requested data is received. If there is an error during the data request, the promise resolves with a backup hard-copy of the data (`assets/data.json`) instead.
  - `helpers/buildScatterPlot.js` builds and appends the SVG scatter plot to the `.graph-container` element of the page. Scaling and positioning of elements in the bar chart is aided using D3's `scaleLinear()` functionality. An on:hover tooltip is also added to the graph - it is a small div element which has its position, visibility and contents adjusted dynamically based on the current mouse position, using the `mouseover` event on `.dot` elements to trigger these changes.

- `styles.scss` - the main style sheet for the app, that imports both bootstrap / bootstrap-icon styles as well as custom styles from `scss/custom.scss`

- `/docs` - contains a copy of the built app files for deployment via github-pages

### Usage

Requires Node.js / NPM in order to install required packages. After downloading the repo, install required dependencies with:

`npm install`

The webpack development server can then be started with:

`npm run dev`

The development server can then be viewed at `http://localhost:8080/` in the browser.

A production build can be created in the `dist/` folder by running:

`npm run build`

To view the production build, open the output html file in the dist folder in your browser, or serve it using Live Server in VSCode.
