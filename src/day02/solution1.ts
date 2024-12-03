import { readFileSync } from 'fs';
import { join } from 'path';

function isReportSafe(levels: number[]): boolean {
    // Check if array has at least 2 elements
    if (levels.length < 2) return true;

    // Determine if sequence should be increasing or decreasing based on first two numbers
    const isIncreasing = levels[1] > levels[0];

    // Check each adjacent pair
    for (let i = 1; i < levels.length; i++) {
        const diff = levels[i] - levels[i - 1];

        // If increasing sequence
        if (isIncreasing) {
            // Must be positive and between 1 and 3
            if (diff <= 0 || diff > 3) return false;
        }
        // If decreasing sequence
        else {
            // Must be negative and between -3 and -1
            if (diff >= 0 || diff < -3) return false;
        }
    }

    return true;
}

function solution(): number {
    // Read and parse input
    const input = readFileSync(join(__dirname, 'puzzle_input.txt'), 'utf-8');
    const reports = input
        .trim()
        .split('\n')
        .map((line) => line.trim().split(' ').map(Number));

    // Count safe reports
    return reports.reduce(
        (count, report) => count + (isReportSafe(report) ? 1 : 0),
        0
    );
}

console.log(solution());
