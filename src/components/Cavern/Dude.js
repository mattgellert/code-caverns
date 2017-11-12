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
      width={32}
      height={32}
      ref='sprite'
      image={this.props.image}
      animation={this.props.dude.direction}
      animations={{
        idle: [ 0,0,320,320,320,0,320,320,640,0,320,320,960,0,320,320,1280,0,320,320,1600,0,320,320,1920,0,320,320,2240,0,320,320 ],
        right: [ 2560,0,320,320,2880,0,320,320,3200,0,320,320,3520,0,320,320,3840,0,320,320,4160,0,320,320,4480,0,320,320,4800,0,320,320 ],
        left: [ 5120,0,320,320,5440,0,320,320,5760,0,320,320,6080,0,320,320,6400,0,320,320,6720,0,320,320,7040,0,320,320,7360,0,320,320 ],
        down: [ 7680,0,320,320,8000,0,320,320,8320,0,320,320,8640,0,320,320,8960,0,320,320,9280,0,320,320,9600,0,320,320,9920,0,320,320 ],
        up: [ 10240,0,320,320,10560,0,320,320,10880,0,320,320,11200,0,320,320,11520,0,320,320,11840,0,320,320,12160,0,320,320,12480,0,320,320 ]
      }}
      frameRate={null}
      frameIndex={index}
      />
    );
  };
};

export default Dude;
