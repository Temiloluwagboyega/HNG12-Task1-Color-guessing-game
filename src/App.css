import React, { useState, useEffect } from "react";
import { AlertCircle, Check } from "lucide-react";
import "./App.css";

// ✅ Predefined color set (Task Requirement)
const PREDEFINED_COLORS = [
  "#FF0000", "#00FF00", "#0000FF",
  "#FFFF00", "#FF00FF", "#00FFFF",
  "#FFA500", "#800080", "#008000",
  "#A52A2A", "#808000", "#008080"
];

// ✅ Function to select a random color from the predefined set
const generateRandomColor = () => {
  return PREDEFINED_COLORS[
    Math.floor(Math.random() * PREDEFINED_COLORS.length)
  ];
};

// ✅ Generate six options: one correct + five random colors
const generateOptions = (correctColor) => {
  const options = new Set([correctColor]);

  while (options.size < 6) {
    options.add(generateRandomColor());
  }

  return Array.from(options).sort(() => Math.random() - 0.5);
};

// ✅ Normalize colors for accurate comparison
const normalizeColor = (color) => color.replace(/\s+/g, "").toLowerCase();

const ColorGame = () => {
  const [targetColor, setTargetColor] = useState(generateRandomColor());
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameStatus, setGameStatus] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    setOptions(generateOptions(targetColor));
  }, [targetColor]);

  const handleGuess = (color) => {
    if (normalizeColor(color) === normalizeColor(targetColor)) {
      setScore((prev) => {
        const newScore = prev + 1;
        if (newScore > highScore) setHighScore(newScore);
        return newScore;
      });
      setGameStatus("Correct 🎉 Well done!");
      setIsCorrect(true);
      setTimeout(changeColor, 1500);
    } else {
      setGameStatus("Wrong guess! Try again.");
      setIsCorrect(false);
    }

    setTimeout(() => {
      setGameStatus("");
      setIsCorrect(null);
    }, 1500);
  };

  const changeColor = () => {
    const newColor = generateRandomColor();
    setTargetColor(newColor);
    setOptions(generateOptions(newColor));
  };

  const startNewGame = () => {
    setScore(0);
    changeColor();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-lg md:max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8 text-black">
          Color Guessing Game
        </h2>

        <div data-testid="gameInstructions" className="text-center mb-6 text-gray-600 text-sm md:text-base">
          Match the color! Click on the button that matches the color shown in the box above.
        </div>

        <div className="flex flex-col items-center gap-6 md:gap-8">
          <div
            data-testid="colorBox"
            className="w-40 h-40 md:w-48 md:h-48 rounded-lg shadow-md transition-all duration-300"
            style={{ backgroundColor: targetColor }}
          />

          <div data-testid="score" className="text-xl md:text-2xl text-black font-semibold">
            Score: {score} | High Score: {highScore}
          </div>

          {gameStatus && (
            <div
              data-testid="gameStatus"
              className={`w-full max-w-sm p-3 md:p-4 rounded-lg flex items-center gap-2 text-sm md:text-base 
                ${isCorrect ? "bg-green-100 text-green-800 animate-fade-in" : "bg-red-100 text-red-800 animate-fade-in"}`}
            >
              {isCorrect ? (
                <Check className="h-5 w-5 md:h-6 md:w-6 text-green-600" />
              ) : (
                <AlertCircle className="h-5 w-5 md:h-6 md:w-6 text-red-600" />
              )}
              <span className="font-medium">{gameStatus}</span>
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
            {options.map((color, index) => (
              <button
                key={index}
                data-testid="colorOption"
                aria-label={`Color option ${index + 1}`}
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg shadow-md hover:scale-105 
                         transition-transform duration-200 cursor-pointer"
                style={{ backgroundColor: color }}
                onClick={() => handleGuess(color)}
              />
            ))}
          </div>

          <button
            data-testid="newGameButton"
            className="px-4 py-2 md:px-6 md:py-3 bg-red-500 text-white rounded-lg 
                     hover:bg-red-600 transition-colors duration-200"
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
