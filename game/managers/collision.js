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
      let hit;
      const resObj = {};
      resObj.result = true;

      if (vx > vy) {
        hit = false;
      }

      resObj.type = hit;

      return resObj;
    } else {
      return false;
    }

  }

}
