export function play (delta, app, m) {

  // Save as cScene the current scene enabled, and establishes business logic in each case
  const cScene = app.currentScene;
  const Actors = app.stage.actors;

  if (cScene === 'premenu') {
    if (app.gp[0] && m.Gamepad.A.pressed === true) {
      m.Resizer.toggleFullscreen();
      m.Scener.changeScene('menu');
    }
  }

  if (cScene === 'menu') {
    if (app.gp[0] && m.Gamepad.B.pressed === true) {
      m.Scener.changeScene('action');
    }
  }

  if (cScene === 'action') {
    if (!m.Collider.hitTestRectangle(Actors.player, Actors.platform)) {
      Actors.player.y += 10 * delta;
      Actors.player.jumps = 1;
    } else {
      // console.log('true hit');
    }

    if (app.gp[0] && m.Gamepad.A.pressed === true) {
      if (Actors.player.jumps > 0) {
        Actors.player.y -= 30 * delta;
      }
    }
  }

  if (app.stats) {
    app.stats.end();
  }
}
