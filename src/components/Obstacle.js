import React from 'react'; 
import {Rect} from 'react-konva';

class Obstacle extends React.Component {

  render() {
    
    return (
      <Rect 
        x={0}
        y={200}
        width={500}
        height={200}
        fill="#000000"
      />
    )
  }
}; 

export default Obstacle;