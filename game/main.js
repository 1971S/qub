import { SceneManager } from './managers/scene.js';
import { ResizeManager } from './managers/resize.js';
import { GamepadManager } from './managers/gamepad.js';
import { CollisionManager } from './managers/collision.js';

const App = PIXI.Application;
const Container = PIXI.Container;
const Sprite = PIXI.Sprite;
const GFX = PIXI.Graphics;
const Text = PIXI.Text;
const TextStyle = PIXI.TextStyle;
const Loader = PIXI.loader;
const Resources = PIXI.loader.resources;

const app = new App({
  width: 848,
  height: 440,
  backgroundColor: 0x2c3e50,
});

const scener = new SceneManager(app);
const resizer = new ResizeManager(app);
const gamepad = new GamepadManager();
let gp;
const collider = new CollisionManager();

const Stage = app.stage;
const Scenes = app.stage.scenes = {};
const View = app.view;
const Renderer = app.renderer;
Renderer.autoResize = true;

const domElement = document.getElementById('body');
app.stats = new Stats();
app.stats.domElement.id = 'stats';
domElement.append(app.stats.domElement);
document.body.appendChild(View);

Loader
  .add([
    'assets/qub.png',
    'assets/platform.png',
    'assets/logo.png'
  ])
  .load(setup);

let player;
let platform;

function setup () {

  scener.createScene('premenu', true);
  scener.createScene('menu');
  scener.createScene('action');

  let logo = new Sprite(Resources['assets/logo.png'].texture);
  logo.x = 300;
  logo.y = 300;
  
  player = new Sprite(Resources['assets/qub.png'].texture);
  player.x = 300;
  player.y = 100;
  player.vx = 0;
  player.vy = 0;
  player.jumps = 1;
  player.isJumping = false;

  platform = new Sprite(Resources['assets/platform.png'].texture);
  platform.x = 10;
  platform.y = 420;

  Scenes['menu'].addChild(logo);

  Scenes['action'].addChild(player);
  Scenes['action'].addChild(platform);

  // console.log(app);

  app.state = play;  
  app.ticker.add(delta => gameLoop(delta));
}

function gameLoop (delta) {
  gp = navigator.getGamepads();
  app.state(delta);
}

function play (delta) {
  app.stats.begin();

  const cScene = app.currentScene;

  if (cScene === 'premenu') {
    if (gp[0] && gamepad.A.pressed === true) {
      // resizer.toggleFullscreen();
      scener.changeScene(app.currentScene, 'menu');
    }
  }

  if (cScene === 'menu') {
    if (gp[0] && gamepad.B.pressed === true) {
      // resizer.toggleFullscreen();
      scener.changeScene(app.currentScene, 'action');
    }
  }

  if (cScene === 'action') {
    //
    if (!collider.hitTestRectangle(player, platform)) {
      player.y += 10 * delta;
    }

    if (gp[0] && gamepad.A.pressed === true) {
      player.y -= 30 * delta;
    }
  }

  app.stats.end();
}

function pause (delta) {

}

function end () {

}
