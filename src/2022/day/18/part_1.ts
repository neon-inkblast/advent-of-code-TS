import { create3dArrayOf, sum } from "../../../utils/array";
import { readInputFromFile } from "../../../utils/io";

export function part1(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);

  let grid: boolean[][][] = [];
  let xRange = [9999, 0];
  let yRange = [9999, 0];
  let zRange = [9999, 0];
  const cubes: [number, number, number][] = [];

  lines.forEach((line) => {
    const [x, y, z] = line
      .trim()
      .split(",")
      .map((n) => +n);

    // find the min max range for the input cube coordinates
    xRange[0] = Math.min(xRange[0], x);
    xRange[1] = Math.max(xRange[1], x);
    yRange[0] = Math.min(yRange[0], y);
    yRange[1] = Math.max(yRange[1], y);
    zRange[0] = Math.min(zRange[0], z);
    zRange[1] = Math.max(zRange[1], z);

    // add to an array of cubes
    cubes.push([x, y, z]);
  });

  // create a 3d grid space of possible cube positions
  grid = create3dArrayOf(xRange[1] + 2, yRange[1] + 2, zRange[1] + 2, false);
  // set each position in grid space where there is a cube to true
  cubes.forEach(([x, y, z]) => (grid[x][y][z] = true));

  // sum contributing faces from each cube to find the surface area of the shape
  const area = sum(
    cubes.map(([x, y, z]) => {
      // start with a 6 faces contributing to surface area
      let faces = 6;

      // check all neighbours in each axis
      // each time a cube exists in a neighbouring position
      // decrease contributing faces by 1
      if (x > xRange[0] && grid[x - 1][y][z]) {
        faces -= 1;
      }
      if (grid[x + 1][y][z]) {
        faces -= 1;
      }

      if (y > yRange[0] && grid[x][y - 1][z]) {
        faces -= 1;
      }

      if (grid[x][y + 1][z]) {
        faces -= 1;
      }

      if (z > zRange[0] && grid[x][y][z - 1]) {
        faces -= 1;
      }

      if (grid[x][y][z + 1]) {
        faces -= 1;
      }

      return faces;
    }),
  );

  return area;
}
