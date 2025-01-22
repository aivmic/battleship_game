const generateBoard = () => {
    // Initialize an empty 10x10 grid
    const grid = Array.from({ length: 10 }, () => Array(10).fill(null));

    // Define ship sizes and their counts
    const shipsConfig = [
        { size: 5, count: 1 }, // 1 ship of size 5
        { size: 4, count: 1 }, // 1 ship of size 4
        { size: 3, count: 2 }, // 2 ships of size 3
        { size: 2, count: 3 }, // 3 ships of size 2
        { size: 1, count: 3 }, // 3 ships of size 1
    ];

    // Check if positions are valid (no overlap and 1-grid buffer zone)
    const isValidPlacement = (positions) => {
        for (const [x, y] of positions) {
            // Ensure position is within bounds
            if (x < 0 || y < 0 || x >= 10 || y >= 10) return false;

            // Check for collisions and buffer zones
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

    // Place a single ship of a given size
    const placeShip = (size) => {
        let placed = false;

        while (!placed) {
            const vertical = Math.random() < 0.5; // Randomize orientation
            const startX = Math.floor(Math.random() * 10);
            const startY = Math.floor(Math.random() * 10);

            // Calculate ship positions
            const positions = [];
            for (let i = 0; i < size; i++) {
                const x = vertical ? startX + i : startX;
                const y = vertical ? startY : startY + i;
                positions.push([x, y]);
            }

            // Check if positions are valid
            if (isValidPlacement(positions)) {
                // Place the ship on the grid
                positions.forEach(([x, y]) => {
                    grid[x][y] = 'S';
                });
                placed = true;
            }
        }
    };

    // Place all ships based on the configuration
    shipsConfig.forEach(({ size, count }) => {
        for (let i = 0; i < count; i++) {
            placeShip(size);
        }
    });

    return { grid, ships: shipsConfig };
};

module.exports = { generateBoard };
