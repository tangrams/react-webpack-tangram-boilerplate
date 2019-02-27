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
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: {
          plugins: [
            ['@babel/transform-react-jsx']
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
  }
};
