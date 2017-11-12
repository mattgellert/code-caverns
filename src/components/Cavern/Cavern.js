import React, { Component } from 'react'
import {Stage, Layer, Rect, Shape} from 'react-konva';
import Dude from './Dude.js';
import WallContainer from './WallContainer.js';
import CavernObstructionContainer from './CavernObstructionContainer.js';
import './Cavern.css'

export default class Cavern extends Component {

  state = {
    shadowImage: null
  }

  componentDidMount() {
    const shadowImage = new window.Image();
    shadowImage.src = 'https://i.imgur.com/2tC455y.png';
    shadowImage.onload = () => {
      this.setState({
        shadowImage: shadowImage
      });
    };
  }

  render() { //STILL IN PROGRESS
    return(
      <div className="cavern">
        <Stage width={800} height={600} visible={true}>
          <Layer>
            <Rect
              offsetX={-960}
              offsetY={-1280}
              width={1920}
              height={2560}
              fillPatternImage={this.state.shadowImage}
            />
          </Layer>
          <WallContainer walls={this.props.walls} />
          <CavernObstructionContainer challenges={this.props.challenges} />
          <Layer>
            <Dude dude={this.props.dude} image={this.props.image} onMove={this.props.onMove} onSpriteRef={this.props.handleSpriteRef}/>
          </Layer>
        </Stage>
      </div>
    )
  }
}

// <Rect width={800} height={600} fill='#583b87'/>
