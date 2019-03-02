// Not taking into account the anchor point
export class CollisionManager {

  constructor (app) {
    this.app = app;
  }

  hitTestRectangle (checker, checked) {

    const vy = checker.y - checked.y;
    const vx = checker.x - checked.x;

    // checks for y axis
    let overlapY = false;
    let combinedHalfHeights;

    if (checker.y > checked.y) {
      let checkerhalf = checker.height - (checker.height - checker.height * checker.anchor.y);
      let checkedhalf = checked.height - (0 + checked.height * checked.anchor.y);
      combinedHalfHeights = checkerhalf + checkedhalf;
    }
    else if (checker.y < checked.y) {
      let checkerhalf = checker.height - (0 + checker.height * checker.anchor.y);
      let checkedhalf = checked.height - (checked.height - checked.height * checked.anchor.y);
      combinedHalfHeights = checkerhalf + checkedhalf;
    }
    else {
      //
    }

    if (Math.abs(vy) <= combinedHalfHeights) {
      overlapY = true;
    } else {
      return false;
    }

    // checks in x axis
    let overlapX = false;
    let combinedHalfWidths;

    if (checker.x > checked.x) {
      let checkerhalf = checker.width - (checker.width - checker.width * checker.anchor.x);
      let checkedhalf = checked.width - (0 + checked.width * checked.anchor.x);
      combinedHalfWidths = checkerhalf + checkedhalf;
    }
    else if (checker.x < checked.x) {
      let checkerhalf = checker.width - (0 + checker.width * checker.anchor.x);
      let checkedhalf = checked.width - (checked.width - checked.width * checked.anchor.x);
      combinedHalfWidths = checkerhalf + checkedhalf;
    }
    else {
      //
    }

    if (Math.abs(vx) <= combinedHalfWidths) {
      overlapX = true;
    } else {
      overlapX = false;
    }


    if (overlapX && overlapY) {
      let hit = '';
      let found = false;
      const resObj = {};

      resObj.result = true;


      if (vy < 0 && !found) {

        if (checker.y >= checked.y - checked.height / 2) {
          hit += 'bot';
          checker.controller.vy = 0;
          checker.y = checked.y - combinedHalfHeights;
          checker.controller.isOnFloor = true;
          checker.controller.isJumping = false;
          found = true;
        }

      }

      if (vy > 0 && !found) {

        if (checker.y >= checked.y + checked.height / 2) {
          hit += 'top';
          checker.controller.vy = 0;
          checker.y = checked.y + combinedHalfHeights;
          found = true;
        }

      }

      if (vx > 0 && !found) {

        if (checker.x < checked.y + checked.width / 2) {
          hit += 'left';
          checker.x = checked.x + combinedHalfWidths;
          checker.controller.vx = 0;
          found = true;
          checker.controller.bumpLeft = true;
        }

      }

      if (vx < 0 && !found) {

        if (checker.x > checked.y - checked.width / 2) {
          hit += 'right';
          checker.x = checked.x - combinedHalfWidths;
          checker.controller.vx = 0;
          checker.controller.bumpRight = true;
          found = true;
        }

      }

      resObj.type = hit;

      // console.log(resObj);

      return resObj;
    }
    else {
      return false;
    }

  }

}
