import React, { Component } from 'react'
import {Stage, Layer} from 'react-konva';
import Dude from './Dude.js';
import WallContainer from './WallContainer.js';
import CavernObstructionContainer from './CavernObstructionContainer.js';
import './Cavern.css'

export default class Cavern extends Component {


  render() {
    return(
      <div className="cavern">
        <Stage width={800} height={600}>
          <WallContainer walls={this.props.walls} />
          <CavernObstructionContainer challenges={this.props.challenges} />
          <Layer>
            <Dude position={this.props.position} onMove={this.props.onMove} />
          </Layer>
        </Stage>
      </div>
    )
  }
}
