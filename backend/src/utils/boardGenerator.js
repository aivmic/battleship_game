const { BOARD_SIZE, SHIPS_SIZE } = require('../config/constants');

/**
 * Generates a Battleship game board with ships placed randomly.
 * Ensures ships are placed within bounds, do not overlap, and maintain a 1-cell buffer around them.
 * @returns {object} An object containing:
 *  - grid: A 2D array representing the board with ships ('S') and empty spaces (null).
 *  - ships: An array of ship objects with their size, positions, hits, and sunk status.
 */
const generateBoard = () => {
    const grid = Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(null));
    const ships = [];

    /**
     * Checks if a ship's positions can be placed on the grid without conflicts or boundary violations.
     * @param {Array} positions - Array of [x, y] coordinates for the ship.
     * @returns {boolean} True if placement is valid, false otherwise.
     */
    const isValidPlacement = (positions) => {
        for (const [x, y] of positions) {
            if (x < 0 || y < 0 || x >= BOARD_SIZE || y >= BOARD_SIZE) return false;
            for (let dx = -1; dx <= 1; dx++) {
                for (let dy = -1; dy <= 1; dy++) {
                    const nx = x + dx;
                    const ny = y + dy;
                    if (nx >= 0 && ny >= 0 && nx < BOARD_SIZE && ny < BOARD_SIZE) {
                        if (grid[nx][ny] !== null) return false;
                    }
                }
            }
        }
        return true;
    };

    /**
     * Randomly places a ship of the given size on the board.
     * Retries placement until a valid position is found.
     * @param {number} size - The size of the ship to place.
     */
    const placeShip = (size) => {
        let placed = false;
        while (!placed) {
            const vertical = Math.random() < 0.5;
            const startX = Math.floor(Math.random() * BOARD_SIZE);
            const startY = Math.floor(Math.random() * BOARD_SIZE);

            const positions = [];
            for (let i = 0; i < size; i++) {
                const x = vertical ? startX + i : startX;
                const y = vertical ? startY : startY + i;
                positions.push([x, y]);
            }

            if (isValidPlacement(positions)) {
                positions.forEach(([x, y]) => {
                    grid[x][y] = 'S';
                });
                ships.push({ size, positions, hits: 0, sunk: false });
                placed = true;
            }
        }
    };

    // Place all ships defined in SHIPS_SIZE on the board
    SHIPS_SIZE.forEach(placeShip);

    return { grid, ships };
};

module.exports = { generateBoard };
