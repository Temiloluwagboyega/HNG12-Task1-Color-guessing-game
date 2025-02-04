import React, { useState, useEffect } from 'react';
import { AlertCircle, Check } from 'lucide-react';
import './App.css';

const generateRandomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
};

const generateSimilarColor = (baseColor) => {
  const match = baseColor.match(/\d+/g);
  if (!match) return generateRandomColor();
  
  const [r, g, b] = match.map(Number);
  const variation = 30;
  const newR = Math.min(255, Math.max(0, r + (Math.random() - 0.5) * variation));
  const newG = Math.min(255, Math.max(0, g + (Math.random() - 0.5) * variation));
  const newB = Math.min(255, Math.max(0, b + (Math.random() - 0.5) * variation));
  
  return `rgb(${Math.round(newR)}, ${Math.round(newG)}, ${Math.round(newB)})`;
};

const generateOptions = (correctColor) => {
  const options = [correctColor];
  options.push(generateSimilarColor(correctColor));
  options.push(generateSimilarColor(correctColor));
  
  while (options.length < 6) {
    const newColor = generateRandomColor();
    if (!options.includes(newColor)) {
      options.push(newColor);
    }
  }
  
  return options.sort(() => Math.random() - 0.5);
};

const ColorGame = () => {
  const [targetColor, setTargetColor] = useState(generateRandomColor());
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    setOptions(generateOptions(targetColor));
  }, [targetColor]);

  const handleGuess = (color) => {
    if (color === targetColor) {
      setScore(prev => prev + 1);
      setGameStatus('Correct 🎉! Well done!');
      setIsCorrect(true);
      setTimeout(startNewGame, 1500);
    } else {
      setGameStatus('Wrong guess! Try again!');
      setIsCorrect(false);
    }

    setTimeout(() => {
      setGameStatus('');
      setIsCorrect(null);
    }, 1500);
  };

  const startNewGame = () => {
    const newColor = generateRandomColor();
    setTargetColor(newColor);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-black">Color Guessing Game</h1>
        
        <div 
          data-testid="gameInstructions"
          className="text-center mb-8 text-gray-600"
        >
          Match the color! Click on the button that matches the color shown in the box above.
        </div>

        <div className="flex flex-col items-center gap-8">
          <div
            data-testid="colorBox"
            className="w-48 h-48 rounded-lg shadow-md transition-all duration-300"
            style={{ backgroundColor: targetColor }}
          />

          <div 
            data-testid="score"
            className="text-2xl text-black font-semibold"
          >
            Score: {score}
          </div>

          {gameStatus && (
            <div 
              data-testid="gameStatus"
              className={`w-full max-w-sm p-4 rounded-lg flex items-center gap-2 ${
                isCorrect 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              } animate-fade-in`}
            >
              {isCorrect ? (
                <Check className="h-6 w-6 text-green-600" />
              ) : (
                <AlertCircle className="h-6 w-6 text-red-600" />
              )}
              <span className="font-medium">{gameStatus}</span>
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {options.map((color, index) => (
              <button
                key={index}
                data-testid="colorOption"
                className="w-24 h-24 rounded-lg shadow-md hover:scale-105 
                         transition-transform duration-200 cursor-pointer"
                style={{ backgroundColor: color }}
                onClick={() => handleGuess(color)}
              />
            ))}
          </div>

          <button
            data-testid="newGameButton"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg 
                     hover:bg-blue-600 transition-colors duration-200"
            onClick={startNewGame}
          >
            New Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColorGame;