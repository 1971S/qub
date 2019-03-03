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
  backgroundColor: 0x2c3e50,
  antialias: false,
  roundPixels: false,
});

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

app.stage.scenes = {};
app.stage.actors = {}; // This should be inside each scene
app.managers = {
  Gamepad: new GamepadManager(app),
  Collider: new CollisionManager(app),
  Resizer: new ResizeManager(app),
  Scener: new SceneDirector(app)
};

// Initialize and append the Stats helper for debugging. Comment all 4 lines to disable
const domElement = document.getElementById('body');
app.stats = new Stats();
app.stats.domElement.id = 'stats';
domElement.append(app.stats.domElement);

// Instantiate the state director and initialize it
app.GameDirector = new StateDirector(app);
