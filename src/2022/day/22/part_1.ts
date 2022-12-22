import { create2dArrayOf, max, splitOnEmpty } from "../../../utils/array";
import { readInputFromFile } from "../../../utils/io";
import { mod } from "../../../utils/math";
import { addPoints, DIRECTIONS, Point } from "../../../utils/point";
// R D L U
type DirectionKey = 0 | 1 | 2 | 3;
type Command = {
  type: "walk" | "turn";
  amount: number;
};
export type Vec4<T = number> = [T, T, T, T];
export function part1(input?: string[]) {
  const moveDirections: Vec4<Point> = [
    DIRECTIONS.R,
    DIRECTIONS.D,
    DIRECTIONS.L,
    DIRECTIONS.U,
  ];

  const lines = input ?? readInputFromFile(__dirname);
  const [map, instructionString] = splitOnEmpty(lines);
  const instructions: Command[] = [
    ...instructionString[0].matchAll(/(\d+|\D)/g),
  ].map((i) => {
    const match = i[1];
    if (match === "R") {
      return { type: "turn", amount: 1 };
    }
    if (match === "L") {
      return { type: "turn", amount: -1 };
    }

    return { type: "walk", amount: +i[1] };
  });

  const gridWidth = max(map.map((r) => r.length));

  const grid = create2dArrayOf(map.length, gridWidth, () => " ");

  map.forEach((row, y) => {
    row.split("").forEach((col, x) => {
      grid[y][x] = col;
    });
  });

  let heading: DirectionKey = 0;
  let position: Point = [grid[0].findIndex((x) => x !== " "), 0];

  instructions.forEach((instruction, iNum) => {
    if (instruction.type === "walk") {
      // walk forwards
      walk(instruction.amount);
    } else if (instruction.type === "turn") {
      // rotate, changing heading a step left or right
      heading = mod(
        heading + instruction.amount,
        moveDirections.length,
      ) as DirectionKey;
    }
  });

  function walk(n: number) {
    let next = findNextPosition(position);
    let steps = n;
    // while there's still steps to move and the next move isn't a wall
    while (steps > 0 && getGridValue(next) !== "#") {
      // move to next position
      position = next;
      // decrement steps taken
      steps--;
      // find the next position
      next = findNextPosition(position);
    }
  }

  function findNextPosition(pos: Point): Point {
    // get next position
    const next = addPoints(pos, moveDirections[heading]);

    // wrap the position around the entire grid
    next[0] = mod(next[0], gridWidth);
    next[1] = mod(next[1], grid.length);

    // move the position forward in the current direction until it's back on the map
    if (getGridValue(next) === " ") {
      switch (heading) {
        // find next valid map space to the right
        case 0: {
          return [grid[next[1]].findIndex((x) => x !== " "), next[1]];
        }
        // find next valid map space, moving downwards
        case 1: {
          for (let i = 0; i < grid.length; i++) {
            if (getGridValue([next[0], i]) !== " ") {
              return [next[0], i];
            }
          }
        }
        // find next valid map space to the left
        case 2: {
          const backRow = grid[next[1]].slice().reverse();
          return [gridWidth - 1 - backRow.findIndex((x) => x !== " "), next[1]];
        }
        // find next valid map space, moving up
        case 3: {
          for (let i = grid.length - 1; i >= 0; i--) {
            if (getGridValue([next[0], i]) !== " ") {
              return [next[0], i];
            }
          }
        }
      }
    }
    return next;
  }

  // get value of a square from the grid
  function getGridValue(next: Point) {
    return grid[next[1]][next[0]];
  }

  // calculate password
  const password = 1000 * (1 + position[1]) + 4 * (1 + position[0]) + heading;

  return password;
}
