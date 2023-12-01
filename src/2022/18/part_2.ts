import { create3dArrayOf, sum } from "../../utils/array";
import { readInputFromFile } from "../../utils/io";
import { Point3D } from "../../utils/point";

type CubeDetail = {
  isCube: boolean;
  external: boolean;
  visited?: boolean;
  queued?: boolean;
};
export function part2(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);

  let grid: CubeDetail[][][] = [];
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
  // plus 2 to compensate for elf indexing and xyz + 1 checks
  // fill with objects that describe each position as having a cube and
  // whether it can be considered external
  // get the dimensions of the grid;
  const width = xRange[1] + 2;
  const height = yRange[1] + 2;
  const depth = zRange[1] + 2;
  grid = create3dArrayOf(width, height, depth, () => ({
    isCube: false,
    external: false,
  }));

  // set actual cubes in the space, but leave the  "external surface" flag false
  cubes.forEach(([x, y, z]) => {
    grid[x][y][z] = { isCube: true, external: false };
  });

  // choose a node in space outside the input shape
  // this can be found at the extreme of each dimension,
  // since the space was initialised slightly larger than the input set
  const outsideNode: Point3D = [width - 1, height - 1, depth - 1];

  // perform a BF search of the space, starting at the outside node
  function search(grid: CubeDetail[][][], start: Point3D) {
    const pQueue = [start];
    while (pQueue.length > 0) {
      const [x, y, z] = pQueue.shift()!;

      // the set of neighbours to consider
      const neighbours: Point3D[] = [
        [x + 1, y, z],
        [x - 1, y, z],
        [x, y + 1, z],
        [x, y - 1, z],
        [x, y, z + 1],
        [x, y, z - 1],
      ]
        // filtered on...
        .filter(([x, y, z]) => {
          // if not even in the 3D space, disregard
          if (
            x < 0 ||
            x > xRange[1] + 1 ||
            y < 0 ||
            y > yRange[1] + 1 ||
            z < 0 ||
            z > zRange[1] + 1
          ) {
            return false;
          }
          // neighbour exists in the space, set external flag to true
          grid[x][y][z].external = true;
          // if already queued (visited?), disregard
          if (grid[x][y][z].queued || grid[x][y][z].isCube) {
            return false;
          }
          // otherwise, set it as queued, and add it to the search queue
          grid[x][y][z].queued = true;
          return true;
        }) as Point3D[];
      pQueue.push(...neighbours);
    }
  }

  // search through the space to find all cubes
  // on the exterior of the shape, and mark them as external
  search(grid, outsideNode);

  function checkCube(x: number, y: number, z: number) {
    return (
      x >= 0 &&
      y >= 0 &&
      z >= 0 &&
      (grid[x][y][z].isCube || !grid[x][y][z].external)
    );
  }

  // sum up the faces of all external cubes
  const area = sum(
    cubes.map(([x, y, z]) => {
      // if cube is internal, disregard completely
      if (grid[x][y][z].external === false) {
        return 0;
      }
      // otherwise check neighbours
      let faces = 6;
      [
        [x + 1, y, z],
        [x - 1, y, z],
        [x, y + 1, z],
        [x, y - 1, z],
        [x, y, z + 1],
        [x, y, z - 1],
      ].forEach(
        ([x, y, z]) =>
          // if neighbour exists and this face
          // is adjacent to a cube or a space that
          // isn't external, reduce face count by 1
          (faces -= checkCube(x, y, z) ? 1 : 0),
      );

      return faces;
    }),
  );

  return area;
}
