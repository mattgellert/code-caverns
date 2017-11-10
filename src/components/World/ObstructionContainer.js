import React from 'react';
import {Layer, Rect} from 'react-konva';

class ObstructionContainer extends React.Component {
  render() {
    const obstructionElements = this.props.obstructions.map( ({x, y, width, height, fill}) => {
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
        {obstructionElements}
      </Layer>
    )
  }
};

export default ObstructionContainer;
