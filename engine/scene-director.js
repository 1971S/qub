import * as PIXI from 'pixi.js';
import { PlatformModel } from './models/platform.js';

// Think about how to instantiate the player? And move him
export class SceneDirector {

  constructor (app) {
    this.app = app;
  }

  // Setup is called as callback when the loader finishes loading all the textures
  setup () {

    // Call createScene for each scene that we want in the game. 'True' binds that scene as initial
    this.createScene('game', { player: [640, 192] }, true);
    this.createScene('end', { player: [640, 192] });

    // Initialize the player with an actortag and a controllertag. its static
    this.createObject('game', 'nameoffolderinpublic/asset.png', [[320, 360]], 'bottom', 'player', 'platform');

    // Initialize the platforms
    this.createObject('game', 'assets/platform.png', [
      [128, 640], [192, 640], [256, 640], [320, 640], [384, 640], [448, 640], [720, 640],
    ], 'center', 'platform');

    // The asset2.json in the state-director generates a batch of textures in memory, which we can access to create an animation
    const anim = this.createAnimation('presentation1', 'Sprite-0001 ', [640, 200], 0.5, 0, 207);
    this.app.stage.scenes['presentation1'].actors['anim'] = anim;
    anim.play();

  }

  createScene (tag, initial, visibility) {

    const scene = new PIXI.Container();
    scene.tag = tag;
    scene.initial = initial;
    scene.actors = {};

    this.app.stage.addChild(scene);
    this.app.stage.scenes[tag] = scene;

    if (visibility === true) {
      this.app.stage.scenes[tag].visible = true;
      this.app.activeScene = tag;
    } else this.app.stage.scenes[tag].visible = false;

  }

  changeScene (targetScene, actorsToMove) {

    const cScene = this.app.stage.scenes[this.app.activeScene];

    const tScene = this.app.stage.scenes[targetScene];

    if (actorsToMove && actorsToMove.length > 0) {
      actorsToMove.forEach(actor => {
        const tActors = tScene.actors;
        const cActors = cScene.actors;
        let act = cActors[actor];

        if (cScene !== tScene) {
          this.app.stage.scenes[targetScene].actors = { [actor]: act, ...tActors };
          tScene.addChildAt(this.app.stage.scenes[targetScene]['actors'][actor], 0);
          delete cActors[actor];
        }
        this.app.stage.scenes[targetScene].actors[actor].x = tScene.initial[actor][0];
        this.app.stage.scenes[targetScene].actors[actor].y = tScene.initial[actor][1];

        if (actor.controller) {
          this.app.stage.scenes[targetScene].actors[actor].controller.vx = 0;
          this.app.stage.scenes[targetScene].actors[actor].controller.vy = 0;
        }
      });
    }

    tScene.visible = true;
    if (cScene !== tScene) cScene.visible = false;
    this.app.activeScene = targetScene;

    console.log(this.app, this.app.activeScene); //eslint-disable-line

  }

  createObject (dest, src, positions, anchor, actorTag, controllerTag) {

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

      sprite.bTop = sprite.y - (sprite.height * (0 + sprite.anchor.y));
      sprite.bBottom = sprite.y + (sprite.height * (1 - sprite.anchor.y));
      sprite.bLeft = sprite.x - (sprite.width * (0 + sprite.anchor.x));
      sprite.bRight = sprite.x + (sprite.width * (1 - sprite.anchor.x));

      this.app.stage.scenes[dest].addChild(sprite);
      if (controllerTag) sprite.controller = new PlatformModel(this.app, sprite);

      sprites.push(sprite);
    });

    if (sprites.length === 1) {
      if (actorTag) this.app.stage.scenes[dest].actors[actorTag] = sprites[0];
      return sprites[0];
    } else {
      if (actorTag) this.app.stage.scenes[dest].actors[actorTag+'s'] = sprites;
      return sprites;
    }

  }

  createAnimation (dest, src, position, anchor, start, frames) {
    var framesArr = [];

    for (var i = start; i < frames; i++) {
      // magically works since the spritesheet was loaded with the pixi loader
      framesArr.push(PIXI.Texture.fromFrame(src + i + '.aseprite'));
    }

    var anim = new PIXI.extras.AnimatedSprite(framesArr);
    anim.x = position[0];
    anim.y = position[1];
    anim.anchor.set(anchor);
    anim.animationSpeed = 0.275;
    this.app.stage.scenes[dest].addChild(anim);

    return anim;
  }

}
