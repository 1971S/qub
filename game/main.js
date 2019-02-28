import { GamepadController } from './lib/gamepad.js';
import { Resizer } from './lib/resizer.js';

const App = PIXI.Application;
const Container = PIXI.Container;
const Sprite = PIXI.Sprite;
const GFX = PIXI.Graphics;
const Text = PIXI.Text;
const TextStyle = PIXI.TextStyle;
const Loader = PIXI.loader;
const Resources = PIXI.loader.resources;

const app = new App({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x2c3e50,
});

let gp;
const gamepads = new GamepadController(app);
gamepads.init();

const resizer = new Resizer(app);
resizer.init();

const Stage = app.stage;
const Scenes = app.stage.scenes = {};
const View = app.view;
const Renderer = app.renderer;

// esto hay que hacerlo auto si queremos al empezar, no al pulsar enter
// window.addEventListener('keypress', handleKeypress, false)
// function handleKeypress(event) {
//   if (event.keyCode === 13) {
//     resizer.toggleFullscreen();
//   }
// }

window.onload = () => {

  const domElement = document.getElementById('body');
  app.stats = new Stats();
  app.stats.domElement.id = 'stats';
  domElement.append(app.stats.domElement);
  document.body.appendChild(View);

  Loader
    .add('assets/cat.png')
    .load(setup);
};

let initialized = false;
let player;
let currentScene;

function setup () {

  const sceneMenu = new Container();
  sceneMenu.tag = 'menu';
  Stage.addChild(sceneMenu);
  Scenes[sceneMenu.tag] = sceneMenu;

  const sceneAction = new Container();
  sceneAction.tag = 'action';
  Stage.addChild(sceneAction);
  Scenes[sceneAction.tag] = sceneAction;
  sceneAction.visible = false;
  
  player = new Sprite(Resources['assets/cat.png'].texture);
  player.x = 300;
  player.y = 300;
  player.vx = 0;
  player.vy = 0;
  sceneAction.addChild(player);
  
  app.state = start;
  app.ticker.add(delta => gameLoop(delta));
}

function gameLoop (delta) {
  gp = navigator.getGamepads();
  app.state(delta);
}

function start (delta) {
  app.stats.begin();

  if (initialized) {
    app.state = play;
    Scenes['action'].visible = true;
    Scenes['menu'].visible = false;
  } else {
    if (gp[0] && gp[0].buttons[0].pressed === true) {
      updateScene('play');
      // console.log('hey');
      // console.log(gamepads);
    } 
  }

  app.stats.end();
}

function play (delta) {
  app.stats.begin();
  app.stats.end();
}

function end () {

}

function updateScene (targetScene) {
  // console.log(currentScene);
  
  switch (targetScene) {
  case 'start':
    // app.backgroundColor = 0x2c3e50;
    
    break;
  case 'play':
    // console.log('hey');
    // app.backgroundColor = 0xE9EAEC;
    initialized = true;
    break;
  }
}

function createScene (tag) {

}