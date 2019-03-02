import { end } from './end.js';
import { play } from './play.js';
import { pause } from './pause.js';

export class StateDirector {

  constructor (app) {
    this.app = app;
    this.play = (delta) => play(delta, this.app, this.app.managers);
    this.end = (delta) => end(delta, this.app, this.app.managers);
    this.pause = (delta) => pause(delta, this.app, this.app.managers);
  }

  gameSetup () {

    // Add the app view to the document
    document.body.appendChild(this.app.view);

    // Use the PIXI loader to load the textures and call the scener setup after
    PIXI.loader
      .add([
        'assets/qub.png',
        'assets/platform.png',
        'assets/logo.png'
      ])
      .load(() => this.app.managers.Scener.setup());

    // app.gameLoop will be called by the ticker set in the Scener setup with a delta; here you can manipulate the game state
    this.app.gameLoop = (delta) => {

      // Start the execution of the stats, if they are enabled (uncommented at the start)
      if (this.app.stats) {
        this.app.stats.begin();
      }

      // Should be Input.update, to poll whatever type of input is decided (keyboard or GP)
      this.app.managers.Gamepad.update();

      // Call the function set as app.state with delta as interval
      this[this.app.state](delta);

    };

  }
}
