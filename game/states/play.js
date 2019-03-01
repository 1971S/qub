export function play (delta, app, m) {

  // Save as cScene the current scene enabled, and establishes business logic in each case
  const { Gamepad, Resizer, Collider, Scener } = m;
  const cScene = app.currentScene;
  const Actors = app.stage.actors;

  if (cScene === 'premenu') {
    if (Gamepad.onPressed('A')) {
      Resizer.toggleFullscreen();
      Scener.changeScene('menu');
    }
  }

  if (cScene === 'menu') {
    if (Gamepad.onPressed('A')) {
      Scener.changeScene('action');
    }
  }

  if (cScene === 'action') {
    // if (!Collider.hitTestRectangle(Actors.player, Actors.platform)) {
    //   Actors.player.y += 10 * delta;
    //   Actors.player.jumps = 1;
    // } else {
    //   // console.log('true hit');
    // }

    if (Gamepad.onHold('A')) {
      if (Actors.player.jumps > 0) {
        Actors.player.y -= 30 * delta;
      }
    }

    if (Gamepad.onPressed('Start')) {
      app.state = 'pause';
    }

    if (Gamepad.axis('LeftX').aValue > 0.3) {
      Actors.player.x += 5 * Gamepad.axis('LeftX').oValue * delta;
    }

    // Start of flick detection
    // Gamepad.axis('LeftX').diff > 0.42 && console.log(Gamepad.axis('LeftX').diff, Gamepad.axis('LeftX').oValue);

  }

  if (app.stats) {
    app.stats.end();
  }
}
