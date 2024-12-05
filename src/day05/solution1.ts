interface Rule {
    before: number;
    after: number;
}

function parseInput(input: string): { rules: Rule[]; updates: number[][] } {
    const [rulesSection, updatesSection] = input.trim().split('\n\n');

    // Parse rules
    const rules: Rule[] = rulesSection.split('\n').map((line) => {
        const [before, after] = line.split('|').map(Number);
        return { before, after };
    });

    // Parse updates
    const updates: number[][] = updatesSection
        .split('\n')
        .map((line) => line.split(',').map(Number));

    return { rules, updates };
}

function isValidOrder(pages: number[], rules: Rule[]): boolean {
    // Create a map of page indices for quick lookup
    const pageIndices = new Map(pages.map((page, index) => [page, index]));

    // Check each applicable rule
    for (const rule of rules) {
        // Only check rules where both pages are present in the update
        if (pageIndices.has(rule.before) && pageIndices.has(rule.after)) {
            const beforeIndex = pageIndices.get(rule.before)!;
            const afterIndex = pageIndices.get(rule.after)!;

            // If the 'after' page comes before the 'before' page, the order is invalid
            if (beforeIndex > afterIndex) {
                return false;
            }
        }
    }

    return true;
}

function getMiddleNumber(arr: number[]): number {
    return arr[Math.floor(arr.length / 2)];
}

export function solve(input: string): number {
    const { rules, updates } = parseInput(input);

    // Filter valid updates and get their middle numbers
    const validMiddleNumbers = updates
        .filter((update) => isValidOrder(update, rules))
        .map(getMiddleNumber);

    // Sum the middle numbers
    return validMiddleNumbers.reduce((sum, num) => sum + num, 0);
}

import { readFileSync } from 'fs';
import { join } from 'path';

const input = readFileSync(join(__dirname, 'puzzle_input.txt'), 'utf-8');
console.log('Solution:', solve(input));
