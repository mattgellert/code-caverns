import React, { Component } from 'react';
import { Stage, Layer, Sprite } from 'react-konva';
import './FinalAnimation.css'

export default class FinalAnimation extends Component {


  state = {
    image: null,
    sprite: null,
    animationComplete: false
  };


  componentDidMount() {
    console.log("Final Animation CDM")
    document.getElementsByClassName("app-title")[0].scrollIntoView()
    const image = new window.Image();
    image.src = 'https://i.imgur.com/xs8iG2m.png'; // Animation sprite sheet
    image.onload = () => {
      this.setState({
        image: image,
        sprite: this.refs.sprite
      }, () => {
        this.state.sprite.start();
        setTimeout(() => {
          this.state.sprite.stop();
          this.setState({
            animationComplete: true
          });
        }, 16000);
      });
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

  redirectToStory = () => {
    this.props.history.push("/story")
  };

  render() {
    const animationArray = this.makeAnimationArray();
    const animation = "play";

    return (
      <div className="final-animation-wrapper">
          {this.state.animationComplete && !this.props.challengeId
            ?
              <div className="modal" id="pauseModel">
                <div className="modal-content">
                  <p className="modal-text">If you're done playing, enter your username and click save!</p>
                  <form className="modal-form" onSubmit={this.props.onSaveGameFromQuit}>
                    <input className="input" type="text" onChange={this.props.onUsernameOnQuit} value={this.props.usernameOnQuit}/>
                    <input className="modal-save" type="submit" value="Save"/>
                  </form>
                  <button className="skip" onClick={this.redirectToStory}>Skip Save</button>
                </div>
              </div>
            : this.state.animationComplete && this.props.challengeId
            ? <button className="leave-cavern" onClick={this.props.onSaveGameFromQuit}>Leave the Cave!</button>
            : null
          }
        <div className="stage-wrapper">
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
        </div>
      </div>
    );
  };
};
