import React, { useState, useEffect } from 'react';

const Menu = ({ onStartGame }) => {
  const [numRounds, setNumRounds] = useState(1);
  const [checked, setChecked] = useState(localStorage.getItem("theme") === "dark" ? true : false);
  const [logoImage, setLogoImage] = useState(checked ? '/img/logopagelight.webp' : '/img/logopagedark.webp');
  const [showAlert, setShowAlert] = useState(false);
  const [nickname, setNickname] = useState(localStorage.getItem('playerNickname') || '');

  const handleNicknameChange = (event) => {
    setNickname(event.target.value);
  };

  useEffect(() => {
    document
      .getElementsByTagName("HTML")[0]
      .setAttribute("data-theme", localStorage.getItem("theme"));

    setLogoImage(checked ? '/img/logopagelight.webp' : '/img/logopagedark.webp');
  }, [checked]);

  const toggleThemeChange = () => {
    if (checked === false) {
      localStorage.setItem("theme", "dark");
      setChecked(true);
    } else {
      localStorage.setItem("theme", "light");
      setChecked(false);
    }
  };

  const handleStartGameClick = () => {
    if (nickname.trim() === '') {
      setShowAlert(true); // Mostrar la alerta si no hay apodo
    } else {
      setShowAlert(false); // Ocultar la alerta si hay un apodo
      onStartGame(numRounds, nickname);
    }
  };

  const isStartButtonDisabled = numRounds < 1;

  return (
    <div className="flex flex-col items-center justify-center">
      {showAlert && (
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">Por favor, ingresa un apodo antes de comenzar el juego.</span>
        </div>
      )}
      <div className={`flex flex-col items-center justify-center w-13 ${checked ? 'dark-mode' : ''}`} style={{ position: 'absolute', top: '20px' }}>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" checked={checked} onChange={toggleThemeChange} />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Modo Oscuro</span>
        </label>
      </div>
      <div className="flex items-center m-8">
        <img src={logoImage} alt="Logo del juego" className="w-300px" />
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Ingresa tu apodo"
          id="nickname"
          value={nickname}
          onChange={handleNicknameChange}
          className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <select
          className='text-black bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          value={numRounds}
          onChange={(e) => setNumRounds(Number(e.target.value))}
        >
          <option value={1}>1 Ronda</option>
          <option value={2}>2 Rondas</option>
          <option value={3}>3 Rondas</option>
          <option value={4}>4 Rondas</option>
          <option value={5}>5 Rondas</option>
        </select>
      </div>
      <button
        onClick={handleStartGameClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        disabled={isStartButtonDisabled}
      >
        Comenzar
      </button>
    </div>
  );
};

export default Menu;
