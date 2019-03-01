export function pause (delta, app, m) {

  const { Gamepad, Resizer, Collider, Scener } = m;
  const cScene = app.currentScene;
  const Actors = app.stage.actors;

  if (Gamepad.onPressed('Start')) {
    app.state = 'play';
  }

}
