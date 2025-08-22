import React, { useState, useEffect } from 'react';
import './App.css';
import Board from './components/Board';
import GameInfo from './components/GameInfo';
import ScoreBoard from './components/ScoreBoard';

function App() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });

  // Cargar puntuaciones guardadas al iniciar
  useEffect(() => {
    const savedScores = localStorage.getItem('tateTiScores');
    if (savedScores) {
      setScores(JSON.parse(savedScores));
    }
  }, []);

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

  // Actualizar puntuaciones cuando hay un ganador o empate
  useEffect(() => {
    if (winner || isDraw) {
      const newScores = { ...scores };
      if (winner) {
        newScores[winner]++;
      } else if (isDraw) {
        newScores.draws++;
      }
      setScores(newScores);
      localStorage.setItem('tateTiScores', JSON.stringify(newScores));
    }
  }, [winner, isDraw]);

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

  const resetGame = () => {
    setHistory([Array(9).fill(null)]);
    setStepNumber(0);
    setXIsNext(true);
  };

  const resetScores = () => {
    const newScores = { X: 0, O: 0, draws: 0 };
    setScores(newScores);
    localStorage.setItem('tateTiScores', JSON.stringify(newScores));
  };

  return (
    <div className="app">
      <div className="game-container">
        <h1 className="game-title">TaTeTi</h1>
        
        <div className="game-main">
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
          <ScoreBoard 
            scores={scores} 
            onReset={resetScores}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
