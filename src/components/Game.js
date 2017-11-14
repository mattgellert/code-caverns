import React, { Component } from 'react';
import CavernContainer from './Cavern/CavernContainer.js'
import ChallengeContainer from './Challenge/ChallengeContainer.js';
import ChallengeData from './Challenge/ChallengeData.js';
import StartMenu from './StartMenu.js'

export default class Game extends Component {

  state = {
    challenges: [...ChallengeData],
    started: false,
    challenge_id: false,
    xPos: 400,
    yPos: 300,
    oldGame: false,
    mapDeltaX: 0,
    mapDeltaY: 0
  };

  challengeDataToArray = (challengesObject) => {
    const arr = [];
    for (const key in challengesObject) {
      arr.push(challengesObject[key])
    };
    return arr;
  };

  challengeDataToObject = () => {
    const obj = {};
    const challenges = this.state.challenges;
    for (let i = 0; i < challenges.length; i++) {
      obj[i] = challenges[i];
    };
    return obj;
  };

  newGame = () => {
    this.setState({
      started: true
    });
  };

  resumeOldGame = (event) => {
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
        const x = JSON.parse(challengesData.challenge.xPos)
        const y = JSON.parse(challengesData.challenge.yPos)
        const delX = JSON.parse(challengesData.challenge.mapDeltaX)
        const delY = JSON.parse(challengesData.challenge.mapDeltaY)
        console.log("resume game X:", x, "Y:", y)
        const challengesObject = JSON.parse(challengesData.challenge.data.split("=>").join(":"));
        const challengesArray = this.challengeDataToArray(challengesObject);
        this.setState({
          challenge_id: challenge_id,
          challenges: challengesArray,
          started: true,
          xPos: x,
          yPos: y,
          oldGame: true,
          mapDeltaX: delX,
          mapDeltaY: delY
        });
      });
  };


  endGame = (username, xPos, yPos, mapDeltaX, mapDeltaY) => {
    console.log("end game X:", xPos, "Y:", yPos)
    let data;
    if (this.state.challenge_id) {
      data = {
        username: username,
        challenge: this.challengeDataToObject(),
        challenge_id: this.state.challenge_id,
        xPos: xPos,
        yPos: yPos,
        mapDeltaX: mapDeltaX,
        mapDeltaY: mapDeltaY
      };
    } else {
      data = {
        username: username,
        challenge: this.challengeDataToObject(),
        xPos: xPos,
        yPos: yPos,
        mapDeltaX: mapDeltaX,
        mapDeltaY: mapDeltaY
      };
    };
    fetch(`http://localhost:3000/api/v1/users/save_game`, {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(this.setState({
        started: false
      })
    );
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
    const started = this.state.started;

    return (
      <div>
        {started ? <CavernContainer oldGame={this.state.oldGame} mapDeltaX={this.state.mapDeltaX} mapDeltaY={this.state.mapDeltaY} xPos={this.state.xPos} yPos={this.state.yPos} endGame={this.endGame} getCode={this.handleGetCode} challenges={this.state.challenges} onUpdateChallenges={this.handleUpdateChallenges} onPassChallenge={this.handlePassChallenge}/> : <StartMenu newGame={this.newGame} resumeOldGame={this.resumeOldGame} />}
      </div>
    );
  };
};
