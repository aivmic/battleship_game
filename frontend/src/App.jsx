import React from "react";
import useGame from "./hooks/useGame";
import Header from "./components/Header";
import Board from "./components/Board";
import GameModal from "./components/GameModal";
import "./styles/index.css";

const App = () => {
  const {
    gameId,
    board,
    remainingShots,
    shipsLeft,
    message,
    isGameOver,
    modalIsOpen,
    startNewGame,
    handleCellClick,
    setModalIsOpen,
  } = useGame();

  return (
    <div className="app">
      <Header />
      <button className="new-game-button" onClick={startNewGame}>
        Start New Game
      </button>

      {gameId && (
        <>
          <div className="game-info">
            <p>{message}</p>
            <p>Remaining Shots: {remainingShots}</p>
            <p>Ships Left: {shipsLeft}</p>
          </div>
          <Board board={board} handleCellClick={handleCellClick} isGameOver={isGameOver} />
        </>
      )}

      <GameModal isOpen={modalIsOpen} message={message} onClose={() => setModalIsOpen(false)} />
    </div>
  );
};

export default App;
