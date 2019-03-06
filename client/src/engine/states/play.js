export function play (delta, app) {

  const { Gamepad } = app.managers;
  const { Scener } = app.directors;
  const cScene = app.activeScene;
  const Actors = app.stage.scenes[cScene] && app.stage.scenes[cScene].actors;

  if (cScene === 'menu') {

    if (Gamepad.onPressed('A')) {
      Scener.changeScene('action1');
    }

    if (Actors.react.y > 600) {
      Actors.react.y -= 5;
      Actors.logo3.y -= 5;
    }

  }

  if (cScene === 'action1' || cScene === 'action2') {

    const player = Actors.player.controller;
    const playerSprite = Actors.player;

    player.update();

    if (playerSprite.bTop < 0 || playerSprite.bBottom > app._options.height || playerSprite.bRight > app._options_width || playerSprite.bLeft < 0) {
      Scener.changeScene(cScene, ['player']);
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

    const winObj = player.collide('wins');

    if (winObj.length > 0) {
      if (cScene === 'action1') Scener.changeScene('action2', ['player']);
      if (cScene === 'action2') Scener.changeScene('presentationend');
    }

  }

  if (cScene === 'presentationend') {

    if (Gamepad.onPressed('A')) {
      if (Actors.fail.y === 360) Actors.fail.y -= 1;
      if (Actors.insights.y <= 370) Scener.changeScene('thanks');
    }

    if (Actors.fail.y !== 360) {
      if (Actors.insights.y > 495) Actors.insights.y -= 15;
      else {
        if (Actors.fail.y > -100) Actors.fail.y -= 15
        if (Actors.insights.y > 370) Actors.insights.y -= 15
      }
    }

  }

}
