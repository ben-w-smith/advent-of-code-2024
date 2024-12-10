import { readFileSync } from 'fs';

function solution(input: string): number {
    // Parse input into numbers
    const numbers = input.split('').map(Number);

    // Convert numbers into blocks representation
    const blocks: number[] = [];
    let fileId = 0;

    for (let i = 0; i < numbers.length; i++) {
        const length = numbers[i];

        if (i % 2 === 0) {
            // File block
            for (let j = 0; j < length; j++) {
                blocks.push(fileId);
            }
            fileId++;
        } else {
            // Space block
            for (let j = 0; j < length; j++) {
                blocks.push(-1); // -1 represents empty space
            }
        }
    }

    // Compact the blocks
    let changed = true;
    while (changed) {
        changed = false;

        // Look for rightmost file block that can move left
        for (let i = blocks.length - 1; i >= 0; i--) {
            if (blocks[i] >= 0) {
                // Found a file block
                // Look for leftmost empty space
                let emptySpace = -1;
                for (let j = 0; j < i; j++) {
                    if (blocks[j] === -1) {
                        emptySpace = j;
                        break;
                    }
                }

                // If we found empty space before this block, move the block
                if (emptySpace !== -1) {
                    blocks[emptySpace] = blocks[i];
                    blocks[i] = -1;
                    changed = true;
                    break;
                }
            }
        }
    }

    // Calculate checksum
    let checksum = 0;
    for (let i = 0; i < blocks.length; i++) {
        if (blocks[i] >= 0) {
            checksum += i * blocks[i];
        }
    }

    return checksum;
}

const input = readFileSync('./src/day09/puzzle_input09.txt', 'utf-8');
const result = solution(input);
console.log(result);
