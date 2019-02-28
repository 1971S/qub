import { GamepadController } from './lib/gamepad.js';
import { Resizer } from './lib/resizer.js';

const pxApp = PIXI.Application;
const pxCont = PIXI.Container;
const pxSprite = PIXI.Sprite;
const pxGfx = PIXI.Graphics;
const pxTxt = PIXI.Text;
const pxTxtStyle = PIXI.TextStyle;
const pxLoader = PIXI.loader;
const pxResources = PIXI.loader.resources;

const app = new pxApp({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x2c3e50,
});

const controller = new GamepadController(app);
controller.init();

const resizer = new Resizer(app);
resizer.init();

const aStage = app.stage;
const aView = app.view;
const aRender = app.renderer;

// esto hay que hacerlo auto si queremos al empezar
// function handleKeypress(event) {
//   if (event.keyCode === 13) {
//     resizer.toggleFullscreen();
//   }
// }

window.onload = () => {
  // window.addEventListener('keypress', handleKeypress, false)

  const domElement = document.getElementById('body');
  app.stats = new Stats();
  app.stats.domElement.id = 'stats';
  domElement.append(app.stats.domElement);
  document.body.appendChild(app.view);

  pxLoader
    .add('assets/cat.png')
    .load(setup);
};

let cat;

function setup () {

  // console.log(pxResources);
  
  cat = new pxSprite(pxResources['assets/cat.png'].texture);
  cat.x = 300;
  cat.y = 300;
  cat.vx = 0;
  cat.vy = 0;

  aStage.addChild(cat);
  app.state = play;
  app.ticker.add(delta => gameLoop(delta));
}

function gameLoop (delta) {
  app.state(delta);
  // console.log('hey');
}

function start (delta) {
  app.stats.begin();
  app.stats.end();
}

function play (delta) {
  app.stats.begin();
  app.stats.end();
}

function end () {

}
