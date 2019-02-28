// convertirlo en input manager

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
    }
  }
}
