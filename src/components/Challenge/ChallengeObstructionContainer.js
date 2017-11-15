import {Stage} from 'react-konva';
import React from 'react';
import ObstructionSortRocks from './Obstructions/ObstructionSortRocks.js';
import ObstructionIgniteBomb from './Obstructions/ObstructionIgniteBomb.js';
import ObstructionReverseString from './Obstructions/ObstructionReverseString.js';
import ObstructionCircleOfStones from './Obstructions/ObstructionCircleOfStones.js';
import ObstructionPitOfSnakes from './Obstructions/ObstructionPitOfSnakes.js';
import ObstructionItemWeights from './Obstructions/ObstructionItemWeights.js'; 
import ObstructionStonePegs from './Obstructions/ObstructionStonePegs.js';

export default class ChallengeObstructionContainer extends React.Component {


  getObstacle(challengeName) { //add case for each additional obstacle (and import it)
    let obstacle;
    switch (challengeName) {
      case 'sortRocks':
        obstacle = <ObstructionSortRocks pass={this.props.pass} description={this.props.description} attempt={this.props.attempt}/>
        break;
      case 'igniteBomb':
        obstacle = <ObstructionIgniteBomb pass={this.props.pass} description={this.props.description} attempt={this.props.attempt}/>
        break;
      case 'stringReverse':
        obstacle = <ObstructionReverseString pass={this.props.pass} description={this.props.description} attempt={this.props.attempt}/>
        break; 
      case 'circleOfStones':
        obstacle = <ObstructionCircleOfStones pass={this.props.pass} description={this.props.description} attempt={this.props.attempt}/>
        break; 
      case 'pitOfSnakes':
        obstacle = <ObstructionPitOfSnakes pass={this.props.pass} description={this.props.description} attempt={this.props.attempt}/>
        break;
      case 'itemWeights': 
        obstacle = <ObstructionItemWeights pass={this.props.pass} description={this.props.description} attempt={this.props.attempt}/>
        break; 
      case 'stonePegs':
        obstacle = <ObstructionStonePegs pass={this.props.pass} description={this.props.description} attempt={this.props.attempt}/>
        break;
      default:
        console.log('default obstacle');
        break;
    };
    return obstacle;
  };

  render() {
    const obstacle = this.getObstacle(this.props.challenge);
    return (
      <div className='obstacle-container'>
        <Stage width={window.innerWidth - 600} height={800}>
          {obstacle}
        </Stage>
      </div>
    );
  };
};
