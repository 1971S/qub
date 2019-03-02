export function pause (delta, app, managers) {

  const { Gamepad, Resizer, Collider, Scener } = managers;
  const cScene = app.currentScene;
  const Actors = app.stage.actors;

  if (Gamepad.onPressed('Start')) {
    app.state = 'play';
  }

  if (app.stats) {
    app.stats.end();
  }

}
