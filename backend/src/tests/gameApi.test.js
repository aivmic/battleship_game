const request = require('supertest');
const app = require('../../app'); // Import your app instance

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
            .send({ gameId, x: 0, y: 0 }); // Adjust coordinates as needed

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toMatch(/Miss|Hit/); // Could be 'Miss' or 'Hit'
    });

    test('Shoot at the same coordinate twice', async () => {
        // First shot
        await request(app)
            .post('/api/game/shoot')
            .send({ gameId, x: 0, y: 0 });

        // Second shot at the same coordinate
        const res = await request(app)
            .post('/api/game/shoot')
            .send({ gameId, x: 0, y: 0 });

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Already shot here'); // Custom message defined in your service
    });

    test('Retrieve game state', async () => {
        const res = await request(app).get(`/api/game/state?gameId=${gameId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('shots');
        expect(res.body).toHaveProperty('remainingShots');
        expect(res.body).toHaveProperty('shipsLeft');
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
            .send({ gameId, x: 20, y: 20 }); // Out-of-bound coordinates

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error');
        expect(res.body.error).toBe('Invalid parameters');
    });
});
