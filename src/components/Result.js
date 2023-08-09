import React from 'react';

const Result = ({ result, playerChoiceImage, computerChoiceImage }) => {
  return (
    <div>
      <div>
        <img src={playerChoiceImage} alt="Elección del jugador" />
      </div>
      <div>
        <img src={computerChoiceImage} alt="Elección de la computadora" />
      </div>
      <div>{result}</div>
    </div>
  );
};

export default Result;
