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
      height: 100,
      width: 100
    },
    walls: [...wallData],
    obstructions: [...obstructionData]
  }

  componentDidMount() {
    this.attachKeyListener();
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return nextState.dude !== this.state.dude;
  // }

  attachKeyListener = () => {
    document.addEventListener('keydown', (e) => {
      e.preventDefault(); 
      this.dudeMove(e.which, 20);
    })
  }

  checkDudeBounds = (dir, step) => {
    const dudeLeft   = this.state.dude.x;
    const dudeRight  = this.state.dude.x + this.state.dude.width; 
    const dudeTop    = this.state.dude.y;
    const dudeBottom = this.state.dude.y + this.state.dude.height;  
    let newObj;

    if (dudeLeft + step  < 200 && dir === 'x') { 
      newObj = {x: 200}; 
    } else if (dudeRight + step > 600 && dir === 'x') {
      newObj = {x: 600 - this.state.dude.width};
    } else if (dudeTop + step < 150 && dir === 'y') {
      newObj = {y: 150};
    } else if (dudeBottom + step > 450 && dir === 'y') {
      newObj = {y: 450 - this.state.dude.height};
    } else {
      return false;
    }

    this.mapMove(dir, step); 
    return newObj;
  }


  dudeMove = (dir, step) => {
    let newObj;

    switch(dir) {
      case 37: 
        this.checkDudeBounds('x', -step) ? newObj = this.checkDudeBounds('x', -step) : newObj = {x: this.state.dude.x - step}; 
        break; 
      case 38: 
        this.checkDudeBounds('y', -step) ? newObj = this.checkDudeBounds('y', -step) : newObj = {y: this.state.dude.y - step};
        break;
      case 39: 
        this.checkDudeBounds('x', step) ? newObj = this.checkDudeBounds('x', step) : newObj = {x: this.state.dude.x + step}; 
        break; 
      case 40: 
        this.checkDudeBounds('y', step) ? newObj = this.checkDudeBounds('y', step) : newObj = {y: this.state.dude.y + step}; 
        break; 
      default: break; 
    }

    this.setState({
      dude: {
        ...this.state.dude, 
        ...newObj
      }
    }, () => {this.mapMove(20)})
  }

  mapMove = (dir, step) => {
    const dudeLeft   = this.state.dude.x;
    const dudeRight  = this.state.dude.x + this.state.dude.width; 
    const dudeTop    = this.state.dude.y;
    const dudeBottom = this.state.dude.y + this.state.dude.height; 

    const newWalls = this.state.walls.map(wall => {
      if(dudeLeft + step < 200 && dir === 'x') {
        wall.x -= step;
      } else if (dudeRight + step > 600 && dir === 'x') {
        wall.x -= step;
      } else if (dudeTop + step < 150 && dir === 'y') {
        wall.y -= step;
      } else if (dudeBottom + step > 450 && dir === 'y') {
        wall.y -= step;
      }
      return wall;
    });

    this.setState({
      walls: newWalls
    });
  }

  render() {
    return (
      <Stage width={800} height={600}>
        <WallContainer walls={this.state.walls} />
        <ObstructionContainer obstructions={this.state.obstructions} />
        <Layer>
          <Dude position={this.state.dude} onMove={this.dudeMove} />
        </Layer>
      </Stage>
    )
  }
}; 

export default Cavern;
