import {
  DIRECTIONS,
  Direction,
  Point,
  addPoints,
  create2dArrayOf,
  createArrayOf,
  getElementByPoint,
  isInGrid,
  pointToString,
  setElementByPoint,
} from "../../utils";
import { readInputFromFile } from "../../utils/io";

export function part1(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);
  const instructions = lines.map((line) => {
    const [instr, amount, colours] = line.split(" ");
    return { instr, amount, colours };
  });
  // create a grid 3x3 of "." to signify empty space
  let grid = create2dArrayOf(3, 3, () => ".");
  let current: Point = [1, 1];
  // start at 1,1 and mark as #, the start of the perimeter trench
  setElementByPoint(current, grid, "#");

  // continue through the instructions drawing "#" where
  // the perimeter trench is dug out
  // if necessary, expand the grid to fit the instruction
  instructions.forEach(({ instr, amount }) => {
    for (let i = +amount; i > 0; i--) {
      current = addPoints(current, DIRECTIONS[instr as Direction]);
      if (!isInGrid(current, grid)) {
        switch (instr) {
          case "U":
            addRowAbove(grid);
            current = addPoints(current, DIRECTIONS.D);
            break;

          case "D":
            addRowBelow(grid);
            break;
          case "L":
            addColLeft(grid);
            current = addPoints(current, DIRECTIONS.R);
            break;
          case "R":
            addColRight(grid);
            break;
        }
      }
      setElementByPoint(current, grid, "#");
    }
  });

  // helpers for adding extra rows/columns to grid
  function addRowAbove(grid: string[][]) {
    grid.unshift(createArrayOf(grid[0].length, "."));
  }
  function addRowBelow(grid: string[][]) {
    grid.push(createArrayOf(grid[0].length, "."));
  }
  function addColLeft(grid: string[][]) {
    grid.forEach((row) => row.unshift("."));
  }
  function addColRight(grid: string[][]) {
    grid.forEach((row) => row.push("."));
  }

  // after finishing the instructions,
  // expand the grid again to ensure that the edge points
  // are all empty space
  addColLeft(grid);
  addRowAbove(grid);
  addRowBelow(grid);
  addColRight(grid);

  // run a BFS from 0,0 (an empty space) and count all of the
  // points that are outside the trench/perimeter loop
  let visited = new Set();
  let count = 0;
  let queue: Point[] = [[0, 0]];
  while (queue.length > 0) {
    let qcurrent = queue.pop()!;
    if (visited.has(pointToString(qcurrent))) {
      continue;
    }
    count++;
    visited.add(pointToString(qcurrent));
    const cardinals: Direction[] = ["D", "U", "L", "R"];
    const neighbours = cardinals
      .map((d) => {
        const newPoint = addPoints(qcurrent, DIRECTIONS[d]);

        return newPoint;
      })
      .filter(
        (newPoint) =>
          isInGrid(newPoint, grid) &&
          !visited.has(pointToString(newPoint)) &&
          getElementByPoint(newPoint, grid) !== "#",
      );
    queue.push(...(neighbours as Point[]));
  }

  // get the area of the grid
  const gridTotal = grid.length * grid[0].length;
  // subtract the outside points to find the inside points
  return gridTotal - count;
}
