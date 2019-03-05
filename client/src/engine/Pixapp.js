import React, { Component } from 'react';
import * as PIXI from 'pixi.js';

// Import the two directors: state (or game) director and scene director
import { SceneDirector } from './scene-director.js';
import { StateDirector } from './state-director.js';

import './Pixapp.css';

class Pixapp extends Component {

  gameCanvas = React.createRef()

  componentDidMount() {

    this.app = new PIXI.Application({
      width: 1280,
      height: 720,
      backgroundColor: 0xffffff,
    });

    this.gameCanvas.current.appendChild(this.app.view);
    this.app.stage.scenes = {};

    // Instantiate the directors
    this.app.directors = {
      Scener: new SceneDirector(this.app),
      Game: new StateDirector(this.app),
    };

  }

  render() {
    return (
      <div className="pixapp-header" ref={this.gameCanvas} />
    );
  }
}

export default Pixapp;
