const webpack = require('webpack');
const path = require('path');

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
    // Apply `noParse` to Tangram to prevent mangling of UMD boilerplate
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
};
