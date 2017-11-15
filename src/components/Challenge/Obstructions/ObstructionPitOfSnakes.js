import React from 'react';
import {Text, Image, Layer} from 'react-konva';


class ObstructionPitOfSnakes extends React.Component {
  state = {
    image: null
  }

  componentDidMount() {
    const image = new window.Image(); 
    image.onload = () => {
      this.setState({
        image
      });
    };
    image.src = 'https://i.imgur.com/GrTOgIP.png'; 
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

    return (
      <Layer>
        <Image x={150} y={0} image={this.state.image}/>
        {descriptionFragments}
      </Layer>
    );
  }
};

export default ObstructionPitOfSnakes;