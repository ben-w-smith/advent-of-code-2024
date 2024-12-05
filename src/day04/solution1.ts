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

    // Direction vectors for all 8 directions
    const directions = [
        [-1, -1],
        [-1, 0],
        [-1, 1], // Up-left, Up, Up-right
        [0, -1],
        [0, 1], // Left, Right
        [1, -1],
        [1, 0],
        [1, 1], // Down-left, Down, Down-right
    ];

    // Check each starting position
    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            // Try each direction from this position
            for (const [dx, dy] of directions) {
                // Check if "XMAS" can be found in this direction
                if (checkDirection(input, row, col, dx, dy)) {
                    count++;
                }
            }
        }
    }

    return count;
}

function checkDirection(
    grid: string[],
    startRow: number,
    startCol: number,
    dx: number,
    dy: number
): boolean {
    const word = 'XMAS';
    const height = grid.length;
    const width = grid[0].length;

    // Check if the word would go out of bounds
    if (
        startRow + dx * 3 < 0 ||
        startRow + dx * 3 >= height ||
        startCol + dy * 3 < 0 ||
        startCol + dy * 3 >= width
    ) {
        return false;
    }

    // Check each character of the word
    for (let i = 0; i < word.length; i++) {
        const row = startRow + dx * i;
        const col = startCol + dy * i;
        if (grid[row][col] !== word[i]) {
            return false;
        }
    }

    return true;
}

// Run the solution
const result = findXMAS();
console.log(`XMAS appears ${result} times in the word search`);
