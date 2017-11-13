import React, { Component } from 'react';
import CavernContainer from './Cavern/CavernContainer.js'
import ChallengeContainer from './Challenge/ChallengeContainer.js';
import ChallengeData from './Challenge/ChallengeData.js';
import StartMenu from './StartMenu.js'

export default class Game extends Component {

  state = {
    challenges: [...ChallengeData],
    started: false,
    challenge_id: null
  };

  newGame = () => {
    this.setState({
      started: true
    });
  };

  resumeGame = (event) => {
    const challenge_id = event.target.value;
    let challenges;

    fetch(`http://localhost:3000/api/v1/users/resume_game?challenge_id=${challenge_id}`, {
      method: 'get',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
      .then(resp => resp.json())
      .then(challengesData => {
        this.setState({
          challenge_id: challenge_id,
          challenges: [JSON.parse(challengesData.data.attributes.data)],
          started: true
        }, () => {debugger});
      })
  };

  endGame = () => {
    //display save form (Enter username)
      //onClick 'Save' => post request (challenges, username, challenge_id if applicable)
    //else send to Home
  };

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
        {this.state.started ? <CavernContainer getCode={this.handleGetCode} challenges={this.state.challenges} onUpdateChallenges={this.handleUpdateChallenges} onPassChallenge={this.handlePassChallenge}/> : <StartMenu newGame={this.newGame} resumeGame={this.resumeGame} />}
      </div>
    );
  };
};
