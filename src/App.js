import React, { useState } from 'react';
import './App.css';
import Board from './components/Board';
import GameInfo from './components/GameInfo';

function App() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const current = history[stepNumber];
  const winner = calculateWinner(current);
  const isDraw = !winner && current.every(square => square !== null);

  const handleClick = (i) => {
    const historyCopy = history.slice(0, stepNumber + 1);
    const currentCopy = [...current];
    
    if (calculateWinner(currentCopy) || currentCopy[i]) {
      return;
    }
    
    currentCopy[i] = xIsNext ? 'X' : 'O';
    setHistory([...historyCopy, currentCopy]);
    setStepNumber(historyCopy.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const resetGame = () => {
    setHistory([Array(9).fill(null)]);
    setStepNumber(0);
    setXIsNext(true);
  };

  return (
    <div className="app">
      <div className="game-container">
        <h1 className="game-title">TaTeTi</h1>
        <GameInfo 
          winner={winner} 
          isDraw={isDraw} 
          xIsNext={xIsNext} 
          onReset={resetGame}
        />
        <Board 
          squares={current} 
          onClick={handleClick}
          winner={winner}
        />
        <div className="game-history">
          <h3>Historial de Movimientos</h3>
          <div className="history-buttons">
            {history.map((step, move) => {
              const desc = move ? `Ir al movimiento #${move}` : 'Ir al inicio';
              return (
                <button
                  key={move}
                  className={`history-btn ${stepNumber === move ? 'active' : ''}`}
                  onClick={() => jumpTo(move)}
                >
                  {desc}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
