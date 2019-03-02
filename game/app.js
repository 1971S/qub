// Aliases for PIXI methods and classes, if needed
const App = PIXI.Application;
const Loader = PIXI.loader;
const Container = PIXI.Container;
const Sprite = PIXI.Sprite;
const GFX = PIXI.Graphics;
const Text = PIXI.Text;
const TextStyle = PIXI.TextStyle;
const Resources = PIXI.loader.resources;

// Import the different managers that will provide helper functions
import { ResizeManager } from './managers/resize.js';
import { GamepadManager } from './managers/gamepad.js';
import { CollisionManager } from './managers/collision.js';

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
const Scener = new SceneDirector(app);
const GameDirector = new StateDirector(app, {
  Gamepad: new GamepadManager(), // Gamepad should be 'input', and send whatever input is chosen
  Collider: new CollisionManager(),
  Resizer: new ResizeManager(app),
  Scener,
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

// Add the app view to the document
document.body.appendChild(View);

// Use the loader to initialize all the assets
Loader
  .add([
    'assets/qub.png',
    'assets/platform.png',
    'assets/logo.png'
  ])
  .load(() => Scener.setup());

// gameLoop is called by the ticker with a delta; here you can manipulate the game state
app.gameLoop = function (delta) {

  // Start the execution of the stats, if they are enabled (uncommented at the start)
  if (app.stats) {
    app.stats.begin();
  }

  // Should be Input.update, to poll whatever type of input is decided (keyboard or GP)
  GameDirector.managers.Gamepad.update();

  // Call the function set as app.state with delta as interval
  GameDirector[app.state](delta);

};
