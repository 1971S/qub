export function pause (delta, app) {

  const { Gamepad} = app.managers;

  if (Gamepad.onPressed('Start')) {
    app.activeState = 'play';
  }

}
