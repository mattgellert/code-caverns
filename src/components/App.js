import React, { Component } from 'react';
import CavernContainer from './Cavern/CavernContainer.js'
import ChallengeContainer from './Challenge/ChallengeContainer.js';
import ChallengeData from './Challenge/ChallengeData.js';

export default class App extends Component {

  state = {
    challenges: [...ChallengeData]
  };

  handleUpdateChallenges = (updatedChallenges) => {
    this.setState({
      challenges: [...updatedChallenges]
    });
  };

  handlePassChallenge = (challengeName) => {
    const updatedChallenges = this.state.challenges.map(challenge => {
      if (challenge.name === challengeName) {
        challenge.pass = true;
      };
      return challenge;
    });
    this.setState({
      challenges: [...updatedChallenges]
    });
  };

  handleGetCode = (challengeName, code, pass) => {
    const updatedChallenges = this.state.challenges.map(challenge => {
      if (challenge.name === challengeName) {
        challenge.editor.code = code;
        challenge.pass = pass;
      };
      return challenge;
    });
    this.setState({
      challenges: [...updatedChallenges]
    });
  };

  render() {
    return (
      <div>
        <CavernContainer getCode={this.handleGetCode} challenges={this.state.challenges} onUpdateChallenges={this.handleUpdateChallenges} onPassChallenge={this.handlePassChallenge}/>
      </div>
    );
  };
};
