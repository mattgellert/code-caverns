import React from 'react';
import {Rect, Layer} from 'react-konva';

class WallContainer extends React.Component {

  render() {
    const wallElements = this.props.walls.map(({x, y, width, height, fill}) => {
      return (
        <Rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={fill}
        />
      )
    });

    return (
      <Layer>
        {wallElements}
      </Layer>
    )
  }
};

export default WallContainer;
