import React, { Component } from 'react';
import { Stage, Layer, Sprite } from 'react-konva';

export default class FinalAnimation extends Component {


  state = {
    image: null,
    sprite: null
  };


  componentDidMount() {
    const image = new window.Image();
    image.src = 'https://i.imgur.com/xs8iG2m.png'; // Animation sprite sheet
    image.onload = () => {
      this.setState({
        image: image,
        sprite: this.refs.sprite
      }, () => {this.state.sprite.start();});
    };
  };

  makeAnimationArray = () => {
    let arr = [];
    let xCount = 0;
    let yCount = 0;

    for (let i = 0; i < 11; i++) {
      yCount += 600;
      xCount = 0;
      for (let j = 0; j < 10; j++) {
          arr.push(xCount, yCount, 800, 600)
          xCount += 800;
      };
    };
    return arr;
  };

  render() {
    const animationArray = this.makeAnimationArray();
    const animation = "play";

    return (
      <Stage width={800} height={600}>
        <Layer>
          <Sprite
            x={0}
            y={0}
            ref='sprite'
            image={this.state.image}
            animation={animation}
            animations={{
              play: animationArray
            }}
            frameRate={7}
            frameIndex={0}
          />
        </Layer>
      </Stage>
    );
  };
};
