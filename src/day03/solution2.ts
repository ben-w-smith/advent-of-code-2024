export function solve(input: string): number {
    // Compile regex patterns once
    const instructionRegex = /(?:mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\))/g;
    const mulNumbersRegex = /mul\((\d{1,3}),(\d{1,3})\)/;

    let sum = 0;
    let enabled = true;

    // Match all instructions at once instead of searching repeatedly
    const matches = input.match(instructionRegex) || [];

    for (const instruction of matches) {
        if (instruction === 'do()') {
            enabled = true;
        } else if (instruction === "don't()") {
            enabled = false;
        } else if (enabled) {
            // It's a mul instruction and multiplications are enabled
            const numbers = instruction.match(mulNumbersRegex);
            if (numbers) {
                const x = parseInt(numbers[1]);
                const y = parseInt(numbers[2]);
                sum += x * y;
            }
        }
    }

    return sum;
}

// If you need to read the input file
import { readFileSync } from 'fs';

const input = readFileSync('./src/day03/puzzle_input.txt', 'utf-8');
console.log(solve(input));
