import React from 'react';
import {Rect, Layer} from 'react-konva';

class WallContainer extends React.Component {

  state = {
    wallImage: null
  }

  componentDidMount() {
    const wallImage = new window.Image();
    wallImage.src = 'https://i.imgur.com/5UAVZp1.png';
    wallImage.onload = () => {
      this.setState({
        wallImage: wallImage
      });
    };
  }

  render() {
    const wallElements = this.props.walls.map(({x, y, width, height, fill}) => {
      let rotation = height > width ? 90 : 0;

        return(
          <Rect
            x={x}
            y={y}
            width={width}
            height={height}
            fillPatternImage={this.state.wallImage}
            fillPatternRotation={rotation}
          />
        );
    });

    return (
      <Layer>
        {wallElements}
      </Layer>
    )
  }
};

export default WallContainer;
