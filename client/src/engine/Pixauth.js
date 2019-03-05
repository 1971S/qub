import React, { Component } from 'react';
import * as PIXI from 'pixi.js';
import './Pixauth.css';

class Pixauth extends Component {

  state = {
    loggedIn: false,
    requireLogin: false,
  }

  render() {
    console.log(this.state.loggedIn);
    console.log(this.props);

    if (this.state.loggedIn && this.state.requireLogin) {
      return (
        <div>
          <div className="authbodyon">HELLO</div>
        </div>
      );
    } else {
      return (
        <div className="authbodyoff"></div>
      );
    }
  }
}

export default Pixauth;
