export function play (delta, app, managers) {

  const { Gamepad, Resizer, Collider, Scener } = managers;
  const cScene = app.currentScene;
  const Actors = app.stage.actors;

  if (cScene === 'premenu') {
    if (Gamepad.onPressed('A')) {
      Resizer.toggleFullscreen();
      Scener.changeScene('menu');
    }
  }

  if (cScene === 'menu') {
    if (Gamepad.onPressed('A')) {
      Scener.changeScene('action');
    }
  }

  if (cScene === 'action') {
    if (Gamepad.onPressed('Start')) {
      app.state = 'pause';
    }

    if (Gamepad.onPressed('A')) {
      jump();
    }

    if (Gamepad.axis('LeftX').aValue > 0.3) {
      Actors.player.vx += 0.8 * Gamepad.axis('LeftX').oValue;
    }

    update();

    Actors.player.vx *= Actors.player.friction;
    Actors.player.vy *= Actors.player.friction;

    const collObj = collide();

    if (collObj.length > 0) {
      Actors.player.isJumping = false;
      Actors.player.vy = 0;
    } else {
      Actors.player.vy += Actors.player.gravity;
    }

  }

  function jump () {
    if (!Actors.player.isJumping) {
      Actors.player.isJumping = true; //should be only if im in floor
      Actors.player.vy -= 50;
    }
  }

  function update () {
    Actors.player.x_old = Actors.player.x;
    Actors.player.y_old = Actors.player.y;
    Actors.player.x    += Actors.player.vx;
    Actors.player.y    += Actors.player.vy;
  }

  function collide () {

    const collObj = [];
    Actors.platforms.forEach((platform) => {
      if (Collider.hitTestRectangle(Actors.player, platform).result === true) {
        collObj.push(platform);
      }
    });

    return collObj;
  }

  if (app.stats) {
    app.stats.end();
  }

}

