export function play (delta, app) {

  const { Gamepad, Resizer, Collider } = app.managers;
  const { Scener } = app.directors;
  const cScene = app.activeScene;
  const Actors = app.stage.scenes[cScene] && app.stage.scenes[cScene].actors;

  if (cScene === 'premenu') {

    if (Gamepad.onPressed('A')) {
      // Resizer.toggleFullscreen();
      Scener.changeScene('menu');
    }

  }

  if (cScene === 'menu') {

    if (Gamepad.onPressed('A')) {
      Scener.changeScene('action1');
    }

  }

  if (cScene === 'action1' || cScene === 'action2') {

    const player = Actors.player.controller;
    const playerSprite = Actors.player;

    player.update();

    if (playerSprite.bTop < 0 || playerSprite.bBottom > app._options.height || playerSprite.bRight > app._options_width || playerSprite.bLeft < 0) {
      Scener.changeScene(cScene);
    }

    if (Gamepad.onPressed('Start')) {
      app.activeState = 'pause';
    }

    if (Gamepad.onPressed('A')) {
      player.jump();
    }

    if (Gamepad.axis('LeftX').aValue > 0.3) {
      player.move(player.speedX * Gamepad.axis('LeftX').oValue);
    }

    if (cScene === 'action1' && playerSprite.x > 850) Scener.changeScene('action2');

  }

  if (app.stats) app.stats.end();

}
