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
      if (Actors.logo.y > 192) Actors.logo.y -= 2;
    }
    if (Actors.logo.y <= 192) {
      Actors.logo.y = 192;
      if (Actors.anim) Scener.changeScene('presentation2', ['logo', 'anim']);
      else Scener.changeScene('presentation2', ['logo']);
    }

  }

  if (cScene === 'presentation2') {

    if (Gamepad.onPressed('A')) {
      Scener.changeScene('presentation3', ['logo', 'anim']);
    }

    if (Actors.sett.y > 600) {
      Actors.sett.y -= 5;
      Actors.lock.y -= 5;
      Actors.cont.y -= 5;
    }

  }

  if (cScene === 'presentation3') {

    // if (Gamepad.onPressed('A')) {
    //   Scener.changeScene('presentationend', ['logo', 'anim']);
    // }

    if (Actors.jsl.y > 600) {
      Actors.jsl.y -= 5;
      Actors.pxl.y -= 5;
    }

    if (Gamepad.onPressed('A')) {
      app.activeState = 'play';
      Scener.changeScene('menu', ['logo', 'anim']);
    }

  }

}
