import React, { useState } from 'react';

const Nickname = ({ onSubmitNickname }) => {
  const [nickname, setNickname] = useState('');

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  // Llama a onSubmitNickname directamente al cambiar el apodo
  // Esto enviará el apodo cuando el usuario termine de escribir
  onSubmitNickname(nickname);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <label className="text-xl font-semibold mb-2">Ingresa tu apodo:</label>
      <input
        type="text"
        value={nickname}
        onChange={handleNicknameChange}
        className="border border-gray-300 px-4 py-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-60 text-center"
        placeholder="Apodo"
      />
    </div>
  );
};

export default Nickname;
