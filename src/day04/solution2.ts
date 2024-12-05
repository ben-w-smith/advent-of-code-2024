import { readFileSync } from 'fs';
import { join } from 'path';

function findXMAS(): number {
    // Read the puzzle input
    const input = readFileSync(join(__dirname, 'puzzle_input.txt'), 'utf-8')
        .trim()
        .split('\n');

    const height = input.length;
    const width = input[0].length;
    let count = 0;

    // For each position that could be the center of an X
    for (let row = 1; row < height - 1; row++) {
        for (let col = 1; col < width - 1; col++) {
            // Check if this position is an 'A'
            if (input[row][col] !== 'A') continue;

            // Check if we can form an X-MAS pattern here
            if (isValidXPattern(input, row, col)) {
                count++;
            }
        }
    }

    return count;
}

function isValidXPattern(
    grid: string[],
    centerRow: number,
    centerCol: number
): boolean {
    // Check all four endpoints are within bounds first
    if (
        !isInBounds(grid, centerRow - 1, centerCol - 1) ||
        !isInBounds(grid, centerRow - 1, centerCol + 1) ||
        !isInBounds(grid, centerRow + 1, centerCol - 1) ||
        !isInBounds(grid, centerRow + 1, centerCol + 1)
    ) {
        return false;
    }

    // Get all four corner characters
    const upperLeft = grid[centerRow - 1][centerCol - 1];
    const upperRight = grid[centerRow - 1][centerCol + 1];
    const lowerLeft = grid[centerRow + 1][centerCol - 1];
    const lowerRight = grid[centerRow + 1][centerCol + 1];

    // Check if we can form valid MAS patterns (either direction) in both diagonals
    return (
        // Check upper-left to lower-right diagonal
        ((upperLeft === 'M' && lowerRight === 'S') ||
            (upperLeft === 'S' && lowerRight === 'M')) &&
        // Check upper-right to lower-left diagonal
        ((upperRight === 'M' && lowerLeft === 'S') ||
            (upperRight === 'S' && lowerLeft === 'M'))
    );
}

function isInBounds(grid: string[], row: number, col: number): boolean {
    return row >= 0 && row < grid.length && col >= 0 && col < grid[0].length;
}

// Run the solution
const result = findXMAS();
console.log(`Number of X-MAS patterns: ${result}`);
