import React from 'react';
import {Stage, Layer} from 'react-konva';
import ChallengeContainer from '../ChallengeContainer';
import wallData from './wallData';
import obstructionData from './obstructionData';
import Cavern from './Cavern'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import './CavernContainer.css'

export default class CavernContainer extends React.Component {
  state = {
    dude: {
      x: 400,
      y: 300,
      height: 30,
      width: 30
    },
    walls: [...wallData],
    challengeMode: false,
    currentObstructionName: ""
  }

  componentDidMount() {
    this.attachKeyListener();
    this.leftMoves = 0;
    this.rightMoves = 0;
    this.upMoves = 0;
    this.downMoves = 0;
  }

  attachKeyListener = () => {
    this.listener = (e) => {
      e.preventDefault();
      this.dudeMove(e.which);
      this.startgameLoop(10);
    }
    document.addEventListener('keydown', this.listener)
  }

  removeKeyListener = () => {
    console.log('remove key listener')
    document.removeEventListener('keydown', this.listener)
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.challengeMode === true && nextState.challengeMode === false) {
      this.attachKeyListener();
    } else if (this.state.challengeMode === false && nextState.challengeMode === true) {
      this.removeKeyListener();
    }
    return true
  }

  startgameLoop = (step) => {
    let updatedDudeX = this.state.dude.x + ((this.rightMoves-this.leftMoves) * step);
    let updatedDudeY = this.state.dude.y + ((this.downMoves-this.upMoves) * step);
   let updatedMapX = 0;
   let updatedMapY = 0;


    if (!this.state.challengeMode) {
      // if (this.checkDudeCollisions(true)) {
        if (this.state.dude.x < 200) { //if against or beyond the left bound
          if (this.rightMoves === 0 && this.leftMoves > 0) {
            updatedDudeX = this.state.dude.x //keep dude to left bount
            console.log('left bound')
            updatedMapX = (this.rightMoves - this.leftMoves) * step
          };
        }
        if (this.state.dude.x > 600) { //if against or beyond the right bound
          if (this.leftMoves === 0 && this.rightMoves > 0) {
            updatedDudeX = this.state.dude.x //keep dude to right bound
            console.log('right bound')
            updatedMapX = (this.rightMoves - this.leftMoves) * step
          };
        }
        if (this.state.dude.y < 150) { //if against or beyond the upper bound
          if (this.downMoves === 0 && this.upMoves > 0) {
            updatedDudeY = this.state.dude.y //keep dude to upper bound
            console.log('upper bound')
            updatedMapY = (this.downMoves - this.upMoves) * step
          };
        }
        if (this.state.dude.y > 450) { //if against or beyond the lower bound
          if (this.upMoves === 0 && this.downMoves > 0) {
            updatedDudeY = this.state.dude.y //keep dude to lower bound
            console.log('lower bound')
            updatedMapY = (this.downMoves - this.upMoves) * step
          };
        }
      // }


      let updatedWalls = this.state.walls.map(wall => {
        return {
          ...wall,
          x: wall.x - updatedMapX,
          y: wall.y - updatedMapY
        }
      }, this)


      //ADD FILTER HERE? (TO REMOVE PASSED OBSTACLES)
      let updatedObstructions = this.props.obstructions.map(obstruction => {
       return {
         ...obstruction,
         x: obstruction.x - updatedMapX,
         y: obstruction.y - updatedMapY
       };
     }, this);

      const updatedDude = {
        ...this.state.dude,
        x: updatedDudeX,
        y: updatedDudeY
      };


      //callback to update App obstructions
      this.props.onUpdateObstructions(updatedObstructions);

      this.setState({
        dude: {...updatedDude},
        walls: [ ...updatedWalls ]
      }, () => {this.checkDudeCollisions(false)});

      this.leftMoves = 0;
      this.rightMoves = 0;
      this.upMoves = 0;
      this.downMoves = 0;
    };
  };

  collisionsHelper = (updated, dude, obj, type, obstructionName) => {
    if (this.leftMoves !== 0) {
      if (dude.left > obj.left && dude.left < obj.right && ((dude.top > obj.top && dude.top < obj.bottom) || (dude.bottom > obj.top && dude.bottom < obj.bottom))) {
        //if dude collides with wall
          //move dude to edge of wall
        updated.dudeX = obj.x + obj.width;
        updated.update = true;
      };
    };

    if (this.rightMoves !== 0) {
      if (dude.right > obj.left && dude.right < obj.right && ((dude.top > obj.top && dude.top < obj.bottom) || (dude.bottom > obj.top && dude.bottom < obj.bottom))) {
        //if dude collides with obj
          //move dude to edge of obj
        updated.dudeX = obj.x - this.state.dude.width;
        updated.update = true;
      };
    };

    if (this.upMoves !== 0) {
      if (dude.top > obj.top && dude.top < obj.bottom && ((dude.left > obj.left && dude.left < obj.right) || (dude.right > obj.left && dude.right < obj.right))) {
        //if dude collides with obj
          //move dude to edge of obj
        updated.dudeY = obj.y + obj.height;
        updated.update = true;
      };
    };

    if (this.downMoves !== 0) {
      if (dude.bottom > obj.top && dude.bottom < obj.bottom && ((dude.left > obj.left && dude.left < obj.right) || (dude.right > obj.left && dude.right < obj.right))) {
        //if dude collides with obj
          //move dude to edge of obj
        updated.dudeY = obj.y - this.state.dude.height;
        updated.update = true;
      };
    };

    return {
      dudeX: updated.dudeX,
      dudeY: updated.dudeY,
      update: updated.update,
      type: type,
      obstructionName: obstructionName
    }
  }


  checkDudeCollisions = (boundaryCheck) => {
    let updated = {
      dudeX: this.state.dude.x,
      dudeY: this.state.dude.y,
      update: false
    }

    let dude = {
      left: this.state.dude.x,
      right: this.state.dude.x + this.state.dude.width,
      top: this.state.dude.y,
      bottom: this.state.dude.y + this.state.dude.height
    }

    this.state.walls.forEach(wall => {

      const wallObj = {
        left: wall.x,
        right: wall.x + wall.width,
        top: wall.y,
        bottom: wall.y + wall.height,
        x: wall.x,
        y: wall.y,
        width: wall.width,
        height: wall.height
      }

      updated = this.collisionsHelper(updated, dude, wallObj, "wall", null)
    });

    if (!updated.update) {
      updated = {
       dudeX: this.state.dude.x,
       dudeY: this.state.dude.y,
       update: false
     };

     this.props.obstructions.forEach(obstruction => {
       const obstr = {
         left: obstruction.x,
         right: obstruction.x + obstruction.width,
         top: obstruction.y,
         bottom: obstruction.y + obstruction.height,
         x: obstruction.x,
         y: obstruction.y,
         width: obstruction.width,
         height: obstruction.height
       };

       updated = this.collisionsHelper(updated, dude, obstr, "obstruction", obstruction.name)
     });
   };

    if (updated.type === "obstruction" && updated.update === true) {
      console.log("initiate a challenge")
      this.setState({
        challengeMode: true,
        currentObstructionName: updated.obstructionName
      })
    };

    if (updated.update && !boundaryCheck && updated.type !== "obstruction") {
      console.log('collision')
      this.setState({
        dude: {
          ...this.state.dude,
          x: updated.dudeX,
          y: updated.dudeY
        }
      });
    };
    return updated.update;
  }

  dudeMove = (dir) => {
    switch (dir) {
      case 37:
        this.leftMoves++;
        break;
      case 38:
        this.upMoves++;
        break;
      case 39:
        this.rightMoves++;
        break;
      case 40:
        this.downMoves++;
        break;
      default: break;
    };
  };

  handleChallengeQuit = (e) => {
    //return to game map
    this.setState({
      challengeMode: false
    });
    //look out for character in wall
  }

  handleChallengePass = (obstructionName) => {
    //return to game map and remove obstacle
    this.setState({
      challengeMode: false
    });
    this.props.onPassObstruction(obstructionName);
  }

  render() { //might need to put the entire Stage in a Cavern Container so we can place the ChallengeContainer over the Stage
    return (
      <div className="cavern-container">
        <ReactCSSTransitionGroup
          transitionName="cavern">
          {this.state.challengeMode ? null : <Cavern walls={this.state.walls} obstructions={this.props.obstructions} position={this.state.dude} onMove={this.dudeMove}/>}
        </ReactCSSTransitionGroup>
        <ReactCSSTransitionGroup
          transitionName="challenge">
          {this.state.challengeMode ? <ChallengeContainer name={this.state.currentObstructionName} editors={this.props.editors} handleQuit={this.handleChallengeQuit} handlePass={this.handleChallengePass}/> : null}
        </ReactCSSTransitionGroup>
      </div>
    )
  }
};
