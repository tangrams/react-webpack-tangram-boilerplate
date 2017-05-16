import L from 'leaflet';

// You can do this, it just takes forever to bundle
// import Tangram from 'tangram';

// This is faster and will eventually be minified anyway in production
import Tangram from 'tangram/dist/tangram.debug';

import 'leaflet/dist/leaflet.css';
import './styles.css';

// Fix Leaflet's icon paths for Webpack
// See here: https://github.com/PaulLeCam/react-leaflet/issues/255
// Used in conjunction with url-loader.
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Create a Tangram map view
const map = L.map('map');
const layer = Tangram.leafletLayer({
  scene: {
    'import': 'https://mapzen.com/carto/bubble-wrap-style/7/bubble-wrap-style.zip',
    // TODO: get your own API key at https://mapzen.com/dashboard/. It's free!
    'global': { 'sdk_mapzen_api_key': 'mapzen-8SeUVxf' }
  },
  attribution: '<a href="https://mapzen.com/tangram">Tangram</a> | &copy; OSM contributors | <a href="https://mapzen.com/">Mapzen</a>'
});

layer.addTo(map);

map.setView([40.70531887544228, -74.00976419448853], 15);
