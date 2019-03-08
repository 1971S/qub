// In use, but not fully adapted to react (window event listeners not working)
export class GamepadManager {

  constructor (app) {
    this.app = app;
    this.buttonsCache = {};
    this.buttonsStatus = {};
    this.axesCache = {};
    this.axesStatus = {};
    this.gp = navigator.getGamepads()[0];
    this.init();
    this.setBindings();
  }

  init () {

    window.addEventListener('gamepadconnected', (e) => console.log(navigator.getGamepads())); //eslint-disable-line
    window.addEventListener('gamepaddisconnected', (e) => console.log(navigator.getGamepads())); //eslint-disable-line

  }

  setBindings () {

    this.A = 0;
    this.B = 1;
    this.X = 2;
    this.Y = 3;
    this.LSButton = 4;
    this.RSButton = 5;
    this.LSTrigger = 6;
    this.RSTrigger = 7;
    this.Select = 8;
    this.Start = 9;
    this.LJButton = 10;
    this.RJButton = 11;
    this.DUp = 12;
    this.DDown = 13;
    this.DLeft = 14;
    this.DRight = 14;
    this.XBOXButton = 15;

    this.LeftX = 0;
    this.LeftY = 1;
    this.RightX = 2;
    this.RightY = 3;

  }

  update () {

    this.gp = navigator.getGamepads()[0];

    if (this.gp) {
      this.buttonsCache = this.buttonsStatus;
      this.buttonsStatus = {};

      for (let i = 0; i < this.gp.buttons.length; i++) {
        if (this.gp.buttons[i].value > 0) {
          this.buttonsStatus[i] = this.gp.buttons[i].value;
        }
      }

      this.axesCache = this.axesStatus;
      this.axesStatus = {};

      for (let i = 0; i < this.gp.axes.length; i++) {
        if (this.gp.axes[i] !== 0) {
          this.axesStatus[i] = this.gp.axes[i];
        }
      }
    }

  }

  onPressed (buttonString) {

    if (!this.gp) return false;
    const target = this[buttonString];
    if (!this.buttonsCache[target] && this.buttonsStatus[target]) {
      return {
        result: true,
        value: this.buttonsStatus[target],
      };
    } else return false;

  }

  onHold (buttonString) {

    if (!this.gp) return false;
    const target = this[buttonString];
    if (this.buttonsCache[target] && this.buttonsStatus[target]) {
      return {
        result: true,
        value: this.buttonsStatus[target],
      };
    } else return false;

  }

  onRelease (buttonString) {

    if (!this.gp) return false;
    const target = this[buttonString];
    if (this.buttonsCache[target] && !this.buttonsStatus[target]) {
      return {
        result: true,
        value: 0,
      };
    } else return false;

  }

  axis (axisString) {

    if (!this.gp) return false;
    const target = this[axisString];
    if (this.axesStatus[target]) {
      return {
        oValue: this.axesStatus[target],
        aValue: Math.abs(this.axesStatus[target]),
        diff: this.axesCache[target] ? this.axesStatus[target] - this.axesCache[target] : this.axesStatus[target]
      };
    } else return false;

  }

}
