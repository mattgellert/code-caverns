import React, { Component } from 'react'
import {Stage, Layer, Rect, Shape} from 'react-konva';
import Dude from './Dude.js';
import WallContainer from './WallContainer.js';
import CavernObstructionContainer from './CavernObstructionContainer.js';
import './Cavern.css'

export default class Cavern extends Component {

  state = {
    backgroundImage: null
  }

  componentDidMount() {
    const backgroundImage = new window.Image();
    backgroundImage.src = 'https://i.imgur.com/2b1AT0M.png';
    backgroundImage.onload = () => {
      this.setState({
        backgroundImage: backgroundImage
      });
    };
  }

  render() { //STILL IN PROGRESS
    return(
      <div className="cavern">
        <Stage width={800} height={600} visible={true}>
          <Layer>
            <Rect
              width={1920}
              height={2560}
              fillPatternImage={this.state.backgroundImage}
            />
          </Layer>
          <WallContainer walls={this.props.walls} />
          <CavernObstructionContainer challenges={this.props.challenges} />
          <Layer>
            <Dude dude={this.props.dude} image={this.props.image} onMove={this.props.onMove} onSpriteRef={this.props.handleSpriteRef}/>
          </Layer>
        </Stage>
        <br/>
        <br/>
        <br/>
        <br/>
      </div>
    )
  }
}

// <Rect width={800} height={600} fill='#583b87'/>
