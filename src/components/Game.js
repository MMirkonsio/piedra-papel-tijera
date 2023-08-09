import React, { useState, useEffect, useCallback } from 'react';
import ChoiceButton from './ChoiceButton';
import Menu from './Menu';
import '../index.css';


const choices = [
  { name: 'Piedra', image: 'piedra.webp' },
  { name: 'Papel', image: 'papel.webp' },
  { name: 'Tijera', image: 'tijera.webp' },
];


const Game = () => {
  const [playerNickname, setPlayerNickname] = useState('');
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState('');
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const [currentRound, setCurrentRound] = useState(1);
  const [numRounds, setNumRounds] = useState(1);
  const [showNextRoundButton, setShowNextRoundButton] = useState(false);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);

  const handleChoice = useCallback((choice) => {
    if (!buttonsVisible) return;

    setComputerChoice(null);
    setResult('');

    const computerRandomChoice = choices[Math.floor(Math.random() * choices.length)];
    setComputerChoice(computerRandomChoice);

    const roundResult = getResult(choice?.name, computerRandomChoice.name);
    setResult(roundResult);

    setShowNextRoundButton(true);
    setButtonsVisible(false);
    setPlayerChoice(choice);

    // No actualices los puntajes aquí
  }, [buttonsVisible]);

  const handleNextRound = () => {
    setShowNextRoundButton(false);
    setCurrentRound(currentRound + 1);
    setComputerChoice(null);
    setButtonsVisible(true);
    setPlayerChoice(null);
    setResult('');
    // No reinicies los puntajes aquí
  };

  const handleRestart = () => {
    setCurrentRound(1);
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult('');
    setIsMenuVisible(true);
    setButtonsVisible(false);
    // No reinicies los puntajes aquí
  };

  useEffect(() => {
    if (currentRound > numRounds) {
      setIsMenuVisible(false);
      setShowNextRoundButton(false);
    }
  }, [currentRound, numRounds]);

  useEffect(() => {
    // Reiniciar los puntajes al comenzar una nueva partida
    setPlayerScore(0);
    setComputerScore(0);
  }, [isMenuVisible]);

  useEffect(() => {
    if (computerChoice && playerChoice) {
      const rotateTimer = setTimeout(() => {
        const roundResult = getResult(playerChoice.name, computerChoice.name);
        // Actualizar los puntajes después de mostrar el resultado
        if (roundResult === 'Ganaste') {
          setPlayerScore(prevPlayerScore => prevPlayerScore + 10);
        } else if (roundResult === 'Empate') {
          setPlayerScore(prevPlayerScore => prevPlayerScore + 5);
          setComputerScore(prevComputerScore => prevComputerScore + 5);
        } else {
          setComputerScore(prevComputerScore => prevComputerScore + 10);
        }

        const delayToShowResult = roundResult === 'Empate' ? 0 : 1000;
        setTimeout(() => {
          setResult(roundResult);
        }, delayToShowResult);
      }, 100);

      return () => clearTimeout(rotateTimer);
    }
  }, [computerChoice, playerChoice]);



  useEffect(() => {
    if (!isMenuVisible) {
      setButtonsVisible(true);
      setComputerChoice(null);
      setResult('');
      setPlayerChoice(null);
      setShowNextRoundButton(false);
      setCurrentRound(1); // Reset the current round
    }
  }, [isMenuVisible]);


  const handleStartGame = (selectedNumRounds,nickname) => {
    setNumRounds(selectedNumRounds);
    setCurrentRound(1); // Reset the current round
    setIsMenuVisible(false);
    setPlayerNickname(nickname);
  };

  useEffect(() => {
    if (currentRound > numRounds) {
      setIsMenuVisible(false);
      setShowNextRoundButton(false);
    }
  }, [currentRound, numRounds]);


  const getResult = (player, computer) => {
    if (player === computer) return 'Empate';
    if (
      (player === 'Piedra' && computer === 'Tijera') ||
      (player === 'Papel' && computer === 'Piedra') ||
      (player === 'Tijera' && computer === 'Papel')
    ) {
      return 'Ganaste';
    }
    return 'Perdiste';
  };

  return (
      <div className="flex flex-col items-center justify-center w-full">
      {isMenuVisible ? (
        <Menu onStartGame={handleStartGame} />
      ) : (
        <>
          <div className="text-5xl font-bold">
            {currentRound <= numRounds ? `Ronda ${currentRound} de ${numRounds}` : 'Fin del Juego'}
          </div>
          {currentRound <= numRounds ? (
            <div>
              {showNextRoundButton && (
                <button
                  onClick={handleNextRound}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 focus:outline-none focus:shadow-outline"
                >
                  Siguiente Ronda
                </button>
              )}
              {!showNextRoundButton && (
                <div className="flex justify-center items-center space-x-4 mt-4">
                  {buttonsVisible &&
                    choices.map((choice) => (
                      <ChoiceButton key={choice.name} choice={choice} onClick={() => handleChoice(choice)} />
                    ))}
                </div>
              )}
            </div>
          ) : (
            <div className='text-left m-3'>
                <div className='text-3xl-custom m-3'>
                <p>{playerNickname}: <span className='text-yellow-500'>{playerScore} Puntos</span></p>
                <p>Bot: <span className='text-yellow-500'>{computerScore} Puntos</span></p>
                <p className='text-green-600'>Ganador: {playerScore > computerScore ? playerNickname : 'Bot'}</p>
                </div>
                <button
                  onClick={handleRestart}
                  className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 focus:outline-none focus:shadow-outline"
                >
                  Volver a jugar
                </button>
            </div>
        )}
          {playerChoice && computerChoice && (
            <div className="flex items-center">
              <div
                className="flex flex-col items-center transition-transform"
              >
                <img
                  src={`/img/${playerChoice.image}`}
                  alt="Elección del jugador"
                  className="object-contain"
                />
                <p className="text-2xl font-bold mt-2">
                  {playerNickname}
                </p>
              </div>
              <div className="mx-8">
                <span
                  className={`text-3xl font-bold ${
                    result === 'Ganaste'
                      ? 'text-green-600'
                      : result === 'Empate'
                      ? 'text-yellow-500'
                      : 'text-red-600'
                  } grid`}
                >
                  {`Elegiste ${playerChoice.name}, El Bot eligió ${computerChoice.name}. `}
                  <span
                    className={`${
                      result === 'Ganaste'
                        ? 'text-green-600 text-5xl'
                        : result === 'Empate'
                        ? 'text-yellow-500 text-5xl'
                        : 'text-red-600 text-5xl'
                    }`}
                  >
                    {result}
                  </span>
                </span>
              </div>
              <div
                className="flex flex-col items-center transition-transform"
                id="bot-image"
              >
                <img
                  src={`/img/${computerChoice.image}`}
                  alt="Elección del Bot"
                  className="object-contain"
                />
                <p className="text-2xl font-bold mt-2">Bot</p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};


export default Game;