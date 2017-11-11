import React from 'react';
import {Image} from 'react-konva';

class Dude extends React.Component {
  state = {
    image: null
  };

  componentDidMount() {
    const image = new window.Image();
    image.src = 'http://konvajs.github.io/assets/yoda.jpg';
    image.onload = () => {
      this.setState({
        image: image
      });
    };
  };

  render() {
    // return (
    //
    // )
    return (
      <Image
        x={this.props.position.x}
        y={this.props.position.y}
        image={this.state.image}
        listening={true}
        height={30}
        width={30}
      />
    )
  };
};

export default Dude;
