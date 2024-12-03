export function solve(input: string): number {
    // Regular expressions for finding instructions
    const mulRegex = /mul\((\d{1,3}),(\d{1,3})\)/g;
    const doRegex = /do\(\)/g;
    const dontRegex = /don't\(\)/g;

    let sum = 0;
    let enabled = true; // Multiplications are enabled by default
    let lastIndex = 0;

    // Process the input character by character to handle do/don't instructions
    while (lastIndex < input.length) {
        // Find the next instruction (either mul, do, or don't)
        const doMatch = doRegex.exec(input);
        const dontMatch = dontRegex.exec(input);
        const mulMatch = mulRegex.exec(input);

        // Find the earliest match
        const matches = [doMatch, dontMatch, mulMatch].filter(
            (m) => m !== null
        );
        if (matches.length === 0) break;

        const nextMatch = matches.reduce(
            (earliest, current) =>
                current.index < earliest.index ? current : earliest,
            matches[0]
        );

        // Update lastIndex to continue search from after this match
        lastIndex = nextMatch.index + nextMatch[0].length;

        // Handle the instruction
        if (nextMatch[0].startsWith('do(')) {
            enabled = true;
            doRegex.lastIndex = lastIndex;
            dontRegex.lastIndex = lastIndex;
            mulRegex.lastIndex = lastIndex;
        } else if (nextMatch[0].startsWith('don')) {
            enabled = false;
            doRegex.lastIndex = lastIndex;
            dontRegex.lastIndex = lastIndex;
            mulRegex.lastIndex = lastIndex;
        } else if (enabled) {
            // It's a mul instruction and multiplications are enabled
            const x = parseInt(nextMatch[1]);
            const y = parseInt(nextMatch[2]);
            sum += x * y;
            doRegex.lastIndex = lastIndex;
            dontRegex.lastIndex = lastIndex;
            mulRegex.lastIndex = lastIndex;
        }
    }

    return sum;
}

// If you need to read the input file
import { readFileSync } from 'fs';

const input = readFileSync('./src/day03/puzzle_input.txt', 'utf-8');
console.log(solve(input));
