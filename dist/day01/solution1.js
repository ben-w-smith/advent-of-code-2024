import * as fs from 'node:fs';
export function solution1() {
    // Split input into lines and parse into two arrays
    const lines = fs.readFileSync('./day01/puzzle_input.txt', 'utf8').trim().split('\n');
    const leftList = [];
    const rightList = [];
    // Parse input into two separate lists
    lines.forEach((line) => {
        const [left, right] = line.split(/\s+/).map(Number);
        leftList.push(left);
        rightList.push(right);
    });
    // Sort both lists in ascending order
    const sortedLeft = [...leftList].sort((a, b) => a - b);
    const sortedRight = [...rightList].sort((a, b) => a - b);
    // Calculate total distance between paired numbers
    let totalDistance = 0;
    for (let i = 0; i < sortedLeft.length; i++) {
        const distance = Math.abs(sortedLeft[i] - sortedRight[i]);
        totalDistance += distance;
    }
    return totalDistance;
}
console.log('Total distance:', solution1());
