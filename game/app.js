// Aliases for PIXI methods and classes
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
import { GamepadManager } from './managers/Gamepad.js';
import { CollisionManager } from './managers/collision.js';

import { SceneDirector } from './scenes/_scene-director.js';
import { StateDirector } from './states/_state-director.js';

// Initialize the PIXI App, with a variety of settings
const app = new App({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x2c3e50,
});

// Instantiate new managers, passing the newly created app if needed, and then instantiate the directors
const Gamepad = new GamepadManager();
const Collider = new CollisionManager();
const Resizer = new ResizeManager(app);

const Scener = new SceneDirector(app);
const Director = new StateDirector(app, {
  Gamepad,
  Collider,
  Scener,
  Resizer
}); // Gamepad should be 'input', and send whatever input is chosen

// Aliases for app properties
const Stage = app.stage;
const Scenes = app.stage.scenes = {};
const Actors = app.stage.actors = {};
const View = app.view;
const Renderer = app.renderer;
const Ticker = app.ticker;

// Initialize and append the stats helper for debugging. Comment to disable
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
  .load(setup);

// Setup is called as callback when the loader finishes loading all the textures
function setup () {

  // Call createScene for each scene that we want in the game. True means that scene will be initial
  Scener.createScene('premenu', true);
  Scener.createScene('menu');
  Scener.createScene('action');

  // Use createSprite to generate a new sprite with the correct position and anchor
  const logo = Scener.createSprite('assets/logo.png', 960, 540, 'center');

  // Initialize the player and assign different properties that will be used later
  const player = Scener.createSprite('assets/qub.png', 300, 100, 'center', 'player');
  player.vx = 0;
  player.vy = 0;
  player.gravity = 100;
  player.jumpStrength = 700;
  player.jumps = 1;
  player.isJumping = false;

  // Initialize the platform actor
  const platform = Scener.createSprite('assets/platform.png', 500, 800, 'center', 'platform');

  // Add the different childs to each scene
  Scenes['menu'].addChild(logo);
  Scenes['action'].addChild(player);
  Scenes['action'].addChild(platform);

  // app.state determines the function to be executed by the director in gameLoop, enabling
  // having different states in the director: play, pause, end, etc
  app.state = 'play';

  // Add a ticker to the app that will create a game loop, by calling gameLoop with delta as interval
  Ticker.add(delta => gameLoop(delta));

}

// gameLoop is called by the ticker with a delta; here you can manipulate the current game state
function gameLoop (delta) {

  // Start the execution of the stats, if they are enabled (uncommented at the start)
  if (app.stats) {
    app.stats.begin();
  }

  // Poll the gamepads; should be done by the class itself, and gp be inside
  app.gp = navigator.getGamepads();

  // Call the function set as app.state with delta as interval
  Director[app.state](delta);

}
