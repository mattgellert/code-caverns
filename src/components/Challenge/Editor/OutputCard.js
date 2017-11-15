import React from 'react';
import './OutputCard.css'

const OutputCard = ({output}) => {

  if (output === undefined) {
    output = "undefined"
  }

  return (
    <div className="output-card">
      Output: {output}
    </div>
  )
};

export default OutputCard;
