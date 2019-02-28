// me preocupa cómo conseguir instanciar al player

export class SceneManager {

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
  
  changeScene (currentScene, targetScene) {
    this.app.stage.scenes[targetScene].visible = true;
    this.app.stage.scenes[currentScene].visible = false;
    this.app.currentScene = targetScene;
  }

}
