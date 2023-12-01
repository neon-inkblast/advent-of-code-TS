import { createArrayOf } from "../../utils/array";
import { readFromFile, readInputFromFile } from "../../utils/io";
import {
  addPoints,
  clampPointInGrid,
  DIRECTIONS,
  isEqual,
  Point,
} from "../../utils/point";

export function part2(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);
  const grid = lines.map((row) => row.split(""));
  // count the number of elves in the starting grid, will never change
  const elfCount = grid.reduce(
    (a, row) => a + row.reduce((a, col) => a + (col === "#" ? 1 : 0), 0),
    0,
  );

  let gridHeight = grid.length;
  let gridWidth = grid[0].length;

  // set up an array with the check direction functions
  const checks = [
    { cfn: checkNorth, dir: DIRECTIONS.U },
    { cfn: checkSouth, dir: DIRECTIONS.D },
    { cfn: checkWest, dir: DIRECTIONS.L },
    { cfn: checkEast, dir: DIRECTIONS.R },
  ];
  function checkNorth(pos: Point, expand: any) {
    if (pos[1] < 1) {
      expand.up = 1;
      return true;
    }
    const spaces = grid[pos[1] - 1].slice(
      Math.max(0, pos[0] - 1),
      Math.min(gridWidth, pos[0] + 2),
    );
    return spaces.every((space) => space === ".");
  }
  function checkSouth(pos: Point, expand: any) {
    if (pos[1] >= gridHeight - 1) {
      expand.down = 1;
      return true;
    }
    const spaces = grid[pos[1] + 1].slice(
      Math.max(0, pos[0] - 1),
      Math.min(gridWidth, pos[0] + 2),
    );
    return spaces.every((space) => space === ".");
  }
  function checkEast(pos: Point, expand: any) {
    if (pos[0] >= gridWidth - 1) {
      expand.right = 1;
      return true;
    }
    const spaces = grid
      .slice(Math.max(0, pos[1] - 1), Math.min(gridHeight, pos[1] + 2))
      .map((row) => row[pos[0] + 1]);
    return spaces.every((space) => space === ".");
  }
  function checkWest(pos: Point, expand: any) {
    if (pos[0] < 1) {
      expand.left = 1;
      return true;
    }
    const spaces = grid
      .slice(Math.max(0, pos[1] - 1), Math.min(gridHeight, pos[1] + 2))
      .map((row) => row[pos[0] - 1]);
    return spaces.every((space) => space === ".");
  }

  // play a round of movey elfy
  function play(grid: string[][]) {
    const moves: Point[][] = [];
    // track whether the grid needs to expand to accomodate moves
    const expand = {
      up: 0,
      down: 0,
      right: 0,
      left: 0,
    };
    // keep track of all spaces that elves propose moving into in step 1
    const contestants: Record<string, number> = {};

    // method to check the spaces surrounding an elf and return true if
    // elf has no neighbouring elves
    function checkAround(pos: Point) {
      let elves = 0;
      const xFrom = clampPointInGrid([pos[0] - 1, pos[1]], grid)[0];
      const xTo = clampPointInGrid([pos[0] + 1, pos[1]], grid)[0];
      const yFrom = clampPointInGrid([pos[0], pos[1] - 1], grid)[1];
      const yTo = clampPointInGrid([pos[0], pos[1] + 1], grid)[1];

      for (let x = xFrom; x <= xTo; x++) {
        for (let y = yFrom; y <= yTo; y++) {
          elves += grid[y][x] === "#" ? 1 : 0;
        }
      }

      return elves < 2;
    }

    // STEP ONE - Plan!
    grid.forEach((row, y) =>
      row.forEach((space, x) => {
        if (space !== ".") {
          let next: Point = [x, y];
          let pos: Point = [x, y];
          // first see if there's any neighbours
          if (checkAround(pos)) {
            next = pos;
          } else {
            // if there is neighbours, check each direction in order
            // and propose moving that way if possible
            checks.forEach((check, i) => {
              if (isEqual(pos, next) && check.cfn(pos, expand)) {
                next = addPoints(pos, check.dir);
              }
            });
          }

          // if a valid move was found, add it to the list of potentials
          if (!isEqual(pos, next)) {
            moves.push([pos, next]);
            const cKey = `${next[0]},${next[1]}`;
            contestants[cKey] = contestants[cKey] ? contestants[cKey] + 1 : 1;
          }
        }
      }),
    );

    // rotate moves array
    checks.push(checks.shift()!);

    // expand grid if necessary
    grid.forEach((row) => {
      if (expand.left) {
        row.unshift(".");
      }
      if (expand.right) {
        row.push(".");
      }
    });
    gridWidth = grid[0].length;
    if (expand.up) {
      grid.unshift(createArrayOf(gridWidth, "."));
    }
    if (expand.down) {
      grid.push(createArrayOf(gridWidth, "."));
    }
    gridHeight = grid.length;

    //STEP TWO - Move!
    moves.forEach(([[px, py], [nx, ny]]) => {
      const cKey = `${nx},${ny}`;
      // if only one elf wants to move to this space, move the elf
      if (contestants[cKey] === 1) {
        grid[py + expand.up][px + expand.left] = ".";
        grid[ny + expand.up][nx + expand.left] = "#";
      }
    });
    return moves.length > 0;
  }

  let stillMoving = true;
  let rounds = 0;
  while (stillMoving) {
    rounds++;
    stillMoving = play(grid);
  }
  // log out the grid to terminal
  // function logGrid() {
  //   console.log(grid.map((row) => row.join("")).join("\n"));
  // }

  // logGrid();
  return rounds;
}
