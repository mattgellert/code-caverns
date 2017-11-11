import React, { Component } from 'react'

const StartMenu = ({demoGame}) => {
  return (
    <div className="start-menu-wrapper">
      <button onClick={demoGame}>Demo</button>
    </div>
  )
};

export default StartMenu;
