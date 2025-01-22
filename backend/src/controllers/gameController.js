const { createNewGame, processShot, getGameStateById } = require('../services/gameService');

const startNewGame = (req, res) => {
    const gameId = createNewGame();
    res.status(200).json({ message: 'New game created', gameId });
};

const shootAtCell = (req, res) => {
    const { gameId, x, y } = req.body;

    // Validate gameId and coordinates
    if (!gameId || x === undefined || y === undefined) {
        return res.status(400).json({ error: 'Invalid parameters' });
    }

    // Ensure coordinates are within bounds
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
