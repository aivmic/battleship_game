const express = require('express');
const { startNewGame, shootAtCell, getGameState } = require('../controllers/gameController');

const router = express.Router();

router.post('/new-game', startNewGame);
router.post('/shoot', shootAtCell);
router.get('/state', getGameState);

module.exports = router;
