import React from 'react';
import './Square.css';

function Square({ value, onClick, isWinning }) {
  return (
    <button 
      className={`square ${isWinning ? 'winning' : ''} ${value ? 'filled' : ''}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
}

export default Square;
