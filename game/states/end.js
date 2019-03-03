export function end (delta, app) {

  const { Gamepad, Resizer, Collider } = app.managers;
  const { Scener } = app.directors;
  const cScene = app.currentScene;
  const Actors = app.stage.actors;

  //

  if (app.stats) app.stats.end();

}
