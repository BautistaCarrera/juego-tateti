import React from 'react';
import './ScoreBoard.css';

function ScoreBoard({ scores, onReset }) {
  const totalGames = scores.X + scores.O + scores.draws;
  const xPercentage = totalGames > 0 ? Math.round((scores.X / totalGames) * 100) : 0;
  const oPercentage = totalGames > 0 ? Math.round((scores.O / totalGames) * 100) : 0;
  const drawPercentage = totalGames > 0 ? Math.round((scores.draws / totalGames) * 100) : 0;

  return (
    <div className="score-board">
      <div className="score-header">
        <h3>🏆 Puntuaciones</h3>
        <button className="reset-scores-btn" onClick={onReset}>
          🔄
        </button>
      </div>
      
      <div className="score-stats">
        <div className="score-item">
          <div className="score-symbol">X</div>
          <div className="score-info">
            <div className="score-value">{scores.X}</div>
            <div className="score-percentage">{xPercentage}%</div>
          </div>
        </div>
        
        <div className="score-item">
          <div className="score-symbol">O</div>
          <div className="score-info">
            <div className="score-value">{scores.O}</div>
            <div className="score-percentage">{oPercentage}%</div>
          </div>
        </div>
        
        <div className="score-item">
          <div className="score-symbol">🤝</div>
          <div className="score-info">
            <div className="score-value">{scores.draws}</div>
            <div className="score-percentage">{drawPercentage}%</div>
          </div>
        </div>
      </div>
      
      <div className="total-games">
        Total: {totalGames} partidas
      </div>
    </div>
  );
}

export default ScoreBoard;
