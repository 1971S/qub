export function presentation (delta, app) {

  const { Gamepad } = app.managers;
  const { Scener } = app.directors;
  const cScene = app.activeScene;

  if (cScene === 'presentation1') {

    if (Gamepad.onPressed('A')) {
      // Resizer.toggleFullscreen();
      Scener.changeScene('presentationend', ['logo', 'anim']);
    }

  }

  if (cScene === 'presentationend') {

    if (Gamepad.onPressed('A')) {
      app.activeState = 'play';
      Scener.changeScene('menu');
    }

    if (Gamepad.onPressed('B')) {
      Scener.changeScene('presentation1', ['logo', 'anim']); // should be the prev, not the first one
    }

  }

}
