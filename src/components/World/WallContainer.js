import React from 'react'; 
import {Rect, Layer} from 'react-konva'; 

class WallContainer extends React.Component {
  render() {
    return (
      <Layer>
        <Rect 
          x={0}
          y={0}
          width={52}
          height={250}
          fill="#fff203"
        />

        <Rect 
          x={0}
          y={500}
          width={52}
          height={250}
          fill="#fff203"
        />
        <Rect 
          x={1348}
          y={0}
          width={52}
          height={750}
          fill="#fff203"
        />
      </Layer> 
    )
  }
}; 

export default WallContainer;