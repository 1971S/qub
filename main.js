const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x2c3e50,
  resizeTo: document,
  autoDensity: true,
  resolution: devicePixelRatio
});

window.addEventListener("gamepadconnected", function(e) {
  console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
      e.gamepad.index, e.gamepad.id,
      e.gamepad.buttons.length, e.gamepad.axes.length);
  }
);

function handleKeypress(event) {
  if (event.keyCode === 13) {
    toggleFullscreen();
  }
}


function toggleFullscreen() {
  let elem = document.querySelector("body");

  elem.requestFullscreen = elem.requestFullscreen || elem.mozRequestFullscreen
          || elem.msRequestFullscreen || elem.webkitRequestFullscreen;

  if (!document.fullscreenElement) {
    elem.requestFullscreen().then({}).catch(err => {
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
  
  app.resources = {};
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
