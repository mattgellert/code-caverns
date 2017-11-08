import React from 'react'; 
import {Rect, Layer} from 'react-konva';


const ObstacleSortRocks = ({attempt}) => {

    const rocks = attempt.map((rock, idx) => (
      <Rect key={idx} x={((idx + 1) * 60)} y={200} width={50} height={(rock + 1) * -10} fill="#000000" />
    ))

    return (
      <Layer>
        {rocks}       
      </Layer>
    )
}; 

export default ObstacleSortRocks;