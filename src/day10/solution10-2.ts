import * as fs from 'fs';
import * as path from 'path';

function readInput(): number[][] {
    const input = fs.readFileSync(
        path.join(__dirname, 'puzzle_input10.txt'),
        'utf8'
    );
    return input
        .trim()
        .split('\n')
        .map((line) => line.split('').map(Number));
}

function isValidPosition(grid: number[][], row: number, col: number): boolean {
    return row >= 0 && row < grid.length && col >= 0 && col < grid[0].length;
}

function findTrailheads(grid: number[][]): [number, number][] {
    const trailheads: [number, number][] = [];
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
            if (grid[row][col] === 0) {
                trailheads.push([row, col]);
            }
        }
    }
    return trailheads;
}

function calculateTrailheadRating(
    grid: number[][],
    startRow: number,
    startCol: number
): number {
    const cache = new Map<string, number>();

    function countPaths(
        row: number,
        col: number,
        currentHeight: number
    ): number {
        const key = `${row},${col},${currentHeight}`;
        if (cache.has(key)) return cache.get(key)!;

        if (!isValidPosition(grid, row, col)) return 0;

        const height = grid[row][col];
        if (height !== currentHeight + 1) return 0;

        // If we've reached height 9, we've found a valid path
        if (height === 9) return 1;

        // Try all four directions
        const directions = [
            [0, 1],
            [1, 0],
            [0, -1],
            [-1, 0],
        ];
        let totalPaths = 0;

        for (const [dr, dc] of directions) {
            totalPaths += countPaths(row + dr, col + dc, height);
        }

        cache.set(key, totalPaths);
        return totalPaths;
    }

    // Start counting paths from each adjacent cell to the trailhead
    let rating = 0;
    const directions = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
    ];

    for (const [dr, dc] of directions) {
        rating += countPaths(startRow + dr, startCol + dc, 0);
    }

    return rating;
}

function solve(): number {
    const grid = readInput();
    const trailheads = findTrailheads(grid);

    let totalRating = 0;
    for (const [row, col] of trailheads) {
        const rating = calculateTrailheadRating(grid, row, col);
        totalRating += rating;
    }

    return totalRating;
}

console.log(solve());
