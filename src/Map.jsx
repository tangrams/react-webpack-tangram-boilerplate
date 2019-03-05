// -- Import dependencies --
import React from 'react';

// -- Import Tangram --
// import Tangram from 'tangram';

// This is faster, and will be minified anyway in production
import Tangram from 'tangram/dist/tangram.debug.mjs';

// -- WEBPACK: Load styles --
import './styles.css';
// import { default as style } from './Tangram.css';
// console.log('tangramLayer?', Tangram);
// console.log('tangramLayer?', Tangram.tangramLayer);

export default class Map extends React.Component {
  constructor(props) {
    super();
    return;
  }

  componentDidMount() {
    console.log('Tangram:', Tangram);
    this.map = Tangram.tangramLayer('app', {});

    window.addEventListener('load', () => {
      const options = {
        scene: 'scene.yaml',
        maxZoom: 20,
        zoomSnap: 0,
        keyboard: false,
        logLevel: 'error',
      };
      this.map.center = { lat: 40.70531887544228, lng: -74.00976419448853 };
      this.map.zoom = 16.;

      this.map.initialize(options);
      window.scene = this.map.scene; // for debugging
      window.map = this.map; // for debugging
    });
  }

  render() {
    return (
      // <div style={style.TangramMap} ref={(ref) => { this.map = ref; }} />
      <div ref={(ref) => { this.map = ref; }} />
    );
  }
}
