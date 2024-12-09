import { readFileSync } from 'fs';
import { join } from 'path';

function evaluateExpression(numbers: number[], operators: string[]): number {
    let result = numbers[0];
    for (let i = 0; i < operators.length; i++) {
        if (operators[i] === '+') {
            result += numbers[i + 1];
        } else {
            result *= numbers[i + 1];
        }
    }
    return result;
}

function canMakeTestValue(testValue: number, numbers: number[]): boolean {
    // For n numbers, we need n-1 operators
    const operatorCount = numbers.length - 1;

    // Try all possible combinations of + and *
    // Each position can be either + or *, so we have 2^(n-1) possibilities
    const totalCombinations = Math.pow(2, operatorCount);

    for (let i = 0; i < totalCombinations; i++) {
        const operators: string[] = [];

        // Convert number to binary representation to get operator combination
        let combination = i;
        for (let j = 0; j < operatorCount; j++) {
            operators.push(combination & 1 ? '+' : '*');
            combination = combination >> 1;
        }

        if (evaluateExpression(numbers, operators) === testValue) {
            return true;
        }
    }

    return false;
}

function solve(): number {
    const input = readFileSync(join(__dirname, 'puzzle_input07.txt'), 'utf-8');
    const lines = input.trim().split('\n');

    let sum = 0;

    for (const line of lines) {
        const [testValueStr, numbersStr] = line.split(': ');
        const testValue = parseInt(testValueStr);
        const numbers = numbersStr.split(' ').map(Number);

        if (canMakeTestValue(testValue, numbers)) {
            sum += testValue;
        }
    }

    return sum;
}

console.log(solve());

export {};
