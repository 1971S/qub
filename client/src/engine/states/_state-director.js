// Import all states
import { end } from './end.js';
import { play } from './play.js';
import { pause } from './pause.js';
import { presentation } from './presentation.js';
import * as PIXI from 'pixi.js';

export class StateDirector {

  constructor (app) {
    this.app = app;
    this.play = (delta) => play(delta, this.app);
    this.end = (delta) => end(delta, this.app);
    this.pause = (delta) => pause(delta, this.app);
    this.presentation = (delta) => presentation(delta, this.app);
    this.gameSetup();
  }

  gameSetup () {
    
    // Add the app view to the document, rendering the app
    // document.body.appendChild(this.app.view);
    
    // Initialize and append the Stats helper for debugging. Comment all 4 lines to disable
    // const domElement = document.getElementById('body');
    // this.app.stats = new Stats();
    // this.app.stats.domElement.id = 'stats';
    // domElement.append(this.app.stats.domElement);
    
    // app.activeState determines the function to be executed by gameLoop, enabling
    // having different states in the director: play, pause, end, etc
    this.app.activeState = 'presentation';
    
    // Add a ticker to the app that will create a game loop, by calling gameLoop with delta as interval
    this.app.ticker.add(delta => this.app.gameLoop(delta));
    // this.app.start();
    
    // Here we define the function that'll be called by the ticker set in the Scener setup with a delta interval
    this.app.gameLoop = (delta) => {
      // console.log('hello from the delta');
      
      // Start the execution of the stats, if they are enabled (uncommented in app.js)
      if (this.app.stats) this.app.stats.begin();
      
      this.app.managers.Gamepad.update();
      
      this[this.app.activeState](delta);
      
    };
    
    // Use the PIXI loader to load the textures and call the scener setup after
    PIXI.loader
    .add([
      '../assets/qub.png',
      '../assets/platform.png',
      '../assets/logo.png',
      '../assets/logo2.png',
      '../assets/pixilogo.png',
      '../assets/sheet.json',
      '../assets/jslogo.png'
    ]).load(() => this.app.directors.Scener.setup());
    
    console.log('all state loaded', this.app);
  }
  
}
