// Aliases for PIXI methods and classes, if needed
const App = PIXI.Application;
const Container = PIXI.Container;
const Sprite = PIXI.Sprite;
const GFX = PIXI.Graphics;
const Text = PIXI.Text;
const TextStyle = PIXI.TextStyle;
const Loader = PIXI.loader;
const Resources = PIXI.loader.resources;

// Import the different managers that will provide helper functions
import { ResizeManager } from './managers/resize.js';
import { GamepadManager } from './managers/gamepad.js';
import { CollisionManager } from './managers/collision.js';
import { PlatformManager } from './managers/platform.js';

// Import the two directors: state (or game) director and scene director
import { SceneDirector } from './scenes/_scene-director.js';
import { StateDirector } from './states/_state-director.js';

// Initialize the PIXI App, with the desired settings
const app = new App({
  width: 1280,
  height: 720,
  backgroundColor: 0x2c3e50,
  antialias: false,
  roundPixels: true,
});

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

// Instantiate the state director, passing in all new managers and the scene director with the recently created app
const GameDirector = new StateDirector(app, {
  Gamepad: new GamepadManager(app), // Gamepad should be 'input', and send whatever input is chosen
  Platform: new PlatformManager(app),
  Collider: new CollisionManager(app),
  Resizer: new ResizeManager(app),
  Scener: new SceneDirector(app)
});

// Aliases for app properties, if needed
const Stage = app.stage;
const Scenes = app.stage.scenes = {};
const Actors = app.stage.actors = {};
const View = app.view;
const Renderer = app.renderer;
const Ticker = app.ticker;

// Initialize and append the Stats helper for debugging. Comment to disable
const domElement = document.getElementById('body');
app.stats = new Stats();
app.stats.domElement.id = 'stats';
domElement.append(app.stats.domElement);

// Initialize the game instance
GameDirector.gameSetup();
