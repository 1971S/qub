// Think about how to instantiate the player? And move him
export class SceneDirector {

  constructor (app) {
    this.app = app;
  }

  createScene (tag, visibility) {
    const scene = new PIXI.Container();

    scene.tag = tag;
    this.app.stage.addChild(scene);
    this.app.stage.scenes[tag] = scene;

    if (visibility === true) {
      this.app.stage.scenes[tag].visible = true;
      this.app.currentScene = tag;
    } else {
      this.app.stage.scenes[tag].visible = false;
    }
  }

  changeScene (targetScene) {
    this.app.stage.scenes[targetScene].visible = true;
    this.app.stage.scenes[this.app.currentScene].visible = false;
    this.app.currentScene = targetScene;
  }

  createSprite (src, x, y, anchor, actorTag) {

    let sprite = new PIXI.Sprite(PIXI.loader.resources[src].texture);
    sprite.x = x;
    sprite.y = y;
    if (anchor === 'center') {
      sprite.anchor.set(0.5, 0.5);
      sprite.pivot.set(sprite.width/2, sprite.height/2);
    }

    if (anchor === 'bottom') {
      sprite.anchor.set(0.5, 1);
      sprite.pivot.set(sprite.width/2, sprite.height);
    }

    if (actorTag) this.app.stage.actors[actorTag] = sprite;

    return sprite;
  }

}
