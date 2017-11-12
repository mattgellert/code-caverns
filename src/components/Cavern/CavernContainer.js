import React from 'react';
import {Stage, Layer} from 'react-konva';
import ChallengeContainer from '../Challenge/ChallengeContainer.js';
import wallData from './wallData.js';
import Cavern from './Cavern.js'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import './CavernContainer.css'

export default class CavernContainer extends React.Component {
  state = {
    dude: {
      x: 400,
      y: 300,
      height: 30,
      width: 30,
      direction: "idle"
    },
    walls: [...wallData],
    challengeMode: false,
    currentChallengeName: "",
    sprite: null,
    image: null
  };

  componentDidMount() {
    const image = new window.Image();

    image.onload = () => {
      this.setState({
        image: image
      });
    };
    image.src = 'https://i.imgur.com/hbdw5dS.png';
    this.attachKeyListeners();
    this.leftMoves = 0;
    this.rightMoves = 0;
    this.upMoves = 0;
    this.downMoves = 0;
  };

  getSpriteRef = (sprite) => {
    this.setState({
      sprite: sprite
    }, () => {this.state.sprite.start()});
  };

  attachKeyListeners = () => {
    this.keydownListener = (e) => {
      e.preventDefault();
      this.dudeMove(e.which);
      this.dudeStartAnimation(e.which);
      this.startgameLoop(10);
    };
    this.keyupListener = (e) => {
      e.preventDefault();
      this.dudeEndAnimation();
    }
    document.addEventListener('keydown', this.keydownListener);
    document.addEventListener('keyup', this.keyupListener);
  };

  removeKeyListeners = () => {
    document.removeEventListener('keydown', this.keydownListener);
    document.removeEventListener('keyup', this.keyupListener);
  };

  dudeStartAnimation = (key) => {
    let direction;
    switch (key) {
      case 37:
        direction = "left";
        break;
      case 38:
        direction = "up";
        break;
      case 39:
        direction = "right";
        break;
      case 40:
        direction = "down";
        break;
      default:
        direction = "idle";
        break;
    };
    this.setState({
      dude: {
        ...this.state.dude,
        direction: direction
      }
    });
  };

  dudeEndAnimation = () => {
    this.setState({
      dude: {
        ...this.state.dude,
        direction: "idle"
      }
    });
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.challengeMode === true && nextState.challengeMode === false) {
      this.attachKeyListeners();
      this.state.sprite.start();
    } else if (this.state.challengeMode === false && nextState.challengeMode === true) {
      this.removeKeyListeners();
      this.state.sprite.stop();
    };
    return true;
  };

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

  startgameLoop = (step) => {
    if (!this.state.challengeMode) {
      const updatedDudeAndMap = this.updateDudeAndMap(step);
      const updatedMapX = updatedDudeAndMap.mapX;
      const updatedMapY = updatedDudeAndMap.mapY;
      const updatedDudeX = updatedDudeAndMap.dudeX;
      const updatedDudeY = updatedDudeAndMap.dudeY;

      const updatedWalls = this.state.walls.map(wall => {
        return {
          ...wall,
          x: wall.x - updatedMapX,
          y: wall.y - updatedMapY
        };
      }, this);

      const updatedChallenges = this.props.challenges.filter(challenge => {
        return !challenge.pass
      }, this).map(challenge => {
       return {
         ...challenge,
         obstruction: {
           ...challenge.obstruction,
           x: challenge.obstruction.x - updatedMapX,
           y: challenge.obstruction.y - updatedMapY
         }
       };
     }, this);

      const updatedDude = {
        ...this.state.dude,
        x: updatedDudeX,
        y: updatedDudeY
      };

      this.props.onUpdateChallenges(updatedChallenges);

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

  updateDudeAndMap = (step) => {
    let updatedDudeX = this.state.dude.x + ((this.rightMoves-this.leftMoves) * step);
    let updatedDudeY = this.state.dude.y + ((this.downMoves-this.upMoves) * step);
    let updatedMapX = 0;
    let updatedMapY = 0;

    if (this.state.dude.x < 200) { //if against or beyond the left bound
      if (this.rightMoves === 0 && this.leftMoves > 0) {
        updatedDudeX = this.state.dude.x; //keep dude to left bount
        console.log('left bound');
        updatedMapX = (this.rightMoves - this.leftMoves) * step;
      };
    };
    if (this.state.dude.x > 600) { //if against or beyond the right bound
      if (this.leftMoves === 0 && this.rightMoves > 0) {
        updatedDudeX = this.state.dude.x; //keep dude to right bound
        console.log('right bound');
        updatedMapX = (this.rightMoves - this.leftMoves) * step;
      };
    };
    if (this.state.dude.y < 150) { //if against or beyond the upper bound
      if (this.downMoves === 0 && this.upMoves > 0) {
        updatedDudeY = this.state.dude.y; //keep dude to upper bound
        console.log('upper bound');
        updatedMapY = (this.downMoves - this.upMoves) * step;
      };
    };
    if (this.state.dude.y > 450) { //if against or beyond the lower bound
      if (this.upMoves === 0 && this.downMoves > 0) {
        updatedDudeY = this.state.dude.y; //keep dude to lower bound
        console.log('lower bound');
        updatedMapY = (this.downMoves - this.upMoves) * step;
      };
    };

    return {
      dudeX: updatedDudeX,
      dudeY: updatedDudeY,
      mapX: updatedMapX,
      mapY: updatedMapY
    };
  };

  checkDudeCollisions = (boundaryCheck) => {
    let updated = {
      dudeX: this.state.dude.x,
      dudeY: this.state.dude.y,
      update: false
    };

    let dude = {
      left: this.state.dude.x,
      right: this.state.dude.x + this.state.dude.width,
      top: this.state.dude.y,
      bottom: this.state.dude.y + this.state.dude.height
    };

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
      };
      updated = this.collisionsHelper(updated, dude, wallObj, "wall", null);
    });

    if (!updated.update) {
      updated = {
       dudeX: this.state.dude.x,
       dudeY: this.state.dude.y,
       update: false
     };

     this.props.challenges.forEach(challenge => {
       const obstr = {
         left: challenge.obstruction.x,
         right: challenge.obstruction.x + challenge.obstruction.width,
         top: challenge.obstruction.y,
         bottom: challenge.obstruction.y + challenge.obstruction.height,
         x: challenge.obstruction.x,
         y: challenge.obstruction.y,
         width: challenge.obstruction.width,
         height: challenge.obstruction.height
       };

       updated = this.collisionsHelper(updated, dude, obstr, "obstruction", challenge.name);
     });
   };

    if (updated.type === "obstruction" && updated.update === true) {
      console.log("initiate a challenge");
      this.setState({
        challengeMode: true,
        currentChallengeName: updated.challengeName
      });
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
  };

  collisionsHelper = (updated, dude, obj, type, challengeName) => {
    if (this.leftMoves !== 0) {
      if (dude.left > obj.left && dude.left < obj.right && ((dude.top > obj.top && dude.top < obj.bottom) || (dude.bottom > obj.top && dude.bottom < obj.bottom))) {
        //if dude collides with wall
          //move dude to edge of wall
        updated.dudeX = obj.x + obj.width;
        updated.update = true;
      };
    } else if (this.rightMoves !== 0) {
      if (dude.right > obj.left && dude.right < obj.right && ((dude.top > obj.top && dude.top < obj.bottom) || (dude.bottom > obj.top && dude.bottom < obj.bottom))) {
        //if dude collides with obj
          //move dude to edge of obj
        updated.dudeX = obj.x - this.state.dude.width;
        updated.update = true;
      };
    } else if (this.upMoves !== 0) {
      if (dude.top > obj.top && dude.top < obj.bottom && ((dude.left > obj.left && dude.left < obj.right) || (dude.right > obj.left && dude.right < obj.right))) {
        //if dude collides with obj
          //move dude to edge of obj
        updated.dudeY = obj.y + obj.height;
        updated.update = true;
      };
    } else if (this.downMoves !== 0) {
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
      challengeName: challengeName
    };
  };

  handleChallengeQuit = (editorName, code, pass) => {
    //return to game map
    this.setState({
      challengeMode: false
    });
    this.props.getCode(editorName, code, pass);
  };

  handleChallengePass = (challengeName) => {
    //return to game map and remove obstacle
    this.props.onPassChallenge(challengeName);
  };



  render() {
    return (
      <div className="cavern-container">
        <ReactCSSTransitionGroup
          transitionName="cavern">
          {this.state.challengeMode ? null : <Cavern walls={this.state.walls} challenges={this.props.challenges} dude={this.state.dude} image={this.state.image} onMove={this.dudeMove} handleSpriteRef={this.getSpriteRef}/>}
        </ReactCSSTransitionGroup>
        <ReactCSSTransitionGroup
          transitionName="challenge">
          {this.state.challengeMode ? <ChallengeContainer name={this.state.currentChallengeName} challenges={this.props.challenges} handleQuit={this.handleChallengeQuit} handlePass={this.handleChallengePass}/> : null}
        </ReactCSSTransitionGroup>
      </div>
    );
  };
};
