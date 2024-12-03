import fs from 'fs';

function isValidDifference(a: number, b: number): boolean {
    const diff = Math.abs(a - b);
    return diff >= 1 && diff <= 3;
}

function isSafeSequence(numbers: number[]): boolean {
    if (numbers.length < 2) return true;

    // Check if increasing
    let isIncreasing = true;
    let isDecreasing = true;

    for (let i = 1; i < numbers.length; i++) {
        // Check if differences are valid (between 1 and 3)
        if (!isValidDifference(numbers[i], numbers[i - 1])) {
            return false;
        }

        // Check direction
        if (numbers[i] <= numbers[i - 1]) {
            isIncreasing = false;
        }
        if (numbers[i] >= numbers[i - 1]) {
            isDecreasing = false;
        }
    }

    return isIncreasing || isDecreasing;
}

function canBeMadeSafe(numbers: number[]): boolean {
    // Check if already safe
    if (isSafeSequence(numbers)) {
        return true;
    }

    // Try removing each number once
    for (let i = 0; i < numbers.length; i++) {
        const modifiedSequence = [
            ...numbers.slice(0, i),
            ...numbers.slice(i + 1),
        ];
        if (isSafeSequence(modifiedSequence)) {
            return true;
        }
    }

    return false;
}

export function solve(input: string): number {
    const lines = input.trim().split('\n');
    let safeCount = 0;

    for (const line of lines) {
        const numbers = line.trim().split(/\s+/).map(Number);
        if (canBeMadeSafe(numbers)) {
            safeCount++;
        }
    }

    return safeCount;
}

// Read and solve
const input = fs.readFileSync('./src/day02/puzzle_input.txt', 'utf8');
console.log('How many reports are now safe?', solve(input));
