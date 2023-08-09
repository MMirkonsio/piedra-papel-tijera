import React from 'react';

const RestartButton = ({ onRestart }) => {
  return (
    <button
      onClick={onRestart}
      className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      Volver a jugar
    </button>
  );
};

export default RestartButton;
