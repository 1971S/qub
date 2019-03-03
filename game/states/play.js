export function play (delta, app, managers) {

  const { Gamepad, Resizer, Collider, Scener } = managers;
  const cScene = app.currentScene;
  const Actors = app.stage.actors;

  if (cScene === 'premenu') {
    if (Gamepad.onPressed('A')) {
      // Resizer.toggleFullscreen();
      Scener.changeScene('menu');
    }
  }

  if (cScene === 'menu') {
    if (Gamepad.onPressed('A')) {
      Scener.changeScene('action');
    }
  }

  if (cScene === 'action') {

    const player = Actors.player.controller;

    player.update();

    if (Gamepad.onPressed('Start')) {
      app.state = 'pause';
    }

    if (Gamepad.onPressed('A')) {
      player.jump();
    }

    if (Gamepad.axis('LeftX').aValue > 0.3) {
      player.move(player.speedX * Gamepad.axis('LeftX').oValue);
    }


  }

  if (app.stats) {
    app.stats.end();
  }

}
