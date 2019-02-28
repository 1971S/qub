export class GamepadController {

  init () {
    window.addEventListener("gamepadconnected", function(e) {
      console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
      e.gamepad.index, e.gamepad.id,
      e.gamepad.buttons.length, e.gamepad.axes.length);
      console.log(navigator.getGamepads());
    });

    window.addEventListener("gamepaddisconnected", function(e) {
      console.log("Gamepad disconnected at index %d: %s. %d buttons, %d axes.",
      e.gamepad.index, e.gamepad.id,
      e.gamepad.buttons.length, e.gamepad.axes.length);
      console.log(navigator.getGamepads());
    });
  }
}
