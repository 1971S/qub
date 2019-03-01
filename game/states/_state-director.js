import { end } from './end.js';
import { play } from './play.js';
import { pause } from './pause.js';

export class StateDirector {
  constructor (app, input) {
    this.app = app;
    this.input = input;
    this.play = (delta) => play(delta, this.app, this.input);
    this.end = (delta) => end(delta, this.app, this.input);
    this.pause = (delta) => pause(delta, this.app, this.input);
  }

}
