const { generateBoard } = require('../utils/boardGenerator');
const { MAX_SHOTS } = require('../config/constants');
const games = new Map();

/**
 * Creates a new game instance with a unique game ID.
 * Initializes the board, available shots, and ship information for the game.
 * @returns {string} The unique ID of the newly created game.
 */
const createNewGame = () => {
    const gameId = `game-${Date.now()}`;
    const board = generateBoard();
    games.set(gameId, {
        board,
        shots: [],
        remainingShots: MAX_SHOTS,
        shipsLeft: board.ships.length,
        ships: board.ships,
    });
    return gameId;
};

/**
 * Processes a shot fired by the player.
 * Updates the game state based on whether the shot hits, sinks a ship, or misses.
 * @param {string} gameId - The ID of the game being played.
 * @param {number} x - The x-coordinate of the shot.
 * @param {number} y - The y-coordinate of the shot.
 * @returns {object} The result of the shot, including updated board state and remaining shots.
 * @throws {Error} If the game is not found or invalid parameters are provided.
 */
const processShot = (gameId, x, y) => {
    const game = games.get(gameId);
    if (!game) throw new Error('Game not found');

    const shotKey = `${x},${y}`;
    if (game.shots.includes(shotKey)) {
        return {
            message: 'Already shot here',
            hit: false,
            coordinates: { x, y },
            board: maskBoard(game.board.grid),
            remainingShots: game.remainingShots,
            shipsLeft: game.ships.filter((ship) => !ship.sunk).length,
        };
    }

    game.shots.push(shotKey);

    const cell = game.board.grid[x][y];
    if (cell === 'S') {
        game.board.grid[x][y] = 'H';
        const ship = game.ships.find((ship) =>
            ship.positions.some(([sx, sy]) => sx === x && sy === y)
        );

        ship.hits += 1;
        if (ship.hits === ship.size) {
            ship.sunk = true;
            return {
                message: 'You sunk a ship!',
                hit: true,
                sunk: true,
                coordinates: { x, y },
                board: maskBoard(game.board.grid),
                remainingShots: game.remainingShots,
                shipsLeft: game.ships.filter((ship) => !ship.sunk).length,
            };
        }

        return {
            message: 'Hit!',
            hit: true,
            coordinates: { x, y },
            board: maskBoard(game.board.grid),
            remainingShots: game.remainingShots,
            shipsLeft: game.ships.filter((ship) => !ship.sunk).length,
        };
    } else {
        game.board.grid[x][y] = 'M';
        game.remainingShots -= 1;

        if (game.remainingShots === 0) {
            return {
                message: 'Out of shots! You lose!',
                hit: false,
                coordinates: { x, y },
                board: game.board.grid,
                remainingShots: game.remainingShots,
                shipsLeft: game.ships.filter((ship) => !ship.sunk).length,
            };
        }

        return {
            message: 'Miss!',
            hit: false,
            coordinates: { x, y },
            board: maskBoard(game.board.grid),
            remainingShots: game.remainingShots,
            shipsLeft: game.ships.filter((ship) => !ship.sunk).length,
        };
    }
};

/**
 * Masks the game board to hide unhit ship cells.
 * @param {Array<Array<string|null>>} board - The game board grid.
 * @returns {Array<Array<string|null>>} A masked version of the board.
 */
const maskBoard = (board) =>
    board.map((row) =>
        row.map((cell) => (cell === 'S' ? null : cell))
    );

/**
 * Retrieves the current state of the game by its ID.
 * @param {string} gameId - The ID of the game to retrieve.
 * @returns {object} The current game state, including the board, shots, and ship information.
 * @throws {Error} If the game is not found.
 */
const getGameStateById = (gameId) => {
    const game = games.get(gameId);
    if (!game) throw new Error('Game not found');
    return {
        board: game.board.grid,
        shots: game.shots,
        remainingShots: game.remainingShots,
        shipsLeft: game.ships.filter((ship) => !ship.sunk).length,
        ships: game.ships.map((ship) => ({
            size: ship.size,
            sunk: ship.sunk,
        })),
    };
};

module.exports = { createNewGame, processShot, getGameStateById };