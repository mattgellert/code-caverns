import React from 'react';
import {Layer, Rect} from 'react-konva';

export default class CavernObstructionContainer extends React.Component {
  render() {
    const obstructionElements = this.props.challenges.map( ({obstruction}) => {
      const {x, y, width, height, fill} = obstruction;
      return (
        <Rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={fill}
        />
      );
    });

    return (
      <Layer>
        {obstructionElements}
      </Layer>
    );
  };
};
