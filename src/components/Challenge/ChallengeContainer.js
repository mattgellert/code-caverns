import React from 'react';
import Editor from './Editor/Editor.js';
import ChallengeObstructionContainer from './ChallengeObstructionContainer.js';
import './ChallengeContainer.css';

export default class ChallengeContainer extends React.Component {

  constructor(props) {
    console.log("challenge container props", props)
    super(props);
    const challenge = this.determineChallenge(props);
    this.state = {
      currentChallenge: challenge,
      currentAttempt: challenge.editor.attempt
    };
  };

  handleRun = (output) => {
    if (Array.isArray(output)) {
      this.setState({
        currentAttempt: output
      });
    };
  };

  determineChallenge = (props) => {
    return props.challenges.filter(challenge => (challenge.name === this.props.name))[0]
  };



  render() {
    return (
      <div className="challenge-container-wrapper">
        <Editor challenge={this.state.currentChallenge} onQuit={this.props.handleQuit} onPass={this.props.handlePass} handleRun={this.handleRun} />
        <ChallengeObstructionContainer description={this.state.currentChallenge.description} challenge={this.props.name} attempt={this.state.currentAttempt}/>
      </div>
    );
  };
};
