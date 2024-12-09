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
    const pageIndices = new Map(pages.map((page, index) => [page, index]));

    for (const rule of rules) {
        if (pageIndices.has(rule.before) && pageIndices.has(rule.after)) {
            const beforeIndex = pageIndices.get(rule.before)!;
            const afterIndex = pageIndices.get(rule.after)!;

            if (beforeIndex > afterIndex) {
                return false;
            }
        }
    }

    return true;
}

function sortPages(pages: number[], rules: Rule[]): number[] {
    // Create a graph of dependencies
    const graph = new Map<number, Set<number>>();
    const inDegree = new Map<number, number>();

    // Initialize graph and inDegree for all pages
    pages.forEach((page) => {
        graph.set(page, new Set());
        inDegree.set(page, 0);
    });

    // Build the graph based on rules
    for (const rule of rules) {
        if (pages.includes(rule.before) && pages.includes(rule.after)) {
            graph.get(rule.before)!.add(rule.after);
            inDegree.set(rule.after, (inDegree.get(rule.after) || 0) + 1);
        }
    }

    // Topological sort using Kahn's algorithm
    const result: number[] = [];
    const queue: number[] = [];

    // Add all nodes with no dependencies to queue
    pages.forEach((page) => {
        if (inDegree.get(page) === 0) {
            queue.push(page);
        }
    });

    while (queue.length > 0) {
        // Sort queue to ensure deterministic ordering when multiple nodes have no dependencies
        queue.sort((a, b) => b - a); // Sort in descending order
        const current = queue.shift()!;
        result.push(current);

        for (const next of graph.get(current)!) {
            inDegree.set(next, inDegree.get(next)! - 1);
            if (inDegree.get(next) === 0) {
                queue.push(next);
            }
        }
    }

    return result;
}

function getMiddleNumber(arr: number[]): number {
    return arr[Math.floor(arr.length / 2)];
}

export function solve(input: string): number {
    const { rules, updates } = parseInput(input);

    // Find invalid updates and sort them
    const invalidUpdatesSorted = updates
        .filter((update) => !isValidOrder(update, rules))
        .map((update) => sortPages(update, rules));

    // Get middle numbers of sorted invalid updates and sum them
    return invalidUpdatesSorted
        .map(getMiddleNumber)
        .reduce((sum, num) => sum + num, 0);
}

import { readFileSync } from 'fs';
import { join } from 'path';

const input = readFileSync(join(__dirname, 'puzzle_input.txt'), 'utf-8');
console.log('Solution:', solve(input));
