import React from 'react';
import {Layer, Image} from 'react-konva';

export default class CavernObstructionContainer extends React.Component {
  state = {
    obstructionImages: {}
  }

  componentDidMount() {
    this.props.challenges.forEach( (challenge) => {
      const {imageURL} = challenge.obstruction;
      const {name} = challenge
      const image = new window.Image();

      image.onload = () => {
        this.setState({
          obstructionImages: {
            ...this.state.obstructionImages,
            [name]: image
          }
        });
      };

      image.src = imageURL;
    })
  };

  render() {
    const obstructionElements = this.props.challenges.map( (challenge) => {
      const {x, y, width, height} = challenge.obstruction;
      return (
        <Image
          x={x}
          y={y}
          width={width}
          height={height}
          image={this.state.obstructionImages[challenge.name]}
        />
      );
    });


    return (
      <Layer>
        {obstructionElements}
      </Layer>
    );
  };
};
