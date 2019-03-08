import * as PIXI from 'pixi.js';
import { PlatformModel } from './models/platform.js';

export class SceneDirector {

  constructor (app) {
    this.app = app;
  }

  // Setup is called as callback when the loader finishes loading all the textures in the statedirector
  setup () {

    // Call createScene for each scene that we want in the game. 'Initial: True' binds that scene as the starting scene
    this.createScene('presentation0', {
      initial: true,
    });

    this.createScene('presentation1', {
      defaultPositions: {
        logo: [640, 192], 
        anim: [640, 200]
      }
    });

    this.createScene('presentation2', {
      defaultPositions: {
        logo: [640, 192], 
        anim: [640, 200]
      }
    });

    this.createScene('presentation3', {
      defaultPositions: {
        logo: [640, 192], 
        anim: [640, 200]
      }
    });

    this.createScene('menu', {
      defaultPositions: {
        logo: [640, 192], 
        anim: [640, 200]
      }
    });

    this.createScene('action1', {
      defaultPositions: {
        player: [320, 360], 
      }
    });

    this.createScene('action2', {
      defaultPositions: {
        player: [900, 500], 
      }
    });

    this.createScene('presentationend', {
      defaultPositions: {
        logo: [640, 192], 
        anim: [640, 200]
      }
    });

    this.createScene('thanks', {
      defaultPositions: {
        logo: [640, 192], 
        anim: [640, 200]
      }
    });

    /////
    // REFACTOR CREATEOBJECT
    /////

    // Use createObject to create new sprites for each scene with their desired options
    // presentation0
    this.createObject('presentation0', {
      src: 'assets/welcome.png', 
      positions: [[640, 360]], 
      anchor: 'center',
      scaleMode: PIXI.SCALE_MODES.NEAREST
    });

    // presentation1
    this.createObject('presentation1', {
      src: 'assets/logo2.png', 
      positions: [[640, 360]], 
      anchor: 'center', 
      actorTag: 'logo'
    });

    // presentation2 INTEGRAR ANIM
    this.createObject('presentation2', {
      type: 'animation',
      src: 'Sprite-0001 ',
      extension: '.aseprite',
      positions: [640, 200], 
      anchor: 0.5, 
      animStart: 0, 
      animSpan: 207,
      actorTag: 'anim'
    });

    this.createObject('presentation2', {
      src: 'assets/concept.png', 
      positions: [[640, 420]], 
      anchor: 'center',
      scaleMode: PIXI.SCALE_MODES.NEAREST
    });

    this.createObject('presentation2', {
      src: 'assets/controller.png', 
      positions: [[640, 900]], 
      anchor: 'center', 
      actorTag: 'cont'
    });

    this.createObject('presentation2', {
      src: 'assets/locked.png', 
      positions: [[960, 900]], 
      anchor: 'center', 
      actorTag: 'lock'
    });

    this.createObject('presentation2', {
      src: 'assets/settings.png', 
      positions: [[320, 900]], 
      anchor: 'center', 
      actorTag: 'sett'
    });

    // presentation3
    this.createObject('presentation3', {
      src: 'assets/engine.png', 
      positions: [[640, 420]], 
      anchor: 'center',
      scaleMode: PIXI.SCALE_MODES.NEAREST
    });

    this.createObject('presentation3', {
      src: 'assets/pixilogo.png', 
      positions: [[500, 900]], 
      anchor: 'center',
      actorTag: 'pxl',
      scale: [0.5, 0.5],
      scaleMode: PIXI.SCALE_MODES.NEAREST
    });

    this.createObject('presentation3', {
      src: 'assets/jslogo.png', 
      positions: [[900, 900]], 
      anchor: 'center',
      actorTag: 'jsl',
      scale: [0.5, 0.5],
      scaleMode: PIXI.SCALE_MODES.NEAREST
    });

    // menu
    this.createObject('menu', {
      src: 'assets/lets.png', 
      positions: [[640, 420]],
      anchor: 'center'
    });

    this.createObject('menu', {
      src: 'assets/react.png', 
      positions: [[464, 900]], 
      anchor: 'center', 
      actorTag: 'react'
    });

    this.createObject('menu', {
      src: 'assets/logo3.png', 
      positions: [[816, 900]], 
      anchor: 'center', 
      actorTag: 'logo3'
    });

    // action1: Initialize the player with both an actortag and a controllertag, and then the normal platforms and the win platforms
    this.createObject('action1', {
      src: 'assets/qub.png', 
      positions: [[320, 360]], 
      anchor: 'bottom', 
      actorTag: 'player', 
      controllerTag: 'platform'
    });

    this.createObject('action1', {
      src: 'assets/platform.png', 
      positions: [
        [128, 640], [192, 640], [256, 640], [320, 640], [384, 640], [448, 640], [720, 640],
      ], 
      anchor: 'center', 
      actorTag: 'platform'
    });

    this.createObject('action1', {
      src: 'assets/win.png', 
      positions: [
        [1000, 460], [1064, 460]
      ], 
      anchor: 'center', 
      actorTag: 'win'
    });

    // action2
    this.createObject('action2', {
      src: 'assets/win.png', 
      positions: [
        [100, 400], [164, 400]
      ], 
      anchor: 'center', 
      actorTag: 'win'
    });

    this.createObject('action2', {
      src: 'assets/platform.png', 
      positions: [
        [880, 680], [944, 680], [540, 610], [300, 540],
      ], 
      anchor: 'center', 
      actorTag: 'platform'
    });

    // presentationend
    this.createObject('presentationend', {
      src: 'assets/failure.png', 
      positions: [[640, 360]], 
      anchor: 'center', 
      actorTag: 'fail',
      scaleMode: PIXI.SCALE_MODES.NEAREST
    });

    this.createObject('presentationend', {
      src: 'assets/insights.png', 
      positions: [[640, 900]], 
      anchor: 'center', 
      actorTag: 'insights',
      scaleMode: PIXI.SCALE_MODES.NEAREST
    });

    // thanks
    this.createObject('thanks', {
      src: 'assets/thanks.png', 
      positions: [[640, 360]], 
      anchor: 'center'
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
