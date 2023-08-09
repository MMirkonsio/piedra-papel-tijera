import React from 'react';

const ChoiceButton = ({ choice, onClick }) => {
  return (
    <div className="flex flex-col items-center">
      <button
        onClick={() => onClick(choice)}
        className="p-4 rounded-md hover:bg-gray-200 transition duration-300 ease-in-out"
        
      >
        <img src={`/img/${choice.image}`} alt={choice.name} className="w-16 h-16" />
      </button>
      <p className="mt-2 text-gray-400">{choice.name}</p>
    </div>
  );
};

export default ChoiceButton;
