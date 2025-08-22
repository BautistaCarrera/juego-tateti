import React from 'react';
import './Square.css';

function Square({ value, onClick, isWinning, winningColor }) {
  const style = isWinning && winningColor ? { 
    '--winning-color': winningColor,
    '--winning-border-color': value === 'X' ? 'rgba(244, 67, 54, 0.5)' : 'rgba(33, 150, 243, 0.5)'
  } : {};
  
  return (
    <button 
      className={`square ${isWinning ? 'winning' : ''} ${value ? 'filled' : ''}`}
      onClick={onClick}
      data-value={value}
      aria-label={`Casilla ${value ? `con ${value}` : 'vacía'}`}
      disabled={!!value}
      style={style}
    >
      {value}
    </button>
  );
}

export default Square;
