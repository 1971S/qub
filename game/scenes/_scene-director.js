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

  createActor (dest, src, positions, anchor, actorTag) {

    if (positions.length === 1) {
      let sprite = new PIXI.Sprite(PIXI.loader.resources[src].texture);
      sprite.x = positions[0][0];
      sprite.y = positions[0][1];

      if (anchor === 'center') {
        sprite.anchor.set(0.5, 0.5);
      }

      if (anchor === 'bottom') {
        sprite.anchor.set(0.5, 1);
      }

      this.app.stage.scenes[dest].addChild(sprite);

      if (actorTag) this.app.stage.actors[actorTag] = sprite;

      return sprite;
    }
    else {
      let sprites = [];
      positions.forEach(position => {
        let sprite = new PIXI.Sprite(PIXI.loader.resources[src].texture);
        sprite.x = position[0];
        sprite.y = position[1];

        if (anchor === 'center') {
          sprite.anchor.set(0.5, 0.5);
        }

        if (anchor === 'bottom') {
          sprite.anchor.set(0.5, 1);
        }

        this.app.stage.scenes[dest].addChild(sprite);

        sprites.push(sprite);

      });

      if (actorTag) this.app.stage.actors[actorTag+'s'] = sprites;

      return sprites;
    }
  }

}
