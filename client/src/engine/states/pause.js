export function pause (delta, app) {

  const { Gamepad} = app.managers;
  // const { Scener } = app.directors;
  // const cScene = app.activeScene;
  // const Actors = app.stage.scenes[cScene] && app.stage.scenes[cScene].actors;

  if (Gamepad.onPressed('Start')) {
    app.activeState = 'play';
  }

}
