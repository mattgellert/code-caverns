import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink, NavBar } from 'react-router-dom'
import Home from './Home.js';
import Game from './Game.js';
import Story from './Story.js';
import './App.css';

export default class App extends Component {

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
          <Route exact path="/home" component={Home} />
          <Route exact path="/cavern" component={Game} />
          <Route exact path="/story" component={Story} />
        </div>
      </Router>
    );
  };

};
