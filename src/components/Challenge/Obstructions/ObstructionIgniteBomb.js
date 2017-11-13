import React from 'react';
import {Text, Rect, Layer} from 'react-konva';


const ObstructionIgniteBomb = (props) => {

    const rocks = props.attempt.map((rock, idx) => (
      <Rect key={idx} x={((idx + 1) * 60)} y={200} width={50} height={(rock + 1) * -10} fill="#000000" />
    ));


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
        {rocks}
        {descriptionFragments}
      </Layer>
    );
};

export default ObstructionIgniteBomb;