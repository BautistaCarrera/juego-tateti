import React from 'react';
import './GameInfo.css';

function GameInfo({ winner, isDraw, xIsNext, onReset }) {
  const getStatus = () => {
    if (winner) {
      return `¡Ganador: ${winner}!`;
    } else if (isDraw) {
      return '¡Empate!';
    } else {
      return `Siguiente jugador: ${xIsNext ? 'X' : 'O'}`;
    }
  };

  const getStatusClass = () => {
    if (winner) return 'status winner';
    if (isDraw) return 'status draw';
    return 'status playing';
  };

  return (
    <div className="game-info">
      <div className={getStatusClass()}>
        {getStatus()}
      </div>
      
      <div className="player-indicators">
        <div className={`player ${xIsNext && !winner && !isDraw ? 'active' : ''}`}>
          <span className="player-symbol">X</span>
          <span className="player-label">Jugador 1</span>
        </div>
        <div className={`player ${!xIsNext && !winner && !isDraw ? 'active' : ''}`}>
          <span className="player-symbol">O</span>
          <span className="player-label">Jugador 2</span>
        </div>
      </div>

      {(winner || isDraw) && (
        <button className="reset-btn" onClick={onReset}>
          <span className="reset-icon">🔄</span>
          Jugar de nuevo
        </button>
      )}
    </div>
  );
}

export default GameInfo;
