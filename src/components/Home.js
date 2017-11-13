import React, { Component } from 'react';
import { Stage, Layer, Sprite } from 'react-konva';
import './Home.css';

export default class Home extends Component {

  state = {
    johann: null,
    sprite: null
  }

  componentDidMount() {
    const image = new window.Image();
    image.onload = () => {
      this.setState({
        johann: image,
        sprite: this.refs.sprite
      }, () => {this.state.sprite.start()});
    };
    image.src = 'https://i.imgur.com/niJHc37.png';
  };

  render() {
    return (
      <div className="home">
      <Stage width={160} height={160}>
        <Layer>
          <Sprite
            x={0}
            y={0}
            ref='sprite'
            image={this.state.johann}
            animation={"down"}
            animations={{
              down: [ 0,0,160,160,160,0,160,160,320,0,160,160,480,0,160,160,640,0,160,160,800,0,160,160,960,0,160,160,1120,0,160,160 ]
            }}
            frameRate={7}
            frameIndex={0}
          />
        </Layer>
      </Stage>
      <br/>
      <div className="home-body-wrapper">
      <div className="home-body-spacer"/>
      <div className="home-body">
      <p className="intro"> This is the untold story of Johann Westhauser, who was trapped 1,000 meters below ground while exploring Germany's deepest and longest cavern. The labyrinth-like Riesending cave complex.</p>
      <br/>
      <br/>
      <p className="intro">Your mission, should you choose to accept it, is to guide Johann out of the depths of the cavern. He has fallen to uncharted territory, and the obstacles he must overcome are not quite what you'd expect almost a mile below the surface...</p>
      <br/>
      <br/>
      <p className="intro">Will Johann escape?</p>
      <br/>
      <br/>
      <div className="enter-wrapper">
      <button className="enter">Enter the Cavern...</button>
      </div>
      </div>
      <div className="home-body-spacer"/>
      </div>
      </div>
    );
  };
};
