import React, { Component } from 'react';
import './App.css';

import Pixapp from './engine/Pixapp'

class App extends Component {
  render() {
    return (
      <div className="App-header">
        <Pixapp />
      </div>
    );
  }
}

export default App;
