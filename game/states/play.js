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

    if (Gamepad.onPressed('Start')) {
      app.state = 'pause';
    }

    if (Gamepad.onPressed('A')) {
      player.jump();
    }

    if (Gamepad.axis('LeftX').aValue > 0.3) {
      player.move(0.8 * Gamepad.axis('LeftX').oValue);
    }

    player.update();

  }

  if (app.stats) {
    app.stats.end();
  }

}

