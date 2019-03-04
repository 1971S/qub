import { PlatformManager } from '../managers/platform.js';

// Think about how to instantiate the player? And move him
export class SceneDirector {

  constructor (app) {
    this.app = app;
  }

  // Setup is called as callback when the loader finishes loading all the textures
  setup () {

    // Call createScene for each scene that we want in the game. 'True' binds that scene as initial
    this.createScene('premenu', [-1, -1], true);
    this.createScene('menu', [-1, -1]);
    this.createScene('action1', [320, 360]);
    this.createScene('action2', [558, 200]);

    this.createObject('premenu', 'assets/logo2.png', [[640, 192]], 'center');

    const anim = this.createAnimation('premenu', 'Sprite-0001 ', [this.app.screen.width/2, 200], 0.5, 0, 207);
    anim.play();

    // Use createObject to generate a new sprite with the correct position and anchor, and the destination scene
    this.createObject('menu', 'assets/logo.png', [[640, 360]], 'center');

    // Initialize the player with an actortag and a controllertag
    this.createObject('action1', 'assets/qub.png', [[320, 360]], 'bottom', 'player', 'platform');

    // Initialize the platforms
    this.createObject('action1', 'assets/platform.png', [
      [128, 640], [192, 640], [256, 640], [320, 640], [384, 640], [448, 640], [720, 640],
    ], 'center', 'platform');

    this.createObject('action2', 'assets/platform.png', [
      [320, 500], [558, 640],
    ], 'center', 'platform');

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

  changeScene (targetScene) {

    const cScene = this.app.stage.scenes[this.app.activeScene];
    const cActors = cScene.actors;
    const tScene = this.app.stage.scenes[targetScene];
    const tActors = tScene.actors;

    if (cActors.player) {
      if (cScene !== tScene) {
        this.app.stage.scenes[targetScene].actors = { player: cActors.player, ...tActors };
        tScene.addChildAt(this.app.stage.scenes[targetScene].actors.player, 0);
        delete cActors.player;
      }
      this.app.stage.scenes[targetScene].actors.player.x = tScene.initial[0];
      this.app.stage.scenes[targetScene].actors.player.y = tScene.initial[1];
      this.app.stage.scenes[targetScene].actors.player.controller.vx = 0;
      this.app.stage.scenes[targetScene].actors.player.controller.vy = 0;
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
      if (controllerTag) sprite.controller = new PlatformManager(this.app, sprite);

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
