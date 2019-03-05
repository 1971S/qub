import * as PIXI from 'pixi.js';

// Import the different managers that will provide helper functions globally
import { GamepadManager } from './managers/gamepad.js';
import { CollisionManager } from './managers/collision.js';

// Import all states
import { play } from './states/play.js';
import { pause } from './states/pause.js';
import { presentation } from './states/presentation.js';

export class StateDirector {

  constructor (app) {
    this.app = app;

    this.play = (delta) => play(delta, this.app);
    this.pause = (delta) => pause(delta, this.app);
    this.presentation = (delta) => presentation(delta, this.app);

    this.gameSetup();
  }

  gameSetup () {

    this.app.managers = {
      Gamepad: new GamepadManager(this.app),
      Collider: new CollisionManager(this.app),
    };

    // app.activeState determines the function to be executed by gameLoop, enabling
    // having different states in the director: play, pause, end, etc
    this.app.activeState = 'presentation';

    // Add a ticker to the app that will create a game loop, by calling gameLoop with delta as interval
    this.app.ticker.add(delta => this.app.gameLoop(delta));

    // Here we define the function that'll be called by the ticker set in the Scener setup with a delta interval
    this.app.gameLoop = (delta) => {

      this.app.managers.Gamepad.update();
      this[this.app.activeState](delta);

    };

    // Use the PIXI loader to load the textures and call the scener setup after (like 'nameoffolderinpublic/asset.png')
    PIXI.loader
    .add([
      'assets/qub.png',
      'assets/platform.png',
      'assets/logo.png',
      'assets/logo2.png',
      'assets/pixilogo.png',
      'assets/sheet.json',
      'assets/jslogo.png'
    ]).load(() => this.app.directors.Scener.setup());

  }

}
