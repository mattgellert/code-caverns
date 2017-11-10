import React from 'react';
import Editor from './Editor';
import ObstacleContainer from './ObstacleContainer';
import '../stylesheets/challenge.css';

export default class ChallengeContainer extends React.Component {

  //later these will be inherited from Game parent
  state = {
    name: "sortRocks(array)",
    input: [9,6,3,4,5,1,0,2,8,7,10],
    expectedOutput: [0,1,2,3,4,5,6,7,8,9,10],
    attempt: [9,6,3,4,5,1,0,2,8,7,10], //default to input value
    pass: false
  };

  handleRun = (output) => {
    if (Array.isArray(output)) {
      this.setState({
        attempt: output
      });
    };
  };


  render() {
    return (
      <div className="challenge-container-wrapper">
        <Editor challenge={this.state.name} input={this.state.input} expectedOutput={this.state.expectedOutput} handleRun={this.handleRun}/>
        <ObstacleContainer challenge={this.state.name} attempt={this.state.attempt} onQuit={this.props.handleQuit} onPass={this.props.handlePass}/>
      </div>
    )
  };
};
