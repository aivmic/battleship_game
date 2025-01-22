const { createNewGame, processShot, getGameStateById } = require('../services/gameService');

/**
 * Handles the creation of a new game.
 * Generates a unique game ID, initializes the game state, and sends the response to the client.
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 */
const startNewGame = (req, res) => {
    const gameId = createNewGame();
    res.status(200).json({ message: 'New game created', gameId });
};

/**
 * Processes a player's shot at a specific cell on the board.
 * Validates the request parameters, updates the game state, and sends the result to the client.
 * @param {object} req - The HTTP request object containing gameId, x, and y in the body.
 * @param {object} res - The HTTP response object.
 */
const shootAtCell = (req, res) => {
    const { gameId, x, y } = req.body;

    if (!gameId || x === undefined || y === undefined) {
        return res.status(400).json({ error: 'Invalid parameters' });
    }

    if (x < 0 || x >= 10 || y < 0 || y >= 10) {
        return res.status(400).json({ error: 'Invalid coordinates' });
    }

    try {
        const result = processShot(gameId, x, y);
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

/**
 * Retrieves the current state of the game.
 * Validates the game ID, fetches the game state from the service, and sends it to the client.
 * @param {object} req - The HTTP request object containing gameId in the query string.
 * @param {object} res - The HTTP response object.
 */
const getGameState = (req, res) => {
    const { gameId } = req.query;
    if (!gameId) {
        return res.status(400).json({ error: 'Game ID is required' });
    }
    try {
        const gameState = getGameStateById(gameId);
        res.status(200).json(gameState);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

module.exports = { startNewGame, shootAtCell, getGameState };