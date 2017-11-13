import React, { Component } from 'react'

const StartMenu = ({demoGame, newGame}) => {

  return (
    <div className="start-menu-wrapper">
      <h1>Code Caverns</h1>
      <p>The untold story of Johann Westhauser</p>
      <form onSubmit={newGame}>
        <input type="text" placeholder="Enter your username"/>
        <input type="password" placeholder="Enter your password"/>
        <input type="submit" value="New Game"/>
      </form>
      <button onClick={demoGame}>Demo</button>
    </div>
  )
};

export default StartMenu;
