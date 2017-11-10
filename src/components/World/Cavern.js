import React from 'react';
import {Stage, Layer} from 'react-konva';
import Dude from './Dude';
import WallContainer from './WallContainer';
import ObstructionContainer from './ObstructionContainer';
import ChallengeContainer from '../ChallengeContainer';
import wallData from './wallData';
import obstructionData from './obstructionData';

class Cavern extends React.Component {
  state = {
    dude: {
      x: 400,
      y: 300,
      height: 30,
      width: 30
    },
    walls: [...wallData],
    obstructions: [...obstructionData],
    challengeMode: false
  }

  componentDidMount() {
    this.attachKeyListener();
    this.leftMoves = 0;
    this.rightMoves = 0;
    this.upMoves = 0;
    this.downMoves = 0;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.dude !== this.state.dude;
  }

  attachKeyListener = () => {
    document.addEventListener('keydown', (e) => {
      e.preventDefault();
      this.dudeMove(e.which);
      this.startgameLoop(10);
    })
  }

  removeKeyListener = () => {
    document.removeEventListener('keydown', (e) => {
      e.preventDefault();
      this.dudeMove(e.which);
      this.startgameLoop(10);
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.challengeMode === true && nextState.challengeMode === false) {
      this.attachKeyListener();
    }
    return true
  }
  //
  // startGameLoop = () => {
  //   setInterval(() => {this.gameLoop(10)}, 20)
  // }

  startgameLoop = (step) => {
    let updatedDudeX = this.state.dude.x + ((this.rightMoves-this.leftMoves) * step);
    let updatedDudeY = this.state.dude.y + ((this.downMoves-this.upMoves) * step);
    let updatedWalls = this.state.walls.map(wall => {
      return {
        ...wall,
        x: wall.x - ((this.rightMoves-this.leftMoves) * step),
        y: wall.y - ((this.downMoves-this.upMoves) * step)
      }
    }, this)

    let updatedObstructions = this.state.obstructions.map(obstruction => {
     return {
       ...obstruction,
       x: obstruction.x - ((this.rightMoves-this.leftMoves) * step),
       y: obstruction.y - ((this.downMoves-this.upMoves) * step)
     };
   }, this);

    if (!this.state.challengeMode) {

      if (this.state.dude.x < 200) { //if against or beyond the left bound
        // updatedDudeX = 200 //move dude to left bount
        if (this.rightMoves === 0) {
          updatedDudeX = this.state.dude.x //move dude to left bount
        };
      } else if (this.state.dude.x > 600) { //if against or beyond the right bound
        // updatedDudeX = 600 //move dude to right bound
        if (this.leftMoves === 0) {
          updatedDudeX = this.state.dude.x //move dude to right bound
        };
      } else if (this.state.dude.y < 150) { //if against or beyond the upper bound
        if (this.downMoves === 0) {
          updatedDudeY = this.state.dude.y //move dude to upper bound
        };
      } else if (this.state.dude.y > 450) { //if against or beyond the lower bound
        if (this.upMoves === 0) {
          updatedDudeY = this.state.dude.y //move dude to lower bound
        };
      } else { //if not against any boundary map doesn't move
        updatedWalls = this.state.walls;
        updatedObstructions = this.state.obstructions;
      };

      const updatedDude = {
        ...this.state.dude,
        x: updatedDudeX,
        y: updatedDudeY
      };

      this.setState({
        dude: {...updatedDude},
        walls: [ ...updatedWalls ],
        obstructions: [ ...updatedObstructions ]
      }, () => {this.checkDudeCollisions()})

      this.leftMoves = 0;
      this.rightMoves = 0;
      this.upMoves = 0;
      this.downMoves = 0;
    } else { //challengeMode TRUE
      this.removeKeyListener()
    }

  }

  checkDudeCollisions = () => {
    let updatedDudeX = this.state.dude.x;
    let updatedDudeY = this.state.dude.y;
    let update = false;

    const dudeLeft = this.state.dude.x;
    const dudeRight = this.state.dude.x + this.state.dude.width;
    const dudeTop = this.state.dude.y;
    const dudeBottom = this.state.dude.y + this.state.dude.height;

    this.state.walls.forEach(wall => {
      const wallLeft = wall.x;
      const wallRight = wall.x + wall.width;
      const wallTop = wall.y;
      const wallBottom = wall.y + wall.height;
    //if dude collides with wall
      //move dude to edge of wall
      // if (dudeLeft > wallLeft && dudeLeft < wallRight && dudeTop > wallTop && dudeBottom < wallBottom) {
      if (this.leftMoves !== 0) {
        if (dudeLeft > wallLeft && dudeLeft < wallRight && ((dudeTop > wallTop && dudeTop < wallBottom) || (dudeBottom > wallTop && dudeBottom < wallBottom))) {
          console.log('left collision')
          updatedDudeX = wall.x + wall.width;
          update = true;
        };
      }
    });

    // this.state.obstructions.forEach(obstruction => {
    //   const obstructionLeft
    //   const obstructionRight
    //   const obstructionTop
    //   const obstructionBottom
    // })
    //if dude collides with obstacle
      //set challengeMode to TRUE
    if (update) {
      // debugger
      this.setState({
        dude: {
          ...this.state.dude,
          x: updatedDudeX,
          y: updatedDudeY
        }
      });
    };

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

  render() { //might need to put the entire Stage in a Cavern Container so we can place the ChallengeContainer over the Stage
    return (
      <Stage width={800} height={600}>
        <WallContainer walls={this.state.walls} />
        <ObstructionContainer obstructions={this.state.obstructions} />
        <Layer>
          <Dude position={this.state.dude} onMove={this.dudeMove} />
        </Layer>
        {this.state.challengeMode ? <ChallengeContainer /> : null}
      </Stage>
    )
  }
};

export default Cavern;

  // checkDudeBounds = (dir, step) => {
  //   const dudeLeft   = this.state.dude.x;
  //   const dudeRight  = this.state.dude.x + this.state.dude.width;
  //   const dudeTop    = this.state.dude.y;
  //   const dudeBottom = this.state.dude.y + this.state.dude.height;
  //   let newObj;
  //
  //   if (dudeLeft + step  < 200 && dir === 'x') {
  //     newObj = {x: 200};
  //   } else if (dudeRight + step > 600 && dir === 'x') {
  //     newObj = {x: 600 - this.state.dude.width};
  //   } else if (dudeTop + step < 150 && dir === 'y') {
  //     newObj = {y: 150};
  //   } else if (dudeBottom + step > 450 && dir === 'y') {
  //     newObj = {y: 450 - this.state.dude.height};
  //   } else {
  //     return false;
  //   }
  //
  //   if (!this.checkDudeCollisions(dir, step)) {
  //     this.mapMove(dir, step);
  //   }
  //
  //   return newObj;
  // }
  //
  // collisionHelper = (obj, step, dir) => {
  //   const dudeLeft   = this.state.dude.x;
  //   const dudeRight  = this.state.dude.x + this.state.dude.width;
  //   const dudeTop    = this.state.dude.y;
  //   const dudeBottom = this.state.dude.y + this.state.dude.height;
  //   const objLeft    = obj.x
  //   const objRight   = obj.x + obj.width
  //   const objTop     = obj.y
  //   const objBottom  = obj.y + obj.height
  //
  //   const collisions = {
  //     left:
  //       (dudeLeft + step) <= objRight &&
  //       (dudeLeft + step) >= objLeft &&
  //       ((dudeBottom >= objTop && dudeBottom <= objBottom) ||
  //                (dudeTop <= objBottom && dudeTop >= objTop)),
  //     right:
  //       (dudeRight + step) >= objLeft &&
  //       (dudeRight + step) <= objRight &&
  //       ((dudeBottom >= objTop && dudeBottom <= objBottom) ||
  //                (dudeTop <= objBottom && dudeTop >= objTop)),
  //     top:
  //       (dudeTop + step) <= objBottom &&
  //       (dudeTop + step) >= objTop &&
  //       ((dudeRight >= objLeft && dudeRight <= objRight) ||
  //                (dudeLeft <= objRight && dudeLeft >= objLeft)),
  //     bottom:
  //       (dudeBottom + step) >= objTop &&
  //       (dudeBottom + step) <= objBottom &&
  //       ((dudeRight >= objLeft && dudeRight <= objRight) ||
  //                (dudeLeft <= objRight && dudeLeft >= objLeft))
  //   }
  //   collisions.left ? console.log("left", collisions.left) : null
  //   collisions.right ? console.log("right", collisions.right) : null
  //   collisions.top ? console.log("top", collisions.top) : null
  //   collisions.bottom ? console.log("bottom", collisions.bottom) : null
  //   return collisions
  // }
  //
  // checkDudeCollisions = (dir, step) => {
  //   let collision = false;
  //
  //   const newWalls = this.state.walls.forEach(wall => {
  //     const collisions = this.collisionHelper(wall, step, dir)
  //
  //     if (collisions.left || collisions.right || collisions.top || collisions.bottom) {
  //       collision = true;
  //     };
  //   });
  //
  //   const newObstructions = this.state.obstructions.forEach(obstruction => {
  //     const collisions = this.collisionHelper(obstruction, step, dir)
  //
  //     if (collisions.left || collisions.right || collisions.top || collisions.bottom) {
  //       collision = true;
  //       //do some other shit
  //     };
  //   });
  //
  //   return collision;
  // }
  //
  //
  // dudeMove = (dir, step) => {
  //   let newObj;
  //
  //   switch(dir) {
  //     case 37:
  //       this.checkDudeBounds('x', -step) ? newObj = this.checkDudeBounds('x', -step) : newObj = {x: this.state.dude.x - step};
  //       break;
  //     case 38:
  //       this.checkDudeBounds('y', -step) ? newObj = this.checkDudeBounds('y', -step) : newObj = {y: this.state.dude.y - step};
  //       break;
  //     case 39:
  //       this.checkDudeBounds('x', step) ? newObj = this.checkDudeBounds('x', step) : newObj = {x: this.state.dude.x + step};
  //       break;
  //     case 40:
  //       this.checkDudeBounds('y', step) ? newObj = this.checkDudeBounds('y', step) : newObj = {y: this.state.dude.y + step};
  //       break;
  //     default: break;
  //   }
  //
  //   this.setState({
  //     dude: {
  //       ...this.state.dude,
  //       ...newObj
  //     }
  //   })
  // }
  //
  // mapMove = (dir, step) => {
  //   const dudeLeft   = this.state.dude.x;
  //   const dudeRight  = this.state.dude.x + this.state.dude.width;
  //   const dudeTop    = this.state.dude.y;
  //   const dudeBottom = this.state.dude.y + this.state.dude.height;
  //
  //   const newWalls = this.state.walls.map(wall => {
  //     if(dudeLeft + step < 200 && dir === 'x') {
  //       wall.x -= step;
  //     } else if (dudeRight + step > 600 && dir === 'x') {
  //       wall.x -= step;
  //     } else if (dudeTop + step < 150 && dir === 'y') {
  //       wall.y -= step;
  //     } else if (dudeBottom + step > 450 && dir === 'y') {
  //       wall.y -= step;
  //     }
  //     return wall;
  //   });
  //
  //   const newObstructions = this.state.obstructions.map(obstruction => {
  //     if(dudeLeft + step < 200 && dir === 'x') {
  //       obstruction.x -= step;
  //     } else if (dudeRight + step > 600 && dir === 'x') {
  //       obstruction.x -= step;
  //     } else if (dudeTop + step < 150 && dir === 'y') {
  //       obstruction.y -= step;
  //     } else if (dudeBottom + step > 450 && dir === 'y') {
  //       obstruction.y -= step;
  //     }
  //     return obstruction;
  //   });
  //
  //   this.setState({
  //     walls: newWalls,
  //     obstructions: newObstructions
  //   });
  // }
