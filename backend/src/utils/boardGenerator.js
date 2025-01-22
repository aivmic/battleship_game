const generateBoard = () => {
    const grid = Array.from({ length: 10 }, () => Array(10).fill(null));
    const shipsConfig = [5, 4, 3, 3, 2, 2, 2, 1, 1, 1];
    const ships = [];

    const isValidPlacement = (positions) => {
        for (const [x, y] of positions) {
            if (x < 0 || y < 0 || x >= 10 || y >= 10) return false;
            for (let dx = -1; dx <= 1; dx++) {
                for (let dy = -1; dy <= 1; dy++) {
                    const nx = x + dx;
                    const ny = y + dy;
                    if (nx >= 0 && ny >= 0 && nx < 10 && ny < 10) {
                        if (grid[nx][ny] !== null) return false;
                    }
                }
            }
        }
        return true;
    };

    const placeShip = (size) => {
        let placed = false;
        while (!placed) {
            const vertical = Math.random() < 0.5;
            const startX = Math.floor(Math.random() * 10);
            const startY = Math.floor(Math.random() * 10);

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

    shipsConfig.forEach(placeShip);
    return { grid, ships };
};

module.exports = { generateBoard };
