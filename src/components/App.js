import React, { Component } from 'react';
import CavernContainer from './World/CavernContainer'
import ChallengeContainer from './ChallengeContainer';
import obstructionData from './World/obstructionData';
import EditorData from './EditorData';

class App extends Component {

  state = {
    editors: [...EditorData],
    obstructions: [...obstructionData],
  }

  handleUpdateObstructions = (updatedObstructions) => {
    this.setState({
      obstructions: [...updatedObstructions]
    })
  }

  handlePassObstruction = (obstructionName) => {
    const updatedObstructions = this.state.obstructions.map(obstruction => {
      if (obstruction.name === obstructionName) {
        obstruction.passed = true;
      }
      return obstruction
    });
    this.handleUpdateObstructions(updatedObstructions);
  }


  render() {
    return (
      <div>
        <CavernContainer editors={this.state.editors} obstructions={this.state.obstructions} onUpdateObstructions={this.handleUpdateObstructions} onPassObstruction={this.handlePassObstruction}/>
      </div>
    );
  }
}

export default App;
