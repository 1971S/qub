// TODO
export class PlatformManager {

  constructor (app, parent) {
    this.app = app;
    this.parent = parent;
    this.collider = this.app.managers.Collider;
    this.vx = 0;
    this.vy = 0;
    this.gravity = 1.3;
    this.friction = 0.9;
    this.jumpStrength = 30;
    this.jumps = 1;
    this.isJumping = false;
  }

  jump () {

    if (!this.isJumping) {
      this.isJumping = true; //should be only if im in floor
      this.vy -= 50;
    }

  }

  update () {

    this.x_old = this.parent.x;
    this.y_old = this.parent.y;
    this.parent.x += this.vx;
    this.parent.y += this.vy;

  }

  collide () {

    const collObj = [];

    this.app.stage.actors.platforms.forEach((platform) => {
      if (this.collider.hitTestRectangle(this.app.stage.actors.player, platform).result === true) {
        collObj.push(platform);
      }
    });

    return collObj;

  }

}
