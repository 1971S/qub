import * as PIXI from 'pixi.js';

// Import the different managers that will provide helper functions globally
import { ResizeManager } from './managers/resize.js';
import { GamepadManager } from './managers/gamepad.js';
import { CollisionManager } from './managers/collision.js';

// Import all states created in the states folder, to be added in the constructor as functions
import { blank } from './states/_stateblueprint';

export class StateDirector {

  constructor (app) {
    this.app = app;

    this.blank = (delta) => blank(delta, this.app);

    this.gameSetup();
  }

  gameSetup () {

    // Initialize the managers that provide global helper functions
    this.app.managers = {
      Gamepad: new GamepadManager(this.app),
      Collider: new CollisionManager(this.app),
      Resizer: new ResizeManager(this.app),
    };

    // app.activeState determines the function to be executed by gameLoop, enabling
    // having different states in the director: play, pause, end, etc
    this.app.activeState = 'blank';

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
        'nameoffolderinpublic/player.png',
        'nameoffolderinpublic/platform.png',
        'nameoffolderinpublic/anim.json'
      ]).load(() => this.app.directors.Scener.setup());

  }

}
