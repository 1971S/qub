import * as PIXI from 'pixi.js';
import { PlatformModel } from './models/platform.js';

export class SceneDirector {

  constructor (app) {
    this.app = app;
  }

  // Setup is called as callback when the loader finishes loading all the textures in the statedirector
  setup () {

    // Call createScene for each scene that we want in the game. 'True' binds that scene as the starting scene
    this.createScene('game', {
      initial: true,
      defaultPositions: {
        player: [640, 192]
      }
    });

    this.createScene('end', {
      defaultPositions: {
        player: [640, 192]
      }
    });

    /////
    // CREATESCENE WORKING AS INTENDED, GOTTA WORK ON CREATEOBJECT
    /////

    // Initialize the player (static sprite) with an actortag and a controllertag

    this.createObject('game', {
      src: 'nameoffolderinpublic/player.png', 
      positions: [[320, 360]], 
      anchor: 'bottom', 
      actorTag: 'player', 
      controllerTag: 'platform'
    });

    // Initialize the platforms (static sprites)
    this.createObject('game', {
      src: 'nameoffolderinpublic/platform.png', 
      positions: [
        [128, 640], [192, 640], [256, 640], [320, 640], [384, 640], [448, 640], [720, 640],
      ], 
      anchor: 'center', 
      actorTag: 'platform'
    });

    // The asset2.json in the state-director generates a batch of textures in memory, which we can access to create an animation
    this.createObject('end', {
      type: 'animation',
      src: 'Sprite-0001 ',
      extension: '.aseprite',
      positions: [640, 200], 
      anchor: 0.5, 
      animStart: 0, 
      animSpan: 207,
      actorTag: 'anim'
    });

  }

  createScene (tag, options) {

    const scene = new PIXI.Container();
    scene.tag = tag;
    scene.defaultPositions = options.defaultPositions;
    scene.actors = {};

    this.app.stage.addChild(scene);
    this.app.stage.scenes[tag] = scene;

    if (options.initial === true) {
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
        this.app.stage.scenes[targetScene].actors[actor].x = tScene.defaultPositions[actor][0];
        this.app.stage.scenes[targetScene].actors[actor].y = tScene.defaultPositions[actor][1];

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

  createObject (dest, options) {
    
    if (options.type === 'animation') {

      let framesArr = [];

      for (let i = options.animStart; i < options.animSpan; i++) {
        framesArr.push(PIXI.Texture.fromFrame(options.src + i + options.extension));
      }
  
      let anim = new PIXI.extras.AnimatedSprite(framesArr);
      anim.x = options.positions[0];
      anim.y = options.positions[1];
      anim.anchor.set(options.anchor);
      anim.animationSpeed = 0.275;
      
      this.app.stage.scenes[dest].addChild(anim);

      if (options.actorTag) this.app.stage.scenes[dest].actors[options.actorTag] = anim;
      anim.play()
  
      return anim;
      
    } else {
      
      let sprites = [];

      options.positions.forEach(position => {

        let sprite = new PIXI.Sprite(PIXI.loader.resources[options.src].texture);
        sprite.x = position[0];
        sprite.y = position[1];
  
        if (options.anchor === 'center') {
          sprite.anchor.set(0.5, 0.5);
        }
  
        if (options.anchor === 'bottom') {
          sprite.anchor.set(0.5, 1);
        }
  
        sprite.bTop = sprite.y - (sprite.height * (0 + sprite.anchor.y));
        sprite.bBottom = sprite.y + (sprite.height * (1 - sprite.anchor.y));
        sprite.bLeft = sprite.x - (sprite.width * (0 + sprite.anchor.x));
        sprite.bRight = sprite.x + (sprite.width * (1 - sprite.anchor.x));
  
        this.app.stage.scenes[dest].addChild(sprite);
        if (options.controllerTag) sprite.controller = new PlatformModel(this.app, sprite);
        if (options.scaleMode) sprite.texture.baseTexture.scaleMode = options.scaleMode
        if (options.scale) {
          sprite.scale.x = options.scale[0];
          sprite.scale.y = options.scale[1];
        }
  
        sprites.push(sprite);

      });
  
      if (sprites.length === 1) {
        if (options.actorTag) this.app.stage.scenes[dest].actors[options.actorTag] = sprites[0];
        return sprites[0];
      } else {
        if (options.actorTag) this.app.stage.scenes[dest].actors[options.actorTag+'s'] = sprites;
        return sprites;
      }

    }

  }

}
