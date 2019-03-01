// Import the different managers that will provide helper functions
import { SceneManager } from './managers/scene.js';
import { ResizeManager } from './managers/resize.js';
import { GamepadManager } from './managers/Gamepad.js';
import { CollisionManager } from './managers/collision.js';

// Aliases for PIXI methods and classes
const App = PIXI.Application;
const Container = PIXI.Container;
const Sprite = PIXI.Sprite;
const GFX = PIXI.Graphics;
const Text = PIXI.Text;
const TextStyle = PIXI.TextStyle;
const Loader = PIXI.loader;
const Resources = PIXI.loader.resources;

// Initialize the PIXI App, with a variety of settings
const app = new App({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x2c3e50,
});

// Instantiate new managers, passing the newly created app if needed
const Scener = new SceneManager(app);
const Resizer = new ResizeManager(app);
const Gamepad = new GamepadManager();
const Collider = new CollisionManager();

// Aliases for app properties
const Stage = app.stage;
const Scenes = app.stage.scenes = {};
const Actors = app.stage.actors = {};
const View = app.view;
const Renderer = app.renderer;
const Ticker = app.ticker;

// Initialize and append the stats helper for debugging. Comment to disable
const domElement = document.getElementById('body');
const stats = new Stats();
stats.domElement.id = 'stats';
domElement.append(stats.domElement);

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

// Global objects: the Gamepad to use, should be inside the gamepad class
let gp;

// Setup is called as callback when the loader finishes loading all the textures
function setup () {

  // Call createScene for each scene that we want in the game. True means that scene will be initial
  Scener.createScene('premenu', true);
  Scener.createScene('menu');
  Scener.createScene('action');

  // Use createSprite to generate a new sprite with the correct position and anchor
  const logo = Scener.createSprite('assets/logo.png', 960, 540, 'center');

  // Initialize the player and assign different properties that will be used
  const player = Scener.createSprite('assets/qub.png', 300, 100, 'center', 'player');
  player.vx = 0;
  player.vy = 0;
  player.gravity = 100;
  player.jumpStrength = 700;
  player.jumps = 1;
  player.isJumping = false;

  // Initialize the platform
  const platform = Scener.createSprite('assets/platform.png', 500, 800, 'center', 'platform');

  // Add the different childs to each scene
  Scenes['menu'].addChild(logo);
  Scenes['action'].addChild(player);
  Scenes['action'].addChild(platform);

  // app.state determines the function to be executed by the gameloop, enabling
  // having different states: play, pause, end, etc
  app.state = play;

  // Add a ticker to the app that will create a game loop, by calling gameLoop with delta as interval
  Ticker.add(delta => gameLoop(delta));
}

// gameLoop is called by the ticker with a delta; here you can manipulate the current game state
function gameLoop (delta) {

  // Start the execution of the stats, if they are enabled (uncommented at the start)
  if (stats) {
    stats.begin();
  }

  // Poll the gamepads; should be done by the class itself
  gp = navigator.getGamepads();

  // Call the function set as app.state with delta as interval
  app.state(delta);
}

// First of our game states: in this case, play. Here should be all business logic related
// to the game execution, while not at pause or finalized

function play (delta) {

  // Save as cScene the current scene enabled, and establishes business logic in each case
  const cScene = app.currentScene;

  if (cScene === 'premenu') {
    if (gp[0] && Gamepad.A.pressed === true) {
      Resizer.toggleFullscreen();
      Scener.changeScene('menu');
    }
  }

  if (cScene === 'menu') {
    if (gp[0] && Gamepad.B.pressed === true) {
      Scener.changeScene('action');
    }
  }

  if (cScene === 'action') {
    if (!Collider.hitTestRectangle(Actors.player, Actors.platform)) {
      Actors.player.y += 10 * delta;
      Actors.player.jumps = 1;
    } else {
      // console.log('true hit');
    }

    if (gp[0] && Gamepad.A.pressed === true) {
      if (Actors.player.jumps > 0) {
        Actors.player.y -= 30 * delta;
      }
    }
  }

  if (stats) {
    stats.end();
  }
}

function pause (delta) {

}

function end () {

}
