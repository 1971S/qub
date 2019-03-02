// Think about how to instantiate the player? And move him
export class SceneDirector {

  constructor (app) {
    this.app = app;
  }

  // Setup is called as callback when the loader finishes loading all the textures
  setup () {

    // Call createScene for each scene that we want in the game. 'True' binds that scene as initial
    this.createScene('premenu', true);
    this.createScene('menu');
    this.createScene('action');

    // Use createSprite to generate a new sprite with the correct position and anchor
    this.createActor('menu', 'assets/logo.png', [[640, 360]], 'center');

    // Initialize the player and assign different properties that will be used later. Add it to actors with a tag
    const player = this.createActor('action', 'assets/qub.png', [[30, 600]], 'bottom', 'player');
    player.vx = 0;
    player.vy = 0;
    player.gravity = 1.3;
    player.friction = 0.9;
    player.jumpStrength = 700;
    player.jumps = 1;
    player.isJumping = false;

    this.createActor('action', 'assets/platform.png', [
      [20, 700], [20, 450], [1100, 450], [1100, 550], [1100, 700]
    ], 'center', 'platform');

    console.log(this.app); //eslint-disable-line

    // app.state determines the function to be executed by the director in gameLoop, enabling
    // having different states in the director: play, pause, end, etc
    this.app.state = 'play';

    // Add a ticker to the app that will create a game loop, by calling gameLoop with delta as interval
    this.app.ticker.add(delta => this.app.gameLoop(delta));

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

    console.log(this.app); //eslint-disable-line

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
