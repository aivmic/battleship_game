import React from "react";
import Cell from "./Cell";
import "../styles/Board.css";

const Board = ({ board, handleCellClick, isGameOver }) => {
    return (
        <div className="board-container">
            <div className="board">
                {board.map((row, x) =>
                    row.map((cell, y) => (
                        <Cell
                            key={`${x}-${y}`}
                            value={cell}
                            onClick={() => !isGameOver && handleCellClick(x, y)}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default Board;