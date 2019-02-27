// -- Import dependencies --
import React from 'react';
import { Map } from 'react-leaflet';

// -- Import Tangram --
import Tangram from 'tangram';

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

// NOTE: This uses react-leaflet to use Leaflet as a proper React component.
// https://github.com/PaulLeCam/react-leaflet

export default class LeafletMap extends React.Component {
  componentDidMount() {
    const layer = Tangram.leafletLayer({
      scene: {
        import: [
          'https://www.nextzen.org/carto/bubble-wrap-style/8/bubble-wrap-style.zip',
          'https://www.nextzen.org/carto/bubble-wrap-style/8/themes/label-10.zip'
        ],
        sources: {
          mapzen: {
            url: 'https://tile.nextzen.org/tilezen/vector/v1/256/all/{z}/{x}/{y}.mvt',
            url_params: {
                api_key: 'tsINU1vsQnKLU1jjCimtVw'
            },
            tile_size: 256,
            max_zoom: 16
          }
        }
      }
    });

    layer.addTo(this.map.leafletElement);
  }

  render() {
    return (
      <Map center={[40.70532, -74.00976]} zoom={15} ref={(ref) => { this.map = ref }} />
    );
  }
}
