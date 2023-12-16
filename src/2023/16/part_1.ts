import { DIRECTIONS, Direction, Point, addPoints, getElementByPoint, isInGrid } from "../../utils";
import { readInputFromFile } from "../../utils/io";

export type LaserPointer = { dir: Direction; loc: Point };
const what: Record<string, Partial<Record<Direction, Direction[]>>> = {
  "|": { L: ["U", "D"], R: ["U", "D"], U: ["U"], D: ["D"] },
  "-": { U: ["L", "R"], D: ["L", "R"], R: ["R"], L: ["L"] },
  "/": { U: ["R"], D: ["L"], R: ["U"], L: ["D"] },
  ".": { U: ["U"], D: ["D"], R: ["R"], L: ["L"] },
  "\\": { U: ["L"], D: ["R"], R: ["D"], L: ["U"] },
};
export function part1(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);
  const grid = lines.map((line) => line.split(""));

  return calcEnergy(grid);
}

export function calcEnergy(grid: string[][], start: LaserPointer = { dir: "R", loc: [-1, 0] }) {
  const energized = new Set<string>();
  const beamed = new Set<string>();
  let beams: LaserPointer[] = [start];

  while (beams.length > 0) {
    let newBeams: { dir: Direction; loc: Point }[] = [];
    beams.forEach((beam) => {
      const next = addPoints(beam.loc, DIRECTIONS[beam.dir]);
      if (!beamed.has(`${beam.loc[0]},${beam.loc[1]},${beam.dir}`)) {
        beamed.add(`${beam.loc[0]},${beam.loc[1]},${beam.dir}`);
        if (isInGrid(next, grid)) {
          const gridLoc = getElementByPoint(next, grid);
          what[gridLoc!][beam.dir]!.forEach((d) => newBeams.push({ dir: d, loc: next }));
          energized.add(`${next[0]},${next[1]}`);
        }
      }
    });
    beams = newBeams;
  }

  // const egrid = grid.map((row) => [...row]);
  // for (let v of energized.keys()) {
  //   const [x, y] = v.split(",");
  //   egrid[+y][+x] = "#";
  // }
  // console.log(egrid.map((row) => row.join("")).join("\n"));

  return energized.size;
}
