import { readFileSync } from 'fs';
import { join } from 'path';

type Direction = 'up' | 'right' | 'down' | 'left';
type Position = { x: number; y: number };

function solve(): number {
    const input = readFileSync(join(__dirname, 'puzzle_input06.txt'), 'utf-8')
        .split('\n')
        .filter((line) => line.length > 0);

    const grid = input.map((line) => line.split(''));

    // Find starting position (^)
    let startPos: Position = { x: 0, y: 0 };
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] === '^') {
                startPos = { x, y };
                break;
            }
        }
    }

    // Try placing an obstacle at each empty position
    let loopPositions = 0;
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            // Skip if position is not empty or is start position
            if (grid[y][x] !== '.' || (x === startPos.x && y === startPos.y)) {
                continue;
            }

            // Create a copy of the grid with new obstacle
            const testGrid = grid.map((row) => [...row]);
            testGrid[y][x] = '#';

            if (createsLoop(testGrid, startPos)) {
                loopPositions++;
            }
        }
    }

    return loopPositions;
}

function createsLoop(grid: string[][], startPos: Position): boolean {
    let currentPos = { ...startPos };
    let currentDir: Direction = 'up';
    const visited = new Set<string>();
    const maxSteps = grid.length * grid[0].length * 4; // Increased to allow for loop detection
    let steps = 0;

    while (steps < maxSteps) {
        const posKey = `${currentPos.x},${currentPos.y},${currentDir}`;

        // If we've seen this position and direction before, it's a loop
        if (visited.has(posKey)) {
            return true;
        }

        visited.add(posKey);
        steps++;

        const nextPos = getNextPosition(currentPos, currentDir);

        // Check if out of bounds
        if (isOutOfBounds(nextPos, grid)) {
            return false;
        }

        if (isObstacle(nextPos, grid)) {
            currentDir = turnRight(currentDir);
        } else {
            currentPos = nextPos;
        }
    }

    return false;
}

function isOutOfBounds(pos: Position, grid: string[][]): boolean {
    return (
        pos.y < 0 ||
        pos.y >= grid.length ||
        pos.x < 0 ||
        pos.x >= grid[0].length
    );
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
    return isOutOfBounds(pos, grid) || grid[pos.y][pos.x] === '#';
}

function turnRight(dir: Direction): Direction {
    const directions: Direction[] = ['up', 'right', 'down', 'left'];
    const currentIndex = directions.indexOf(dir);
    return directions[(currentIndex + 1) % 4];
}

console.log('Solution:', solve());
