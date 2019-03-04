// Import the different managers that will provide helper functions globally
import { ResizeManager } from './managers/resize.js';
import { GamepadManager } from './managers/gamepad.js';
import { CollisionManager } from './managers/collision.js';

// Import the two directors: state (or game) director and scene director
import { SceneDirector } from './scenes/_scene-director.js';
import { StateDirector } from './states/_state-director.js';

// Initialize the PIXI App, with the desired settings
const app = new PIXI.Application({
  width: 1280,
  height: 720,
  backgroundColor: 0xffffff,
  // antialias: true,
  // roundPixels: true,
});

// PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

app.stage.scenes = {};

app.managers = {
  Gamepad: new GamepadManager(app),
  Collider: new CollisionManager(app),
  Resizer: new ResizeManager(app),
};

// Instantiate the directors
app.directors = {
  Scener: new SceneDirector(app),
  Game: new StateDirector(app),
};
