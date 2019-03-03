// TODO
export class PlatformManager {

  constructor (app, parent) {
    this.app = app;
    this.parent = parent;
    this.collider = this.app.managers.Collider;
    this.vx = 0;
    this.vy = 0;
    this.gravity = 1.5;
    this.friction = 0.9;
    this.speedX = 1;
    this.jumpStrength = 50;
    this.jumps = 1;
    this.isJumping = true;
    this.isOnFloor = false;
    this.bumpBottom = false;
    this.bumpTop = false;
    this.bumpRight = false;
    this.bumpLeft = false;
  }

  update () {

    this.parent.bTop = this.parent.y - (this.parent.height * (0 + this.parent.anchor.y));
    this.parent.bBottom = this.parent.y + (this.parent.height * (1 - this.parent.anchor.y));
    this.parent.bLeft = this.parent.x - (this.parent.width * (0 + this.parent.anchor.x));
    this.parent.bRight = this.parent.x + (this.parent.width * (1 - this.parent.anchor.x));

    const collObj = this.collide();

    this.x_old = this.parent.x;
    this.y_old = this.parent.y;
    this.parent.x += this.vx;
    this.parent.y += this.vy;

    this.vx *= this.friction;
    this.vy *= this.friction;


    if (collObj.length === 0) {
      if (this.isOnFloor) this.isOnFloor = false;
    }

    if (!this.isOnFloor) this.vy += this.gravity;

    this.bumpLeft = false;
    this.bumpRight = false;

  }

  move (movement) {
    if ((movement > 0 && !this.bumpRight) || (movement < 0 && !this.bumpLeft)) this.vx += movement;
  }

  jump () {

    if (!this.isJumping && this.isOnFloor) {
      this.isJumping = true; //should be only if im in floor
      this.isOnFloor = false;
      this.vy -= this.jumpStrength;
    }

  }

  collide () {

    const collObj = [];

    this.app.stage.actors.platforms.forEach((platform) => {
      const res = this.collider.hitTestRectangle(this.app.stage.actors.player, platform);
      if (res.result === true) {
        collObj.push({...res, target: platform});
      }
    });

    // console.log(collObj);

    return collObj;

  }

}
