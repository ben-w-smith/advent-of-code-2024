// solution10-1.ts

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

function calculateTrailheadScore(
    grid: number[][],
    startRow: number,
    startCol: number
): number {
    const visited = new Set<string>();
    const reachableNines = new Set<string>();

    function dfs(row: number, col: number, currentHeight: number) {
        const key = `${row},${col}`;
        if (!isValidPosition(grid, row, col) || visited.has(key)) return;

        const height = grid[row][col];
        if (height !== currentHeight + 1) return;

        visited.add(key);
        if (height === 9) {
            reachableNines.add(key);
        }

        // Try all four directions
        const directions = [
            [0, 1],
            [1, 0],
            [0, -1],
            [-1, 0],
        ];
        for (const [dr, dc] of directions) {
            dfs(row + dr, col + dc, height);
        }
    }

    // Start the search from each trailhead
    const directions = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
    ];
    for (const [dr, dc] of directions) {
        visited.clear();
        dfs(startRow + dr, startCol + dc, 0);
    }

    return reachableNines.size;
}

function solve(): number {
    const grid = readInput();
    const trailheads = findTrailheads(grid);

    let totalScore = 0;
    for (const [row, col] of trailheads) {
        const score = calculateTrailheadScore(grid, row, col);
        totalScore += score;
    }

    return totalScore;
}

console.log(solve());
