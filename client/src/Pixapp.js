import React, { Component } from 'react';
import * as PIXI from 'pixi.js';

// Import the different managers that will provide helper functions globally
import { ResizeManager } from './engine/managers/resize.js';
import { GamepadManager } from './engine/managers/gamepad.js';
import { CollisionManager } from './engine/managers/collision.js';

// Import the two directors: state (or game) director and scene director
import { SceneDirector } from './engine/scenes/_scene-director.js';
import { StateDirector } from './engine/states/_state-director.js';

import './Pixapp.css';

class Pixapp extends Component {

  componentDidMount() {
    
    this.app = new PIXI.Application({
      width: 1280,
      height: 720,
      backgroundColor: 0xffffff,
      // antialias: true,
      // roundPixels: true,
    });
    this.gameCanvas.appendChild(this.app.renderer.view);
    this.app.stage.scenes = {};
    this.app.managers = {
      Gamepad: new GamepadManager(this.app),
      Collider: new CollisionManager(this.app),
      Resizer: new ResizeManager(this.app),
    };

    // Instantiate the directors
    this.app.directors = {
      Scener: new SceneDirector(this.app),
      Game: new StateDirector(this.app, this.gameCanvas),
    };

    console.log('pixapp', this.app);
  }

  render() {
    return (
      <div ref={(thisDiv) => {this.gameCanvas = thisDiv}} />
    );
  }
}

export default Pixapp;
