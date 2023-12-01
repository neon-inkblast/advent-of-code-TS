import { create2dArrayOf } from "../../utils/array";
import { readInputFromFile } from "../../utils/io";
import {
  addPoints,
  DIRECTIONS,
  getElementByPoint,
  isInGrid,
  Point,
  setElementByPoint,
} from "../../utils/point";

type SandIcons = "█" | "*" | " " | "+";

export function part1(input?: string[], log = false) {
  const inLines = input ?? readInputFromFile(__dirname);
  const xRange: Point = [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY];
  const yRange: Point = [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY];

  // parse lines, map to coordinate pairs
  // find the min/max range in either axis
  const lines = inLines.map((line) => {
    const coords = line.split("->").map((co) => {
      const [x, y] = co
        .trim()
        .split(",")
        .map((i) => +i);

      xRange[0] = Math.min(x, xRange[0]);
      xRange[1] = Math.max(x, xRange[1]);
      yRange[0] = Math.min(y, yRange[0]);
      yRange[1] = Math.max(y, yRange[1]);
      return [x, y] as Point;
    });
    return coords;
  });

  // set up a grid, prefill with empty/air value
  // +1 for compatible proper indexing
  const grid: SandIcons[][] = create2dArrayOf(
    yRange[1] + 1,
    xRange[1] - xRange[0] + 2,
    () => " ",
  );
  // set the xOffset to the min range + half the added amount
  const xOffset = xRange[0] - 1;
  // set the snow spawn point
  const snowSpawn: Point = [500 - xOffset, 0];

  lines.forEach((coords) => {
    for (let i = 1; i < coords.length; i++) {
      const [px, py] = coords[i - 1];
      const [x, y] = coords[i];

      // x lines
      const xFrom = Math.min(x, px);
      const xTo = Math.max(x, px);
      for (let d = xFrom; d <= xTo; d++) {
        setElementByPoint([d - xOffset, y], grid, "█");
      }
      // vertical rocks
      const yFrom = Math.min(y, py);
      const yTo = Math.max(y, py);
      for (let d = yFrom; d <= yTo; d++) {
        setElementByPoint([x - xOffset, d], grid, "█");
      }
    }
  });

  // draw the snow spawner
  setElementByPoint(snowSpawn, grid, "+");

  // set a flag for ending the sim
  // and counter for counting sand
  let isOutOfBounds = false;
  let sandCounter = 0;

  // while all sand falling in the grid
  while (!isOutOfBounds) {
    let isFalling = true;
    // make a new sand
    let grain: Point = snowSpawn;
    // if this grain is falling, loop
    while (isFalling) {
      // check below, down and to the left, down and to the right
      const below = addPoints(grain, DIRECTIONS.D);
      const belowLeft = addPoints(grain, DIRECTIONS.DL);
      const belowRight = addPoints(grain, DIRECTIONS.DR);
      // filter valid moves, in priority order
      const valid = [below, belowLeft, belowRight].filter(
        (p) => isInGrid(p, grid) && getElementByPoint(p, grid) === " ",
      );

      if (valid.length > 0) {
        // if a move was valid set sand to this valid point
        grain = valid[0];
      } else {
        // no valid move found, sand will be painted in place
        setElementByPoint(grain, grid, "*");
        // increment sand counter
        sandCounter++;
        // exit inner loop
        isFalling = false;
      }
      // if the sand would move off the grid in the y axis
      // end the simulation
      if (addPoints(grain, DIRECTIONS.D)[1] >= grid.length) {
        isOutOfBounds = true;
        break;
      }
    }
  }

  if (log) {
    grid.forEach((line, i) => console.log(line.join("")));
    console.log("Grains of sand: ", sandCounter);
  }

  return sandCounter;
}

part1();
