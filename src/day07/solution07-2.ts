function evaluateExpression(numbers: number[], operators: string[]): number {
    let result = numbers[0];

    for (let i = 0; i < operators.length; i++) {
        const nextNum = numbers[i + 1];
        switch (operators[i]) {
            case '+':
                result += nextNum;
                break;
            case '*':
                result *= nextNum;
                break;
            case '||':
                // Convert to string, concatenate, then back to number
                result = parseInt(result.toString() + nextNum.toString());
                break;
        }
    }

    return result;
}

function generateAllPossibleOperators(count: number): string[][] {
    if (count === 0) return [[]];
    const operators = ['+', '*', '||'];
    const result: string[][] = [];

    const subCombinations = generateAllPossibleOperators(count - 1);
    for (const op of operators) {
        for (const subComb of subCombinations) {
            result.push([op, ...subComb]);
        }
    }

    return result;
}

export function solution(input: string): number {
    const lines = input.split('\n').filter((line) => line.trim());
    let totalSum = 0;

    for (const line of lines) {
        const [target, numbersStr] = line.split(':');
        const targetValue = parseInt(target);
        const numbers = numbersStr.trim().split(' ').map(Number);

        // Generate all possible operator combinations
        const operatorCombinations = generateAllPossibleOperators(
            numbers.length - 1
        );

        // Try each combination
        for (const operators of operatorCombinations) {
            const result = evaluateExpression(numbers, operators);
            if (result === targetValue) {
                totalSum += targetValue;
                break;
            }
        }
    }

    return totalSum;
}

import { readFileSync } from 'fs';

const input = readFileSync('src/day07/puzzle_input07.txt', 'utf-8');
console.log('Solution 07-2:', solution(input));
