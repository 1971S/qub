import { end } from './end.js';
import { play } from './play.js';
import { pause } from './pause.js';

export class StateDirector {
  constructor (app, managers) {
    this.app = app;
    this.managers = managers;
    this.play = (delta) => play(delta, this.app, this.managers);
    this.end = (delta) => end(delta, this.app, this.managers);
    this.pause = (delta) => pause(delta, this.app, this.managers);
  }

}
