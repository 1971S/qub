export function play (delta, app, m) {

  // Save as cScene the current scene enabled, and establishes business logic in each case
  const { Gamepad, Resizer, Collider, Scener } = m;
  const cScene = app.currentScene;
  const Actors = app.stage.actors;

  if (cScene === 'premenu') {
    if (app.gp[0] && Gamepad.A.pressed === true) {
      Resizer.toggleFullscreen();
      Scener.changeScene('menu');
    }
  }

  if (cScene === 'menu') {
    if (app.gp[0] && Gamepad.B.pressed === true) {
      Scener.changeScene('action');
    }
  }

  if (cScene === 'action') {
    if (!Collider.hitTestRectangle(Actors.player, Actors.platform)) {
      Actors.player.y += 10 * delta;
      Actors.player.jumps = 1;
    } else {
      // console.log('true hit');
    }

    if (app.gp[0] && Gamepad.A.pressed === true) {
      if (Actors.player.jumps > 0) {
        Actors.player.y -= 30 * delta;
      }
    }

    if (app.gp[0] && Gamepad.Start.pressed === true) {
      app.state = 'pause';
    }

  }

  if (app.stats) {
    app.stats.end();
  }
}
