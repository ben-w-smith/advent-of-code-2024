export function solve(input: string): number {
    // Regular expression to match valid mul(X,Y) instructions
    // where X and Y are 1-3 digit numbers
    const mulRegex = /mul\((\d{1,3}),(\d{1,3})\)/g;

    let sum = 0;
    let match;

    // Find all matches in the input string
    while ((match = mulRegex.exec(input)) !== null) {
        const x = parseInt(match[1]);
        const y = parseInt(match[2]);
        sum += x * y;
    }

    return sum;
}

// If you need to read the input file
import { readFileSync } from 'fs';

const input = readFileSync('./src/day03/puzzle_input.txt', 'utf-8');
console.log(solve(input));
