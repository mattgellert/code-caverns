import React, { Component } from 'react';
import CavernContainer from './Cavern/CavernContainer.js'
import ChallengeContainer from './Challenge/ChallengeContainer.js';
import ChallengeData from './Challenge/ChallengeData.js';
import StartMenu from './StartMenu.js'

export default class Game extends Component {

  state = {
    challenges: [...ChallengeData],
    started: false
  };

  demoGame = () => {
    this.setState({
      started: true
    });
  };

  newGame = () => {

  };
  //
  // oldGame = () => {
  //
  // };

  postChallenges = () => {
    console.log("post challenge data")
    // let data = JSON.stringify(this.state.challenges)
    // fetch('insert api url here', {
    //   method: 'post',
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Accept": "application/json"
    //   },
    //   body: data
    // });
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
        {this.state.started ? <CavernContainer getCode={this.handleGetCode} challenges={this.state.challenges} onUpdateChallenges={this.handleUpdateChallenges} onPassChallenge={this.handlePassChallenge}/> : <StartMenu demoGame={this.demoGame}/>}
      </div>
    );
  };
};
