import { Point, readInputFromFile, toNumbers } from "../../utils";
import { createGetNeighbours, createNode, dijkstraSearch } from "./helpers";

export function part2(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);
  const MAX_STRAIGHT_MOVES = 10;
  const MIN_STRAIGHT_MOVES = 4;
  const grid = lines.map((line, r) => toNumbers(line.split("")));

  const gridHeight = grid.length;
  const gridWidth = grid[0].length;
  const start = createNode([0, 0], 0, null, grid);
  const target: Point = [gridHeight - 1, gridWidth - 1];
  start.score = 0;

  const getNeighbours = createGetNeighbours(MIN_STRAIGHT_MOVES, MAX_STRAIGHT_MOVES, grid);

  return dijkstraSearch(start, target, getNeighbours);
}
