export function end (delta, app, managers) {

  const { Gamepad, Resizer, Collider, Scener } = managers;
  const cScene = app.currentScene;
  const Actors = app.stage.actors;

  if (app.stats) {
    app.stats.end();
  }

}
