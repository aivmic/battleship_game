import React, { useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import Board from "./components/Board";
import "./index.css";

const App = () => {
  const [gameId, setGameId] = useState(null);
  const [board, setBoard] = useState(Array.from({ length: 10 }, () => Array(10).fill(null)));
  const [remainingShots, setRemainingShots] = useState(25);
  const [shipsLeft, setShipsLeft] = useState(10);
  const [message, setMessage] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);

  const startNewGame = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/game/new-game");
      setGameId(response.data.gameId);
      setBoard(Array.from({ length: 10 }, () => Array(10).fill(null)));
      setRemainingShots(25);
      setShipsLeft(10);
      setMessage("New game started!");
      setIsGameOver(false);
    } catch (error) {
      setMessage("Failed to start a new game. Please try again.");
    }
  };

  const handleCellClick = async (x, y) => {
    if (isGameOver) {
      setMessage("The game is over. Please start a new game.");
      return;
    }

    if (!gameId) {
      setMessage("Please start a new game first.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/api/game/shoot", {
        gameId,
        x,
        y,
      });

      const { message, board: updatedBoard, remainingShots, shipsLeft } = response.data;

      setMessage(message);
      setBoard(updatedBoard || Array.from({ length: 10 }, () => Array(10).fill(null)));
      setRemainingShots(remainingShots);
      setShipsLeft(shipsLeft);

      if (remainingShots === 0) {
        setIsGameOver(true);
        setMessage("Out of shots! You lose!");
      } else if (shipsLeft === 0) {
        setIsGameOver(true);
        setMessage("Congratulations! You sunk all the ships!");
      }
    } catch (error) {
      setMessage(error.response?.data?.error || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="app">
      <Header />
      <button className="new-game-button" onClick={startNewGame}>
        Start New Game
      </button>
      <div className="game-info">
        <p>{message}</p>
        <p>Remaining Shots: {remainingShots}</p>
        <p>Ships Left: {shipsLeft}</p>
      </div>
      <Board board={board} handleCellClick={handleCellClick} isGameOver={isGameOver} />
    </div>
  );
};

export default App;
