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
      x: 500,
      y: 500
    },
    walls: [...wallData],
    obstructions: [...obstructionData]
  }

  componentDidMount() {
    this.attachKeyListener();
  }

  attachKeyListener = () => {
    document.addEventListener('keydown', (e) => {
      e.preventDefault(); 
      this.dudeMove(e.which, 20);
    })
  }


  dudeMove = (dir, step) => {
    let newObj;

    switch(dir) {
      case 37: newObj = {x: this.state.dude.x - step}; break; 
      case 38: newObj = {y: this.state.dude.y - step}; break;
      case 39: newObj = {x: this.state.dude.x + step}; break; 
      case 40: newObj = {y: this.state.dude.y + step}; break; 
      default: break; 
    }

    this.setState({
      dude: {
        ...this.state.dude, 
        ...newObj
      }
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
