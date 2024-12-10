import { readFileSync } from 'fs';

export function solution(input: string): number {
    // Parse input into alternating lengths of files and spaces
    const numbers = input.split('').map(Number);

    // Convert to blocks showing file IDs and free space
    const blocks: (number | '.')[] = [];
    let fileId = 0;
    let pos = 0;

    // Build initial block representation
    for (let i = 0; i < numbers.length; i++) {
        const length = numbers[i];
        if (i % 2 === 0) {
            // File blocks
            for (let j = 0; j < length; j++) {
                blocks[pos++] = fileId;
            }
            fileId++;
        } else {
            // Free space blocks
            for (let j = 0; j < length; j++) {
                blocks[pos++] = '.';
            }
        }
    }

    // Get list of files with their sizes and IDs
    const files: { id: number; size: number; startPos: number }[] = [];
    let currentId: number | '.' = blocks[0];
    let currentSize = 0;
    let startPos = 0;

    for (let i = 0; i < blocks.length; i++) {
        if (blocks[i] === currentId) {
            currentSize++;
        } else {
            if (currentId !== '.') {
                files.push({
                    id: currentId as number,
                    size: currentSize,
                    startPos,
                });
            }
            currentId = blocks[i];
            currentSize = 1;
            startPos = i;
        }
    }
    if (currentId !== '.') {
        files.push({ id: currentId as number, size: currentSize, startPos });
    }

    // Sort files by ID in descending order
    files.sort((a, b) => b.id - a.id);

    // Process each file
    for (const file of files) {
        // Find leftmost valid position
        let bestPos = -1;
        let pos = 0;

        // Only look for positions to the left of the current file
        while (pos < file.startPos) {
            // Check if there's enough contiguous free space at this position
            let freeSpace = 0;
            let isContiguous = true;

            for (let i = 0; i < file.size; i++) {
                if (pos + i >= blocks.length || blocks[pos + i] !== '.') {
                    isContiguous = false;
                    break;
                }
                freeSpace++;
            }

            if (isContiguous && freeSpace === file.size) {
                bestPos = pos;
                break; // Take the leftmost valid position
            }

            // Move to next position
            pos++;
        }

        // Move file if we found a valid position
        if (bestPos !== -1) {
            // Clear old position
            for (let i = 0; i < file.size; i++) {
                blocks[file.startPos + i] = '.';
            }
            // Place in new position
            for (let i = 0; i < file.size; i++) {
                blocks[bestPos + i] = file.id;
            }
        }
    }

    // Calculate checksum
    let checksum = 0;
    for (let i = 0; i < blocks.length; i++) {
        if (blocks[i] !== '.') {
            checksum += i * (blocks[i] as number);
        }
    }

    return checksum;
}

const input = readFileSync('./src/day09/puzzle_input09.txt', 'utf-8');
const result = solution(input);
console.log(result);
