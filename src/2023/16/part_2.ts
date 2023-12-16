import { DIRECTIONS, Direction, Point, addPoints, getElementByPoint, isInGrid } from "../../utils";
import { readInputFromFile } from "../../utils/io";
import { calcEnergy, part1 } from "./part_1";

export function part2(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);
  const grid = lines.map((line) => line.split(""));

  let maxFound = 0;
  for (let x = 0; x < grid[0].length; x++) {
    maxFound = Math.max(maxFound, calcEnergy(grid, { dir: "D", loc: [x, -1] }));
    maxFound = Math.max(maxFound, calcEnergy(grid, { dir: "U", loc: [x, grid.length] }));
  }
  for (let y = 0; y < grid.length; y++) {
    maxFound = Math.max(maxFound, calcEnergy(grid, { dir: "R", loc: [-1, y] }));
    maxFound = Math.max(maxFound, calcEnergy(grid, { dir: "L", loc: [grid[0].length, y] }));
  }
  return maxFound;
}
