import * as fs from 'fs';

export function solution2(): number {
    // Read and parse input file
    const input = fs
        .readFileSync('./day01/puzzle_input.txt', 'utf8')
        .trim()
        .split('\n')
        .map((line) => {
            const [left, right] = line.split(/\s+/);
            return {
                left: parseInt(left),
                right: parseInt(right),
            };
        });

    // Create arrays of left and right numbers
    const leftNumbers = input.map((pair) => pair.left);
    const rightNumbers = input.map((pair) => pair.right);

    // Calculate similarity score
    let totalScore = 0;

    for (const leftNum of leftNumbers) {
        // Count occurrences of the left number in the right list
        const occurrences = rightNumbers.filter(
            (num) => num === leftNum
        ).length;
        // Multiply the number by its occurrences and add to total
        totalScore += leftNum * occurrences;
    }

    return totalScore;
}

// Run the solution
const result = solution2();
console.log('Similarity Score:', result);
