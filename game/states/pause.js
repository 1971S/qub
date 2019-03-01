export function pause (delta, app, m) {

  const { Gamepad, Resizer, Collider, Scener } = m;
  const cScene = app.currentScene;
  const Actors = app.stage.actors;

  if (app.gp[0] && Gamepad.Select.pressed === true) {
    app.state = 'play';
  }

}
