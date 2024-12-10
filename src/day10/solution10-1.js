"use strict";
// solution10-1.ts
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
function readInput() {
    var input = fs.readFileSync(path.join(__dirname, 'puzzle_input10.txt'), 'utf8');
    return input
        .trim()
        .split('\n')
        .map(function (line) { return line.split('').map(Number); });
}
function isValidPosition(grid, row, col) {
    return row >= 0 && row < grid.length && col >= 0 && col < grid[0].length;
}
function findTrailheads(grid) {
    var trailheads = [];
    for (var row = 0; row < grid.length; row++) {
        for (var col = 0; col < grid[0].length; col++) {
            if (grid[row][col] === 0) {
                trailheads.push([row, col]);
            }
        }
    }
    return trailheads;
}
function calculateTrailheadScore(grid, startRow, startCol) {
    var visited = new Set();
    var reachableNines = new Set();
    function dfs(row, col, currentHeight) {
        var key = "".concat(row, ",").concat(col);
        if (!isValidPosition(grid, row, col) || visited.has(key))
            return;
        var height = grid[row][col];
        if (height !== currentHeight + 1)
            return;
        visited.add(key);
        if (height === 9) {
            reachableNines.add(key);
        }
        // Try all four directions
        var directions = [
            [0, 1],
            [1, 0],
            [0, -1],
            [-1, 0],
        ];
        for (var _i = 0, directions_2 = directions; _i < directions_2.length; _i++) {
            var _a = directions_2[_i], dr = _a[0], dc = _a[1];
            dfs(row + dr, col + dc, height);
        }
    }
    // Start the search from each trailhead
    var directions = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
    ];
    for (var _i = 0, directions_1 = directions; _i < directions_1.length; _i++) {
        var _a = directions_1[_i], dr = _a[0], dc = _a[1];
        visited.clear();
        dfs(startRow + dr, startCol + dc, 0);
    }
    return reachableNines.size;
}
function solve() {
    var grid = readInput();
    var trailheads = findTrailheads(grid);
    var totalScore = 0;
    for (var _i = 0, trailheads_1 = trailheads; _i < trailheads_1.length; _i++) {
        var _a = trailheads_1[_i], row = _a[0], col = _a[1];
        var score = calculateTrailheadScore(grid, row, col);
        totalScore += score;
    }
    return totalScore;
}
console.log(solve());
