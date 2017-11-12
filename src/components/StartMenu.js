import React, { Component } from 'react'

const StartMenu = ({demoGame, newGame}) => {

  return (
    <div className="start-menu-wrapper">
      <button onClick={newGame}>New Game</button>
      <button onClick={demoGame}>Demo</button>
    </div>
  )
};

export default StartMenu;
