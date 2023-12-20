import { Point, readInputFromFile, toNumbers } from "../../utils";
import { createGetNeighbours, createNode, dijkstraSearch } from "./helpers";

export function part1(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);
  const MAX_STRAIGHT_MOVES = 3;
  const MIN_STRAIGHT_MOVES = 1;

  // convert the input to a 2D array
  const grid = lines.map((line, r) => toNumbers(line.split("")));

  // grid bounds
  const gridHeight = grid.length;
  const gridWidth = grid[0].length;
  // start and target position
  const start = createNode([0, 0], 0, null, grid);
  const target: Point = [gridHeight - 1, gridWidth - 1];
  // reset start score to 0
  start.score = 0;

  const getNeighbours = createGetNeighbours(MIN_STRAIGHT_MOVES, MAX_STRAIGHT_MOVES, grid);

  // return final answer
  return dijkstraSearch(start, target, getNeighbours);
}
