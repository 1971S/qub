import { GamepadController } from './lib/gamepad.js';
import { Resizer } from './lib/resizer.js';

const app = new PIXI.Application({
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

  app.state = play;
  
  const domElement = document.getElementById('body');

  app.stats = new Stats();
  app.stats.domElement.id = "stats";
  domElement.append(app.stats.domElement);

  window.body.appendChild(app.view);
  app.ticker.add(delta => gameLoop(delta));
}

function setup () {

}

function gameLoop (delta) {
  app.state(delta);
}

function play (delta) {
  app.stats.begin();
  app.stats.end();
}

function end () {

}
