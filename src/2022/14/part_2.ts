import { create2dArrayOf, createArrayOf } from "../../utils/array";
import { readInputFromFile } from "../../utils/io";
import {
  addPoints,
  DIRECTIONS,
  getElementByPoint,
  isEqual,
  isInGrid,
  Point,
  setElementByPoint,
} from "../../utils/point";

type SandIcons = "█" | "*" | " " | "+";

export function part2(input?: string[], log = false) {
  const inLines = input ?? readInputFromFile(__dirname);
  const xRange = [-1, -1];
  const yRange = [-1, -1];

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

  // +1 to offset 0-index
  const width = xRange[1] - xRange[0] + 1;
  const height = yRange[1] + 1;
  // set the offset for x so we don't have to make an array
  // with ~500 empty cols per row
  let xOffset = xRange[0];
  let sandSpawn: Point = [500 - xOffset, 0];

  // create a 2D visual/data grid of the rocks/sand
  const grid: SandIcons[][] = create2dArrayOf(height, width, () => " ");
  // add an empty row of air
  grid.push(createArrayOf(width, () => " "));
  // add a filled row of rock
  grid.push(createArrayOf(width, () => "█"));

  // add rocks to grid
  lines.forEach((coords) => {
    for (let i = 1; i < coords.length; i++) {
      const [px, py] = coords[i - 1];
      const [x, y] = coords[i];
      // horizontal rocks
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

  // draw the sand spawner
  setElementByPoint(sandSpawn, grid, "+");

  let isBlocked = false;
  let sandCounter = 0;
  while (!isBlocked) {
    let isFalling = true;
    let sand: Point = sandSpawn;
    while (isFalling) {
      if (sand[0] === 0) {
        grid.forEach((row, index) => {
          row.unshift(index === grid.length - 1 ? "█" : " ");
        });
        sand[0] = 1;
        xOffset -= 1;
        sandSpawn[0] = 500 - xOffset;
      }
      if (sand[0] === grid[0].length - 1) {
        grid.forEach((row, index) => {
          row.push(index === grid.length - 1 ? "█" : " ");
        });
      }
      // check below, down and to the left, down and to the right
      const below = addPoints(sand, DIRECTIONS.D);
      const belowLeft = addPoints(sand, DIRECTIONS.DL);
      const belowRight = addPoints(sand, DIRECTIONS.DR);
      // filter valid moves, in priority order
      const valid = [below, belowLeft, belowRight].filter(
        (p) => isInGrid(p, grid) && getElementByPoint(p, grid) === " ",
      );

      if (valid.length > 0) {
        // if a move was valid set sand to this valid point
        sand = valid[0];
      } else {
        // no valid move found, sand will be painted in place
        setElementByPoint(sand, grid, "*");
        // increment sand counter
        sandCounter++;
        // exit inner loop
        isFalling = false;
      }
      // if the sand is stuck at the spawn
      // end the simulation
      if (isEqual(sand, sandSpawn)) {
        isBlocked = true;
      }
    }
  }
  if (log) {
    grid.forEach((line, i) => console.log(pad(i), ":", line.join("")));
    console.log("Grains of sand:", sandCounter);
  }
  return sandCounter;
}

function pad(n: number) {
  let pad = "000";
  let i = n.toString().length - 1;
  return pad.slice(i) + n;
}
