import React, { Component } from 'react'
import {Stage, Layer, Rect, Shape, Image} from 'react-konva';
import Dude from './Dude.js';
import WallContainer from './WallContainer.js';
import CavernObstructionContainer from './CavernObstructionContainer.js';
import './Cavern.css'

export default class Cavern extends Component {

  state = {
    backgroundImage: null,
    shadowImage: null
  }

  componentDidMount() {
    const backgroundImage = new window.Image();
    const shadowImage = new window.Image();
    backgroundImage.src = 'https://i.imgur.com/2b1AT0M.png';
    shadowImage.src = 'https://i.imgur.com/J7rZYD0.png';


    backgroundImage.onload = () => {
      this.setState({
        backgroundImage: backgroundImage
      });
    };
    shadowImage.onload = () => {
      this.setState({
        shadowImage: shadowImage
      });
    };
  }

  render() { //STILL IN PROGRESS
    const shadowX = this.props.dudeDeltaX - 625;
    const shadowY = this.props.dudeDeltaY - 585;
    console.log(this.state.shadowImage)
    return(
      <div className="cavern">
        <Stage width={800} height={600}>
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
          <Layer>
            <Rect
              width={2050}
              height={1750}
              fillPatternImage={this.state.shadowImage}
              x={shadowX}
              y={shadowY}
            />
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
