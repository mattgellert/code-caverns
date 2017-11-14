import React from 'react';
import {Text, Rect, Layer} from 'react-konva';


const ObstructionReverseString = (props) => {

    let description = props.description;
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
        {descriptionFragments}
      </Layer>
    );
};

export default ObstructionReverseString;