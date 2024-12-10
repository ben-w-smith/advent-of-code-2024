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
        // Check each pair of antennas
        for (let i = 0; i < antennas.length; i++) {
            for (let j = i + 1; j < antennas.length; j++) {
                const [x1, y1] = antennas[i];
                const [x2, y2] = antennas[j];

                // Check every grid point between and around the antennas
                const minX = Math.min(x1, x2) - Math.abs(x2 - x1);
                const maxX = Math.max(x1, x2) + Math.abs(x2 - x1);
                const minY = Math.min(y1, y2) - Math.abs(y2 - y1);
                const maxY = Math.max(y1, y2) + Math.abs(y2 - y1);

                for (
                    let x = Math.max(0, minX);
                    x <= Math.min(width - 1, maxX);
                    x++
                ) {
                    for (
                        let y = Math.max(0, minY);
                        y <= Math.min(height - 1, maxY);
                        y++
                    ) {
                        const dist1 = distance(x, y, x1, y1);
                        const dist2 = distance(x, y, x2, y2);

                        // Check if point is collinear with antennas
                        const crossProduct = Math.abs(
                            (x - x1) * (y2 - y1) - (y - y1) * (x2 - x1)
                        );
                        const isCollinear = crossProduct < 0.0001;

                        // Check if one distance is twice the other
                        const epsilon = 0.0001;
                        if (
                            isCollinear &&
                            dist1 > 0 &&
                            dist2 > 0 &&
                            (Math.abs(dist1 / dist2 - 0.5) < epsilon ||
                                Math.abs(dist2 / dist1 - 0.5) < epsilon)
                        ) {
                            antinodes.add(`${x},${y}`);
                        }
                    }
                }
            }
        }
    }

    return antinodes.size;
}

// Add helper function for distance calculation
function distance(x1: number, y1: number, x2: number, y2: number): number {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
}

// Read and solve
const input = readFileSync(join(__dirname, 'puzzle_input08.txt'), 'utf-8');
console.log('Solution:', findAntinodes(input));
