import React from 'react';
import {Stage, Layer} from 'react-konva';
import { Redirect } from 'react-router-dom';
import ChallengeContainer from '../Challenge/ChallengeContainer.js';
import wallData from './wallData.js';
import Cavern from './Cavern.js'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import './CavernContainer.css'
import FinalAnimation from './FinalAnimation.js'
import ChallengeData from '../Challenge/ChallengeData.js';
import RocksFalling from '../../sounds/RocksFalling.mp3'
import RocksFalling1 from '../../sounds/RocksFalling.mp3'
import RocksFalling2 from '../../sounds/RocksFalling.mp3'
import Explosion from '../../sounds/Explosion.mp3'
import WinChallengeMusic from '../../sounds/WinChallengeMusic.mov'

export default class CavernContainer extends React.Component {
  
  state = {
    dude: {
      x: this.props.xPos,
      y: this.props.yPos,
      height: 64,
      width: 64,
      direction: "idle",
      deltaX: 0,
      deltaY: 0
    },
    walls: [...wallData],
    challengeMode: false,
    currentChallengeName: "",
    sprite: null,
    image: null,
    paused: false,
    usernameOnQuit: "",
    oldGame: this.props.oldGame
  };

  componentDidMount() {
    document.getElementsByClassName("app-title")[0].scrollIntoView()
    const image = new window.Image();

    image.onload = () => {
      this.setState({
        image: image
      });
    };
    image.src = 'https://i.imgur.com/JA42ezn.png'; // Dude sprite sheet
    this.attachKeyListeners();
    this.leftMoves = 0;
    this.rightMoves = 0;
    this.upMoves = 0;
    this.downMoves = 0;
    this.count = 0;
    this.mapDeltaX = this.props.mapDeltaX;
    this.mapDeltaY = this.props.mapDeltaY;
    this.finalChallengeComplete = false;
    this.dudeMove(37); //DO WE NEED ALL OF THESE?
    this.dudeStartAnimation(37);
    this.startgameLoop(10); //CAN WE PUT THIS AFTER SET STATE IN dudeStartAnimation() ?
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
    };
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
      nextProps.challenges.forEach(challenge => {
        if (challenge.name === "circleOfStones" && challenge.pass === true) {
          this.removeKeyListeners();
      		this.finalChallengeComplete = true;
        };
      });
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
    if (!this.state.challengeMode && !this.state.paused) {
      const updatedDudeAndMap = this.updateDudeAndMap(step);
      let updatedMapX = updatedDudeAndMap.mapX;
      let updatedMapY = updatedDudeAndMap.mapY;
      let updatedChallengeX = updatedDudeAndMap.mapX;
      let updatedChallengeY = updatedDudeAndMap.mapY;
      const updatedDudeX = updatedDudeAndMap.dudeX;
      const updatedDudeY = updatedDudeAndMap.dudeY;

      if (this.count === 0 && this.state.oldGame) {
        updatedMapX = this.mapDeltaX;
        updatedMapY = this.mapDeltaY;
        updatedChallengeX = 0;
        updatedChallengeY = 0;
      } else {
        this.mapDeltaX += updatedMapX;
        this.mapDeltaY += updatedMapY;
      };

      this.updatedMapX = updatedMapX
      this.updatedMapY = updatedMapY

      const dudeDeltaX = updatedDudeX - 368;
      const dudeDeltaY = updatedDudeY - 268;

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
           x: challenge.obstruction.x - updatedChallengeX,
           y: challenge.obstruction.y - updatedChallengeY
         }
       };
     }, this);

      const updatedDude = {
        ...this.state.dude,
        x: updatedDudeX,
        y: updatedDudeY,
        deltaX: dudeDeltaX,
        deltaY: dudeDeltaY
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
      this.count++;
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
        updatedMapX = (this.rightMoves - this.leftMoves) * step;
      };
    };
    if (this.state.dude.x > 536) { //if against or beyond the right bound
      if (this.leftMoves === 0 && this.rightMoves > 0) {
        updatedDudeX = this.state.dude.x; //keep dude to right bound
        updatedMapX = (this.rightMoves - this.leftMoves) * step;
      };
    };
    if (this.state.dude.y < 150) { //if against or beyond the upper bound
      if (this.downMoves === 0 && this.upMoves > 0) {
        updatedDudeY = this.state.dude.y; //keep dude to upper bound
        updatedMapY = (this.downMoves - this.upMoves) * step;
      };
    };
    if (this.state.dude.y > 386) { //if against or beyond the lower bound
      if (this.upMoves === 0 && this.downMoves > 0) {
        updatedDudeY = this.state.dude.y; //keep dude to lower bound
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
        if (!updated.update) {
          updated = this.collisionsHelper(updated, dude, obstr, "obstruction", challenge.name);
        }
     });
   };

    if (updated.type === "obstruction" && updated.update === true) {
      this.setState({
        challengeMode: true,
        currentChallengeName: updated.challengeName
      });
    };

    if (updated.update && !boundaryCheck && updated.type !== "obstruction") {
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

  displayEndMenu = () => {
    this.removeKeyListeners();
    if (!this.props.challengeId) {
      this.setState({
        paused: true
      });
    } else {
      this.props.endGame(false, this.state.dude.x, this.state.dude.y, this.mapDeltaX, this.mapDeltaY);
    };
  };

  removeEndMenu = () => {
    this.attachKeyListeners();
    this.setState({
      paused: false
    });
  };

  handleUsernameOnQuit = (event) => {
    this.setState({
      usernameOnQuit: event.target.value
    })
  };

  saveGameFromQuit = (event) => {
    event.preventDefault();
    if (!this.props.challengeId) {
      this.props.endGame(this.state.usernameOnQuit, this.state.dude.x, this.state.dude.y, this.mapDeltaX, this.mapDeltaY);
    } else {
      this.props.endGame(false, this.state.dude.x, this.state.dude.y, this.mapDeltaX, this.mapDeltaY);
    };
  };

  componentWillUnmount() {
    this.removeKeyListeners();
  };

  redirectToStory = () => {
    this.props.history.push("/code-caverns")
  };

  playFinalMusic() {
    const audio = new Audio(Explosion)
    const audio1 = new Audio(RocksFalling)
    const audio2 = new Audio(RocksFalling1)
    const audio3 = new Audio(RocksFalling2)
    setTimeout(() => {audio.play()}, 6500)
    audio1.play()
    setTimeout(() => {audio2.play()}, 200)
    setTimeout(() => {audio3.play()}, 400)
  }


  render() {
    const challengeMode = this.state.challengeMode;
    const containerClasses = challengeMode ? "challenge-container" : "cavern-container"

    if (!this.finalChallengeComplete) {
      return (
        <div className={containerClasses}>
          <ReactCSSTransitionGroup
            transitionName="cavern">
            {challengeMode ? null : <Cavern updatedMapX={this.updatedMapX} updatedMapY={this.updatedMapY} dudeDeltaX={this.state.dude.deltaX} dudeDeltaY={this.state.dude.deltaY} walls={this.state.walls} challenges={this.props.challenges} dude={this.state.dude} image={this.state.image} onMove={this.dudeMove} handleSpriteRef={this.getSpriteRef}/>}
          </ReactCSSTransitionGroup>
          {challengeMode ? null : <button className="start quit" onClick={this.displayEndMenu}>Quit</button> }
          {this.state.paused ?
            <div className="modal" id="pauseModel">
              <div className="modal-content">
                <span className="close" onClick={this.removeEndMenu}>&times;</span>
                <p className="modal-text">If you're done playing, enter your username and click save!</p>
                <form className="modal-form" onSubmit={this.saveGameFromQuit}>
                  <input className="input" type="text" onChange={this.handleUsernameOnQuit} value={this.state.usernameOnQuit}/>
                  <input className="modal-save" type="submit" value="Save"/>
                </form>
                <button className="skip" onClick={this.redirectToStory}>Skip Save</button>
              </div>
            </div>
            : null
          }
          <ReactCSSTransitionGroup
            transitionName="challenge">
            {challengeMode ? <ChallengeContainer name={this.state.currentChallengeName} challenges={this.props.challenges} handleQuit={this.handleChallengeQuit} handlePass={this.handleChallengePass}/> : null}
          </ReactCSSTransitionGroup>
        </div>
      );
    } else {
      this.playFinalMusic();
      return (
        <div className="final-animation">
          <FinalAnimation history={this.props.history} challengeId={this.props.challengeId} onUsernameOnQuit={this.handleUsernameOnQuit} onSaveGameFromQuit={this.saveGameFromQuit} usernameOnQuit={this.state.usernameOnQuit}/>
        </div>
      )
    };
  };
};
