import { readFileSync } from 'fs';
import { join } from 'path';

type Direction = 'up' | 'right' | 'down' | 'left';
type Position = { x: number; y: number };

function solve(): number {
    // Read and parse input
    const input = readFileSync(join(__dirname, 'puzzle_input.txt'), 'utf-8')
        .split('\n')
        .filter((line) => line.length > 0);

    const grid = input.map((line) => line.split(''));

    // Find starting position (^)
    let currentPos: Position = { x: 0, y: 0 };
    let currentDir: Direction = 'up';

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] === '^') {
                currentPos = { x, y };
                break;
            }
        }
    }

    // Track visited positions using Set
    const visited = new Set<string>();
    visited.add(`${currentPos.x},${currentPos.y}`);

    let steps = 0;
    const maxSteps = grid.length * grid[0].length; // Maximum possible steps

    while (steps < maxSteps) {
        steps++;

        // Check if there's an obstacle in front
        const nextPos = getNextPosition(currentPos, currentDir);

        // Break if out of bounds
        if (
            nextPos.y < 0 ||
            nextPos.y >= grid.length ||
            nextPos.x < 0 ||
            nextPos.x >= grid[0].length
        ) {
            break;
        }

        const hasObstacle = isObstacle(nextPos, grid);

        if (hasObstacle) {
            // Turn right
            currentDir = turnRight(currentDir);
        } else {
            // Move forward
            currentPos = nextPos;
            // Add to visited
            visited.add(`${currentPos.x},${currentPos.y}`);
        }
    }

    return visited.size;
}

function getNextPosition(pos: Position, dir: Direction): Position {
    switch (dir) {
        case 'up':
            return { x: pos.x, y: pos.y - 1 };
        case 'right':
            return { x: pos.x + 1, y: pos.y };
        case 'down':
            return { x: pos.x, y: pos.y + 1 };
        case 'left':
            return { x: pos.x - 1, y: pos.y };
    }
}

function isObstacle(pos: Position, grid: string[][]): boolean {
    if (
        pos.y < 0 ||
        pos.y >= grid.length ||
        pos.x < 0 ||
        pos.x >= grid[0].length
    ) {
        return true;
    }
    return grid[pos.y][pos.x] === '#';
}

function turnRight(dir: Direction): Direction {
    const directions: Direction[] = ['up', 'right', 'down', 'left'];
    const currentIndex = directions.indexOf(dir);
    return directions[(currentIndex + 1) % 4];
}

console.log('Solution:', solve());
