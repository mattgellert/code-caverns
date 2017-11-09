import React from 'react'; 
import {Stage, Layer} from 'react-konva'; 
import Dude from './Dude'; 
import WallContainer from './WallContainer'; 
import ObstructionContainer from './ObstructionContainer';
import ChallengeContainer from '../ChallengeContainer'; 

class Cavern extends React.Component {
  render() {
    return (
      <Stage width={1400} height={750}>
        <WallContainer />
        <ObstructionContainer />
        <Layer>
          <Dude />
        </Layer>
      </Stage>
    )
  }
}; 

export default Cavern;
