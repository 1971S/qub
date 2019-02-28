// initialize the PIXI app
const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x2c3e50,
});

// eventlistener for gamepad connection, pre-step for the gamepad integration. needs gamepaddisconnect too
window.addEventListener("gamepadconnected", function(e) {
  console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
  e.gamepad.index, e.gamepad.id,
  e.gamepad.buttons.length, e.gamepad.axes.length);
});

// event and function for resizing the window, fullscreen or not
window.addEventListener('resize', resize);

function resize() {
  app.renderer.resize(window.innerWidth, window.innerHeight);
}

function handleKeypress(event) {
  if (event.keyCode === 13) {
    toggleFullscreen();
  }
}

// function to go in and out of fullscreen
function toggleFullscreen() {
  let e = document.getElementById("body");

  e.requestFullscreen = e.requestFullscreen || e.mozRequestFullscreen || e.msRequestFullscreen || e.webkitRequestFullscreen;

  if (!document.fullscreenElement) {
    e.requestFullscreen().then({}).catch(err => {
      console.log(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
    });
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

window.onload = () => {
  window.addEventListener('keypress', handleKeypress, false)

  app.state = play;
  app.stats = new Stats();

  const domElement = document.getElementById('body');
  app.stats.domElement.id = "stats";
  domElement.append(app.stats.domElement);
  window.body.appendChild(app.view);

  app.ticker.add(delta => gameLoop(delta));
}

function gameLoop (delta) {
  app.state(delta);
}

function play (delta) {
  app.stats.begin();
  app.stats.end();
}
