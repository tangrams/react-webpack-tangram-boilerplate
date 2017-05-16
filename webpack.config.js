const webpack = require('webpack');
const path = require('path');

// Uses uglifyJSPlugin settings from --optimize-minimize
// (https://webpack.js.org/guides/production-build/#minification)
// but with an option in `compress` turned off. The `comparisons` option will
// mangle a check for `"undefined"!==typeof module&&module.exports` to
// `void 0!==e&&e.exports` which causes the browser to report `e` is undefined.
const uglifyJSPlugin = new webpack.optimize.UglifyJsPlugin({
  sourceMap: 'sourcemap',
  compress: {
    comparisons: false
  },
  // Optional: destroy all comments in final output.
  comments: false
});
const pluginsList = (process.env.NODE_ENV === 'production') ? [uglifyJSPlugin] : [];

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    entry: './main.js'
  },
  output: {
    path: path.resolve(__dirname, 'public/scripts'),
    publicPath: 'scripts/',
    filename: 'bundle.js'
  },
  module: {
    // Prevent mangling of UMD boilerplate when bundling (without optimization)
    noParse: /tangram\/dist\/tangram/,
    rules: [{
      test: /\.js&/,
      include: path.resolve(__dirname, 'src'),
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            ['es2015', { modules: false }]
          ]
        }
      }]
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    },
    {
      // This is required to bundle images in Leaflet's stylesheet.
      test: /\.png$/,
      use: 'url-loader'
    }]
  },
  plugins: pluginsList
};
