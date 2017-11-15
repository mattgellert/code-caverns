import React from 'react';
import {Text, Image, Layer} from 'react-konva';

class ObstructionStonePegs extends React.Component {
  state = {
    passImage: null,
    image: null
  }

  componentDidMount() {
    const passImage = new window.Image(); 
    const image = new window.Image();
    image.src = 'https://i.imgur.com/fzhtoXd.png';
    passImage.src = 'https://i.imgur.com/h4goBro.png';

    image.onload = () => {
      this.setState({
        image
      });
    };

    passImage.onload = () => {
      this.setState({
        passImage
      });
    };
  }

  render() {
    let description = this.props.description;
    let text = [""];
    let line = 0;
    const spacer = "                               ";
    const chars = 60;
    const descriptionWords = description.split(" ")

    for (let i = 0; i < descriptionWords.length; i++) {
      if ((text[line] + descriptionWords[i]).length < 60) {
        text[line] += `${descriptionWords[i]} `;
      } else {
        line++;
        i--;
        text[line] = "";
      };
    };

    const descriptionFragments = text.map((fragment, idx) => {
      return (<Text
        x={110}
        y={500 - ((text.length - idx) * 30)}
        text={fragment}
        fontSize={20}
        padding={30}
        fontFamily="Calibri"
      />)
    });

    const currImage = this.props.pass ? this.state.passImage : this.state.image;
      
    return (
      <Layer>
        <Image x={150} y={0} image={currImage}/>
        {descriptionFragments}
      </Layer>
    );
  }
};

export default ObstructionStonePegs;