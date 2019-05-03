export class AuthenticationManager {

  constructor (app) {
    this.app = app;
  }

  checkState () {
    console.log(this.app.activeScene);
  }

}
