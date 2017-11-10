import React, { Component } from 'react'
import {Stage, Layer} from 'react-konva';
import Dude from './Dude';
import WallContainer from './WallContainer';
import ObstructionContainer from './ObstructionContainer';

export default class Cavern extends Component {
  render() {
    return(
      <Stage width={800} height={600}>
        <WallContainer walls={this.props.walls} />
        <ObstructionContainer obstructions={this.props.obstructions} />
        <Layer>
          <Dude position={this.props.position} onMove={this.props.onMove} />
        </Layer>
      </Stage>
    )
  }
}
