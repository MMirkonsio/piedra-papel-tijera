import onSubmitNickname from './Nickname'

export const calculateWinner = (roundResults) => {
    let playerWins = 0;
    let computerWins = 0;
  
    roundResults.forEach((result) => {
      if (result === 'Ganaste') {
        playerWins++;
      } else if (result === 'Perdiste') {
        computerWins++;
      }
    });
  
    if (playerWins > computerWins) {
      return onSubmitNickname;
    } else if (computerWins > playerWins) {
      return 'computer';
    } else {
      return 'empate';
    }
  };
  