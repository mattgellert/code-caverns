import React from 'react'; 
import {Layer, Rect} from 'react-konva'; 

class ObstructionContainer extends React.Component {
  render() {
    return (
      <Layer>
        <Rect 
          x={0}
          y={250}
          height={250}
          width={52}
          fill="red"
        />
      </Layer>
    )
  }
}; 

export default ObstructionContainer;
