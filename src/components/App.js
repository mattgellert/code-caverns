import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink, Redirect } from 'react-router-dom'
import Home from './Home.js';
import Game from './Game.js';
import Story from './Story.js';
import './App.css';

export default class App extends Component {

  state = {
    enter: false
  };

  handleEnter = () => {
    this.setState({
      enter: true
    }, () => {
      this.setState({
        enter: false
      });
    });
  };

  render() {
    return (
      <Router>
        <div className="route-wrapper">
          <ul className="navlink-wrapper">
            <li><NavLink className="link left" to="/home">Home</NavLink></li>
            <li><NavLink className="link right" to="/cavern">Cavern</NavLink></li>
            <li><NavLink className="link right" to="/story">Story</NavLink></li>
          </ul>
          <h1 className="title">Code Caverns</h1>
          <Route exact path="/home" render={() => {
            return this.state.enter ? <Redirect to="/cavern"/> : <Home onEnter={this.handleEnter}/>
          }} />
          <Route exact path="/cavern" component={Game} />
          <Route exact path="/story" component={Story} />
        </div>
      </Router>
    );
  };

};
