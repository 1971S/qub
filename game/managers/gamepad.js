// Make it an input manager
// Change how it works to have the cache, the current, and all the functions (pressed, hold. released, isAxis, quizás wasAxis para comparar lo de antes con lo de ahora?)

export class GamepadManager {

  constructor () {
    this.init();
  }

  init () {
    window.addEventListener('gamepadconnected', (e) => {
      this.updateBindings();
      console.log(navigator.getGamepads()); //eslint-disable-line
    });

    window.addEventListener('gamepaddisconnected', (e) => {
      this.updateBindings();
      console.log(navigator.getGamepads()); //eslint-disable-line
    });

    this.updateBindings();
  }

  updateBindings () {
    if (navigator.getGamepads()[0]) {
      this.A = navigator.getGamepads()[0].buttons[0];
      this.B = navigator.getGamepads()[0].buttons[1];
      this.X = navigator.getGamepads()[0].buttons[2];
      this.Y = navigator.getGamepads()[0].buttons[3];
      this.Select = navigator.getGamepads()[0].buttons[8];
      this.Start = navigator.getGamepads()[0].buttons[9];
    }
  }
}
