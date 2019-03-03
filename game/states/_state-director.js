// Import all states
import { end } from './end.js';
import { play } from './play.js';
import { pause } from './pause.js';

export class StateDirector {

  constructor (app) {
    this.app = app;
    this.play = (delta) => play(delta, this.app, this.app.managers);
    this.end = (delta) => end(delta, this.app, this.app.managers);
    this.pause = (delta) => pause(delta, this.app, this.app.managers);
    this.gameSetup();
  }

  gameSetup () {

    // Add the app view to the document, rendering the app
    document.body.appendChild(this.app.view);

    // app.state determines the function to be executed by gameLoop, enabling
    // having different states in the director: play, pause, end, etc
    this.app.state = 'play';

    // Add a ticker to the app that will create a game loop, by calling gameLoop with delta as interval
    this.app.ticker.add(delta => this.app.gameLoop(delta));

    // Here we define the function that'll be called by the ticker set in the Scener setup with a delta interval
    this.app.gameLoop = (delta) => {

      // Start the execution of the stats, if they are enabled (uncommented in app.js)
      if (this.app.stats) {
        this.app.stats.begin();
      }

      // Should be Input.update, to poll whatever type of input is decided (keyboard or GP)
      this.app.managers.Gamepad.update();

      // Call the function set as app.state with delta as interval
      this[this.app.state](delta);

    };

    // Use the PIXI loader to load the textures and call the scener setup after
    PIXI.loader
      .add([
        'assets/qub.png',
        'assets/platform.png',
        'assets/logo.png'
      ]).load(() => this.app.managers.Scener.setup());

  }

}
