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
        obstruction.pass = true;
      }
      return obstruction;
    });
    const updatedEditors = this.state.editors.map(editor => {
      if (editor.name === obstructionName) {
        editor.pass = true;
      };
      return editor;
    });
    this.setState({
      editors: [...updatedEditors],
      obstructions: [...updatedObstructions]
    });
  }

  handleGetCode = (editorName, code, pass) => {
    const updatedEditors = this.state.editors.map(editor => {
      if (editor.name === editorName) {
        editor.code = code;
        editor.pass = pass;
      };
      return editor;
    });
    this.setState({
      editors: [...updatedEditors]
    })
    
  }


  render() {
    return (
      <div>
        <CavernContainer getCode={this.handleGetCode} editors={this.state.editors} obstructions={this.state.obstructions} onUpdateObstructions={this.handleUpdateObstructions} onPassObstruction={this.handlePassObstruction}/>
      </div>
    );
  }
}

export default App;
