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
        game.shipsLeft--;
        if (game.shipsLeft === 0) {
            return { message: 'All ships sunk! You win!', hit: true };
        }
        return { message: 'Hit!', hit: true };
    } else {
        game.board.grid[x][y] = 'M';
        game.remainingShots--;
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
        shots: game.shots,
        remainingShots: game.remainingShots,
        shipsLeft: game.shipsLeft,
    };
};

module.exports = { createNewGame, processShot, getGameStateById };
