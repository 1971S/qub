export function presentation (delta, app) {

  const { Gamepad } = app.managers;
  const { Scener } = app.directors;
  const cScene = app.activeScene;
  const Actors = app.stage.scenes[cScene] && app.stage.scenes[cScene].actors;

  if (cScene === 'presentation0') {

    if (Gamepad.onPressed('A')) {
      Scener.changeScene('presentation1');
    }

  }

  if (cScene === 'presentation1') {

    if (Gamepad.onPressed('A')) {
      Actors.logo.y -= 1;
    }

    if (Actors.logo.y !== 360) {
      if (Actors.logo.y > 192) Actors.logo.y -= 2 * delta;
    }
    
    if (Actors.logo.y <= 192) {
      Actors.logo.y = 192;
      if (Actors.anim) Scener.changeScene('presentation2', ['logo', 'anim']);
      else Scener.changeScene('presentation2', ['logo']);
    }

  }

  if (cScene === 'presentation2') {

    if (Gamepad.onPressed('A') && Actors.sett.y <= 600) {
      Scener.changeScene('presentation3', ['logo', 'anim']);
    }

    if (Actors.sett.y > 600) {
      Actors.sett.y -= 5 * delta;
      Actors.lock.y -= 5 * delta;
      Actors.cont.y -= 5 * delta;
    }

  }

  if (cScene === 'presentation3') {

    if (Actors.jsl.y > 600) {
      Actors.jsl.y -= 5 * delta;
      Actors.pxl.y -= 5 * delta;
    }

    if (Gamepad.onPressed('A') && Actors.jsl.y <= 600) {
      app.activeState = 'play';
      Scener.changeScene('menu', ['logo', 'anim']);
    }

  }

}
