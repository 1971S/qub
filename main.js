const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x2c3e50,
});

window.addEventListener("gamepadconnected", function(e) {
  console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
      e.gamepad.index, e.gamepad.id,
      e.gamepad.buttons.length, e.gamepad.axes.length);
  }
);

window.onload = () => {

  app.resources = {};
  app.state = play;
  app.stats = new Stats();

  const domElement = document.getElementById('body');
  app.stats.domElement.id = "stats";
  domElement.append(app.stats.domElement);

  window.body.appendChild(app.view);
  app.ticker.add(delta => gameLoop(delta));

  window.onresize = () => {
    app.view.width = window.innerWidth;
    app.view.height = window.innerHeight;
  }

}

function gameLoop (delta) {
  app.state(delta);
}

function play (delta) {
  app.stats.begin();
  app.stats.end();
}
