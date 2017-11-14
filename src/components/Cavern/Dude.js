import React from 'react';
import {Sprite} from 'react-konva';

class Dude extends React.Component {

  componentDidMount() {
    this.props.onSpriteRef(this.refs.sprite);
    this.frameIndex = 0;
    this.frameCounter = 0;
    this.directionChange = false;
  };

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.dude.direction !== this.props.dude.direction) {
      this.directionChange = true;
      this.frameIndex = 0;
    } else {
      this.directionChange = false;
    };
  };

  getFrameIndex = () => {
    if (!this.directionChange && this.frameCounter === 3) {
      this.frameIndex++;
    } else {
      if (this.frameCounter < 3) {
        this.frameCounter++;
      } else {
        this.frameCounter = 0;
      };
    };
    if (this.frameIndex > 8) {
      this.frameIndex = 0;
    };
    return this.frameIndex;
  };

  render() {
    const index = this.getFrameIndex();

    return (
      <Sprite
      x={this.props.dude.x}
      y={this.props.dude.y}
      ref='sprite'
      image={this.props.image}
      animation={this.props.dude.direction}
      animations={{
        idle: [ 0,0,64,64,64,0,64,64,128,0,64,64,192,0,64,64,256,0,64,64,320,0,64,64,384,0,64,64,448,0,64,64 ],
        right: [ 512,0,64,64,576,0,64,64,640,0,64,64,704,0,64,64,768,0,64,64,832,0,64,64,896,0,64,64,960,0,64,64 ],
        left: [ 1024,0,64,64,1088,0,64,64,1152,0,64,64,1216,0,64,64,1280,0,64,64,1344,0,64,64,1408,0,64,64,1472,0,64,64 ],
        down: [ 1536,0,64,64,1600,0,64,64,1664,0,64,64,1728,0,64,64,1792,0,64,64,1856,0,64,64,1920,0,64,64,1984,0,64,64 ],
        up: [ 2048,0,64,64,2112,0,64,64,2176,0,64,64,2240,0,64,64,2304,0,64,64,2368,0,64,64,2432,0,64,64,2496,0,64,64 ]
      }}
      frameRate={null}
      frameIndex={index}
      />
    );
  };
};

export default Dude;
//
// let makeTheRIGHTArrays= () => {
//   let arr = {
//     0: [],
//     1: [],
//     2: [],
//     3: [],
//     4: []
//   }
//   let masterArr = [];
//   let bullshit = 0;
//
//   for (let i = 0; i < 5; i++) {
//     for (let j = 0; j < 8; j++) {
//         arr[i].push(bullshit, 0, 160, 160)
//         bullshit += 160;
//     }
//   }
//   for (let l = 0; l < 5; l++) {
//     masterArr.push(arr[l])
//   }
//   return masterArr
// }
// let makeArrays= () => {
//   let arr = []
//   let xCount = 0;
//   let yCount = 0;
//
//   for (let i = 0; i < 11; i++) {
//     yCount += 600;
//     xCount = 0;
//     for (let j = 0; j < 10; j++) {
//         arr.push(xCount, yCount, 800, 600)
//         xCount += 800;
//     }
//   }
//   return arr
// }
