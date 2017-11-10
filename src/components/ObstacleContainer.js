import {Stage} from 'react-konva';
import React from 'react';
import ObstacleSortRocks from './ObstacleSortRocks';

export default class ObstacleContainer extends React.Component {


  getObstacle(challengeName) { //add case for each additional obstacle (and import it)
    let obstacle;
    switch (challengeName) {
      case "sortRocks":
        obstacle = <ObstacleSortRocks attempt={this.props.attempt}/>
        break;
      default:
        console.log('default obstacle')
        break;
    };
    return obstacle
  }

  render() {

    const obstacle = this.getObstacle(this.props.challenge)
    return (
      <div className='obstacle-container'>
        <Stage width={1000} height={800}>
          {obstacle}
        </Stage>
      </div>
    )
  }
};
