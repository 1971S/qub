export class Resizer {

  constructor (app) {
    this.app = app;
  }

  init () {
    window.addEventListener('resize', () => this.resize());
  }

  resize () {
    this.app.renderer.resize(window.innerWidth, window.innerHeight);
  }

  toggleFullscreen () {
    let e = document.getElementById('body');
  
    e.requestFullscreen = e.requestFullscreen || e.mozRequestFullscreen || e.msRequestFullscreen || e.webkitRequestFullscreen;
  
    if (!document.fullscreenElement) {
      e.requestFullscreen().then({}).catch(err => {
        console.log(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);  //eslint-disable-line
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }
}
