import { useState } from "react";
import axios from "axios";
import { API_BASE_URL, BOARD_SIZE, SHIP_COUNT, INITIAL_SHOTS } from "../constants";

const useGame = () => {
    const [gameId, setGameId] = useState(null);
    const [board, setBoard] = useState(Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(null)));
    const [remainingShots, setRemainingShots] = useState(INITIAL_SHOTS);
    const [shipsLeft, setShipsLeft] = useState(SHIP_COUNT);
    const [message, setMessage] = useState("");
    const [isGameOver, setIsGameOver] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const startNewGame = async () => {
        try {
            const response = await axios.post(`${API_BASE_URL}/game/new-game`);
            setGameId(response.data.gameId);
            resetGameState();
            setMessage("New game started!");
        } catch (error) {
            setMessage("Failed to start a new game. Please try again.");
        }
    };

    const handleCellClick = async (x, y) => {
        if (isGameOver || !gameId) {
            setMessage("The game is over or not started yet. Please start a new game.");
            return;
        }

        try {
            const response = await axios.post(`${API_BASE_URL}/game/shoot`, { gameId, x, y });
            const { message, hit, sunk, coordinates, board: newBoard, remainingShots, shipsLeft } = response.data;

            setMessage(message);

            if (newBoard) {
                setBoard(newBoard);
            } else if (coordinates) {
                setBoard((prevBoard) =>
                    prevBoard.map((row, rowIndex) =>
                        row.map((cell, colIndex) => {
                            if (rowIndex === coordinates.x && colIndex === coordinates.y) {
                                return hit ? "H" : "M";
                            }
                            return cell;
                        })
                    )
                );
            }

            setRemainingShots(remainingShots);
            setShipsLeft(shipsLeft);

            if (sunk) {
                setModalIsOpen(true);
                setMessage("You sunk a ship!");
            }

            if (remainingShots === 0 || shipsLeft === 0) {
                setIsGameOver(true);
                setModalIsOpen(true);

                if (shipsLeft === 0) {
                    setMessage("Congratulations! You sunk all the ships!");
                } else if (remainingShots === 0) {
                    setMessage("Out of shots! You lose!");
                }

                if (newBoard) {
                    setBoard(newBoard);
                }
            }
        } catch (error) {
            setMessage(error.response?.data?.error || "An error occurred. Please try again.");
        }
    };

    const resetGameState = () => {
        setBoard(Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(null)));
        setRemainingShots(25);
        setShipsLeft(10);
        setIsGameOver(false);
        setModalIsOpen(false);
    };

    return {
        gameId,
        board,
        remainingShots,
        shipsLeft,
        message,
        isGameOver,
        modalIsOpen,
        startNewGame,
        handleCellClick,
        setModalIsOpen
    };
};

export default useGame;
