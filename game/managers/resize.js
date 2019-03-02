// Need scaling
export class ResizeManager {

  constructor (app) {
    this.app = app;
    this.init();
  }

  init () {

    window.addEventListener('resize', () => this.resize());
    this.resize();

  }

  resize () {

    var view = this.app.view;
    view.style.position = 'absolute';
    view.style.left = '50%';
    view.style.top = '50%';
    view.style.transform = 'translate3d( -50%, -50%, 0 )';

  }

  toggleFullscreen () {

    let e = document.getElementById('body');

    e.requestFullscreen = e.requestFullscreen || e.mozRequestFullscreen || e.msRequestFullscreen || e.webkitRequestFullscreen;

    if (!document.fullscreenElement) {
      e.requestFullscreen().then({}).catch(err => {
        console.log(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);  //eslint-disable-line
      });
    }
    else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }

  }

}
