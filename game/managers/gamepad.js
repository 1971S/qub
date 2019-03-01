// Make it an input manager
// Change how it works to have the cache, the current, and all the functions (pressed, hold. released, isAxis, quizás wasAxis para comparar lo de antes con lo de ahora?)

export class GamepadManager {

  constructor () {
    this.gp = navigator.getGamepads()[0];
    this.buttonsCache = {};
    this.buttonsCurr = {};
    this.init();
    this.updateBindings();
  }

  init () {
    window.addEventListener('gamepadconnected', (e) => {
      this.updateBindings();
      // console.log(navigator.getGamepads()); //eslint-disable-line
    });

    window.addEventListener('gamepaddisconnected', (e) => {
      this.updateBindings();
      // console.log(navigator.getGamepads()); //eslint-disable-line
    });
  }

  pollGamepads () {
    // this.gp = navigator.getGamepads()[0];
    // this.buttonsCache = this.buttonsCurr;
    // this.buttonsCurr = gp.buttons.filter(button => {
    //   if (button.value > 0) {
    //     this.buttonsCurr[button] = button.value;
    //   }
    // });
    return navigator.getGamepads()[0];
  }

  updateBindings () {

    if (this.gp) {
      this.gp = navigator.getGamepads()[0];
      this.A = this.gp.buttons[0];
      this.B = this.gp.buttons[1];
      this.X = this.gp.buttons[2];
      this.Y = this.gp.buttons[3];
      this.Select = this.gp.buttons[8];
      this.Start = this.gp.buttons[9];
      this.LeftX = this.gp.axes[0];
      this.LeftY = this.gp.axes[1];
      this.RightX = this.gp.axes[2];
      this.RightY = this.gp.axes[3];
    }
    // console.log(this);
  }

  isPressed (button) {
    // if (button)
  }
}
