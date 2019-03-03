// Not taking into account the anchor point
export class CollisionManager {

  constructor (app) {
    this.app = app;
  }

  hitTestRectangle (a,b) {

    let hit = '';

    if (hit === '' && a.y <= b.y && a.bBottom >= b.bTop ) {
      if ( (a.bLeft < b.bRight && a.bLeft > b.bLeft ) || (a.bRight > b.bLeft && a.bRight < b.bRight ) ) {
        hit = 'bot';
        a.y = b.bTop; // esto solo funciona porque tiene el origen abajo
        // a.controller.vy = 0;
        a.controller.isOnFloor = true;
        a.controller.isJumping = false;
      }
    }

    // if (hit === '' && a.x <= b.x && a.bRight >= b.bLeft ) {
    //   if ( (a.bTop <= b.bBottom && a.bTop >= b.bTop ) || (a.bBottom >= b.bTop && a.bBottom <= b.bBottom ) ) {
    //     hit = 'right';
    //     a.x = b.bLeft - a.width/2;
    //     a.controller.vx = 0;
    //     a.controller.bumpRight = true;
    //     console.log(hit);
    //     this.app.state = 'pause';
    //   }
    // }

    // if (hit === '' && a.x >= b.x && a.bLeft <= b.bRight ) {
    //   if ( (a.bTop <= b.bBottom && a.bTop >= b.bTop ) || (a.bBottom >= b.bTop && a.bBottom <= b.bBottom ) ) {
    //     hit = 'left';
    //     a.x = b.bRight + a.width/2;
    //     a.controller.vx = 0;
    //     a.controller.bumpLeft = true;
    //     console.log(hit);
    //     this.app.state = 'pause';
    //   }
    // }

    // if (hit === '' && a.y >= b.y && a.bTop <= b.bBottom ) {
    //   if ( (a.bLeft < b.bRight && a.bLeft > b.bLeft ) || (a.bRight > b.bLeft && a.bRight < b.bRight ) ) {
    //     hit = 'top';
    //     a.y = b.bBottom + a.height; // esto solo funciona porque tiene el origen abajo
    //   }
    // }

    if (hit === '') return { result: false };
    else return { result: true, hit: hit };

  }

}
