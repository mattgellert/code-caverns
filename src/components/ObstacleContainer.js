import {Stage} from 'react-konva';
import React from 'react';
import ObstacleSortRocks from './ObstacleSortRocks';

export default class ObstacleContainer extends React.Component {


  getObstacle(challengeName) {
    let obstacle;
    switch (challengeName) {
      case "sortRocks(array)":
        obstacle = <ObstacleSortRocks attempt={this.props.attempt}/>
        break;
      default:
        console.log('default obstacle')
        break;
    };
    return obstacle
  }

  onQuit = (e) => {
    this.props.onQuit();
  };

  onPass = (e) => {
    this.props.onPass();
  };

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
