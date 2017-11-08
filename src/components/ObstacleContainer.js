import {Stage, Layer} from 'react-konva';
import React from 'react'; 
import Obstacle from './Obstacle'; 

class ObstacleContainer extends React.Component {
  render() {

    return (
      <Stage width={500} height={800}>
        <Layer> 
          <Obstacle />
        </Layer> 
      </Stage>
    )
  }
}; 

export default ObstacleContainer;