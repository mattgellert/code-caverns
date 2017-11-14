import React, { Component } from 'react'
import './Menu.css'

export default class StartMenu extends Component {

  state = {
    showResumeForm: false,
    showHistory: false,
    username: ""
  };

  retrieveGames = (event) => {
    event.preventDefault();
    //get request for history
    fetch(`http://localhost:3000/api/v1/users/history?username=${this.state.username}`, {
      method: 'get',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
      .then(resp => resp.json())
      .then(games => {
        if (!games.error) {
          debugger
          this.historyDisplay = (<ul>{games.games.map((game, idx) => {
            debugger
            return (<li onClick={this.props.resumeOldGame} value={game.challenge_id} key={idx}>Game {idx + 1} || Created {new Date(game.created_at).toUTCString()}</li>)
          })}</ul>);
          this.setState({
            showHistory: true
          });
        } else {
          //display the error
        };
      });
  };

  handleUsername = (event) => {
    this.setState({
      username: event.target.value
    });
  };

  displayResumeForm = () => {
    this.setState({
      showResumeForm: true
    });
  };


  render() {
    return (
      <div className="menu-wrapper">
        <h1>The untold story of Johann Westhauser</h1>
        { this.state.showResumeForm ?
          <form onSubmit={this.retrieveGames}>
            <input onChange={this.handleUsername} type="text" placeholder="Enter your username" value={this.state.username}/>
            <input type="submit" value="Retrieve Games"/>
          </form>
           : <button onClick={this.displayResumeForm}>Resume Game</button> }
        { this.state.showHistory ? this.historyDisplay : null }
        <button onClick={this.props.newGame}>New Game</button>
      </div>
    );
  };
};
