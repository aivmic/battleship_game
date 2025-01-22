const { generateBoard } = require('../utils/boardGenerator');
const games = new Map();

const createNewGame = () => {
    const gameId = `game-${Date.now()}`;
    const board = generateBoard();
    games.set(gameId, {
        board,
        shots: [],
        remainingShots: 25,
        shipsLeft: board.ships.length,
        ships: board.ships,
    });
    return gameId;
};

const processShot = (gameId, x, y) => {
    const game = games.get(gameId);
    if (!game) throw new Error('Game not found');

    const shotKey = `${x},${y}`;
    if (game.shots.includes(shotKey)) {
        return { message: 'Already shot here', hit: false };
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
            return { message: 'You sunk a ship!', hit: true, sunk: true };
        }

        return { message: 'Hit!', hit: true, sunk: false };
    } else {
        game.board.grid[x][y] = 'M';
        game.remainingShots -= 1;
        if (game.remainingShots === 0) {
            return { message: 'Out of shots! You lose!', hit: false };
        }
        return { message: 'Miss!', hit: false };
    }
};

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
