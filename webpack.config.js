const path = require('path');

module.exports = {
  entry: './src/index.js',
  // Export the production build to the dist folder, in the file main.js
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  // Any SASS files are compiled to css, then into CommonJS
  // and then added as style nodes to the page (check build <head>)
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
};
