import React, { Component } from 'react';
import Editor from './Editor';
import ObstacleContainer from './ObstacleContainer';

class App extends Component {
  render() {
    return (
      <div>
        <Editor /> 
        <ObstacleContainer />
      </div>
    );
  }
}

export default App;
