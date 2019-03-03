export function end (delta, app) {

  const { Gamepad, Resizer, Collider } = app.managers;
  const { Scener } = app.directors;
  const cScene = app.activeScene;
  const Actors = app.stage.scenes[cScene] && app.stage.scenes[cScene].actors;

  //

  if (app.stats) app.stats.end();

}
