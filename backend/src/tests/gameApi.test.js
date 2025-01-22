const request = require('supertest');
const app = require('../../app');

describe('Battleship API Tests', () => {
    let gameId;

    test('Start a new game', async () => {
        const res = await request(app).post('/api/game/new-game');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('gameId');
        gameId = res.body.gameId; // Save gameId for later tests
    });

    test('Shoot at a valid coordinate and miss', async () => {
        const res = await request(app)
            .post('/api/game/shoot')
            .send({ gameId, x: 0, y: 0 });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toMatch(/Miss|Hit/);
    });

    test('Shoot at the same coordinate twice', async () => {
        // First shot
        await request(app)
            .post('/api/game/shoot')
            .send({ gameId, x: 0, y: 0 });

        // Second shot
        const res = await request(app)
            .post('/api/game/shoot')
            .send({ gameId, x: 0, y: 0 });

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Already shot here');
    });

    test('Retrieve game state: status code and main properties', async () => {
        const res = await request(app).get(`/api/game/state?gameId=${gameId}`);

        expect(res.statusCode).toBe(200);

        expect(res.body).toHaveProperty('board');
        expect(res.body).toHaveProperty('shots');
        expect(res.body).toHaveProperty('remainingShots');
        expect(res.body).toHaveProperty('shipsLeft');
        expect(res.body).toHaveProperty('ships');
    });

    test('Retrieve game state: board structure', async () => {
        const res = await request(app).get(`/api/game/state?gameId=${gameId}`);

        expect(res.body.board).toHaveLength(10);
        expect(res.body.board[0]).toHaveLength(10);
    });

    test('Retrieve game state: shots array', async () => {
        const res = await request(app).get(`/api/game/state?gameId=${gameId}`);

        expect(Array.isArray(res.body.shots)).toBe(true);
        res.body.shots.forEach((shot) => {
            expect(typeof shot).toBe('string');
        });
    });

    test('Retrieve game state: remaining shots', async () => {
        const res = await request(app).get(`/api/game/state?gameId=${gameId}`);

        expect(typeof res.body.remainingShots).toBe('number');
        expect(res.body.remainingShots).toBeGreaterThanOrEqual(0);
    });

    test('Retrieve game state: ships left', async () => {
        const res = await request(app).get(`/api/game/state?gameId=${gameId}`);

        expect(typeof res.body.shipsLeft).toBe('number');
        expect(res.body.shipsLeft).toBeGreaterThanOrEqual(0);
    });

    test('Retrieve game state: ships array', async () => {
        const res = await request(app).get(`/api/game/state?gameId=${gameId}`);

        expect(Array.isArray(res.body.ships)).toBe(true);
        res.body.ships.forEach((ship) => {
            expect(ship).toHaveProperty('size');
            expect(ship).toHaveProperty('sunk');
            expect(typeof ship.size).toBe('number');
            expect(ship.size).toBeGreaterThan(0);
            expect(typeof ship.sunk).toBe('boolean');
        });
    });

    test('Retrieve game state: ship and board hits validation', async () => {
        const res = await request(app).get(`/api/game/state?gameId=${gameId}`);

        const totalShipCells = res.body.ships.reduce((sum, ship) => sum + ship.size, 0);
        const hitCells = res.body.board.flat().filter((cell) => cell === 'H').length;
        expect(hitCells).toBeLessThanOrEqual(totalShipCells);
    });

    test('Retrieve game state with invalid gameId', async () => {
        const res = await request(app).get('/api/game/state?gameId=invalid-id');
        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty('error');
        expect(res.body.error).toBe('Game not found');
    });

    test('Shoot with invalid gameId', async () => {
        const res = await request(app)
            .post('/api/game/shoot')
            .send({ gameId: 'invalid-id', x: 1, y: 1 });

        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty('error');
        expect(res.body.error).toBe('Game not found');
    });

    test('Shoot with invalid coordinates', async () => {
        const res = await request(app)
            .post('/api/game/shoot')
            .send({ gameId, x: 20, y: 20 });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error');
        expect(res.body.error).toBe('Invalid coordinates');
    });

});
