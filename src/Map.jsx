// -- Import dependencies --
import L from 'leaflet';
import React from 'react';

// -- Import Tangram --

// You can import the main library, but it takes forever to bundle, because
// it is already minified.
// import Tangram from 'tangram';

// This is faster, and will be minified anyway in production
import Tangram from 'tangram/dist/tangram.debug';

// -- WEBPACK: Load styles --
import 'leaflet/dist/leaflet.css';
import './styles.css';

// -- LEAFLET: Fix Leaflet's icon paths for Webpack --
// See here: https://github.com/PaulLeCam/react-leaflet/issues/255
// Used in conjunction with url-loader.
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// NOTE: This uses React to create a "wrapper" component around an HTML element
// that Leaflet hooks into. This means you need to manage Leaflet's state
// manually, which may not be what you want to work in a pure React way.
// As an alternative, you may want to check out https://github.com/PaulLeCam/react-leaflet

export default class Map extends React.Component {
  componentDidMount() {
    const map = L.map(this.mapEl);
    const layer = Tangram.leafletLayer({
      scene: {
        import: [
          'https://mapzen.com/carto/bubble-wrap-style/8/bubble-wrap-style.zip',
          'https://mapzen.com/carto/bubble-wrap-style/8/themes/label-10.zip'
        ],
        // TODO: get your own API key at https://mapzen.com/dashboard/. It's free!
        'global': { 'sdk_mapzen_api_key': 'mapzen-8SeUVxf' }
      },
      attribution: '<a href="https://mapzen.com/tangram">Tangram</a> | &copy; OSM contributors | <a href="https://mapzen.com/">Mapzen</a>'
    });

    layer.addTo(map);

    map.setView([40.70531887544228, -74.00976419448853], 15);
  }

  render() {
    return (
      <div ref={(ref) => {this.mapEl = ref }} />
    );
  }
}
