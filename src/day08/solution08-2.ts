import { readFileSync } from 'fs';
import { join } from 'path';

function findAntinodes(input: string): number {
    const grid = input.split('\n').map((line) => line.split(''));
    const height = grid.length;
    const width = grid[0].length;

    const antennasByFreq: Map<string, Array<[number, number]>> = new Map();

    // Find all antennas
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const char = grid[y][x];
            if (char !== '.') {
                if (!antennasByFreq.has(char)) {
                    antennasByFreq.set(char, []);
                }
                antennasByFreq.get(char)!.push([x, y]);
            }
        }
    }

    const antinodes = new Set<string>();

    // For each frequency group
    for (const [_, antennas] of antennasByFreq) {
        // Skip if there's only one antenna of this frequency
        if (antennas.length < 2) continue;

        // Check each pair of antennas
        for (let i = 0; i < antennas.length; i++) {
            for (let j = i + 1; j < antennas.length; j++) {
                const [x1, y1] = antennas[i];
                const [x2, y2] = antennas[j];

                // Calculate direction vector
                const dx = x2 - x1;
                const dy = y2 - y1;

                // Check every point in the grid
                for (let x = 0; x < width; x++) {
                    for (let y = 0; y < height; y++) {
                        // Check if point is collinear using cross product
                        const crossProduct = Math.abs(
                            (x - x1) * (y2 - y1) - (y - y1) * (x2 - x1)
                        );

                        // Use a slightly larger epsilon for better collinearity detection
                        if (crossProduct < 0.01) {
                            antinodes.add(`${x},${y}`);
                        }
                    }
                }
            }
        }

        // Add all antenna positions of this frequency
        for (const [x, y] of antennas) {
            antinodes.add(`${x},${y}`);
        }
    }

    return antinodes.size;
}

// Read and solve
const input = readFileSync(join(__dirname, 'puzzle_input08.txt'), 'utf-8');
console.log('Solution:', findAntinodes(input));
