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
    this.mapX = -1100;
    this.mapY = -900;
    this.mapCount = 0;
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

  flickerLights = () => {
    let shadow = {};
    let negative = 0;
    Math.random() > 0.5 ? negative = -1 : negative = 1;

    return shadow = {
      x: (this.props.dudeDeltaX - 625) + (negative * (4 * Math.random())),
      y: (this.props.dudeDeltaY - 585) + (negative * (4 * Math.random())),
      width: (2050 - (negative * (4 * Math.random()))),
      height: (1750 - (negative * (4 * Math.random())))
    }
  };

  render() {
    const shadow = this.flickerLights();

    if (this.mapCount === 3) {
      this.mapX -= (this.props.updatedMapX)
      this.mapY -= (this.props.updatedMapY)
      this.mapCount = 0;
    }
    this.mapCount++;

    return(
      <div className="cavern">
        <Stage width={800} height={600}>
          <Layer>
            <Rect
              width={2400}
              height={2400}
              fillPatternImage={this.state.backgroundImage}
              x={this.mapX}
              y={this.mapY}
            />
          </Layer>
          <WallContainer walls={this.props.walls} />
          <CavernObstructionContainer challenges={this.props.challenges} />
          <Layer>
            <Dude dude={this.props.dude} image={this.props.image} onMove={this.props.onMove} onSpriteRef={this.props.handleSpriteRef}/>
          </Layer>
          <Layer>
            <Rect
              width={shadow.width}
              height={shadow.height}
              fillPatternImage={this.state.shadowImage}
              x={shadow.x}
              y={shadow.y}
            />
          </Layer>
        </Stage>
        <br/>
        <br/>
        <br/>
        <br/>
      </div>
    );
  };
};

// <Rect width={800} height={600} fill='#583b87'/>
