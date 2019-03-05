import React, { Component } from 'react';
import * as PIXI from 'pixi.js';
import './Pixapp.css';
import Pixauth from './Pixauth'

// Import the two directors: state (or game) director and scene director
import { SceneDirector } from './scene-director.js';
import { StateDirector } from './state-director.js';

class Pixapp extends Component {

  gameCanvas = React.createRef()

  componentDidMount() {

    // Initialize a new pixi app, with the desired settings
    this.app = new PIXI.Application({
      width: 1280,
      height: 720,
      backgroundColor: 0xffffff,
    });

    // Append the newly created app' view to the gameCanvas for rendering
    this.gameCanvas.current.appendChild(this.app.view);

    // Create the scenes object that will be used by both directors
    this.app.stage.scenes = {};

    // Instantiate the directors
    this.app.directors = {
      Scener: new SceneDirector(this.app),
      Game: new StateDirector(this.app),
    };

  }

  render() {
    return (
      <div>
        <Pixauth app={this.app}/>
        <div className="pixapp-header" ref={this.gameCanvas} />
      </div>
    );
  }

}

export default Pixapp;
