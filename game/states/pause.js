export function pause (delta, app) {

  const { Gamepad, Resizer, Collider } = app.managers;
  const { Scener } = app.directors;
  const cScene = app.currentScene;
  const Actors = app.stage.actors;

  if (Gamepad.onPressed('Start')) {
    app.state = 'play';
  }

  if (app.stats) app.stats.end();

}
