import { Point, addPoints, manhDistBetween, sum } from "../../utils";
import { readInputFromFile } from "../../utils/io";

export function part1(input?: string[]) {
  // galaxy token
  const GALAXY = "#";

  const lines = input ?? readInputFromFile(__dirname);

  const colHasGalaxy = new Array(lines[0].length).fill(false);
  const rowHasGalaxy = new Array(lines[0].length).fill(false);

  const galaxyList: Point[] = [];
  const distances: number[] = [];

  lines.forEach((line, row) => {
    let hasGalaxy = false;
    line.split("").forEach((location, col) => {
      // if there is a galaxy in this location
      // flag the column and row as being non-empty
      // add the location to the list of galaxies
      if (location === GALAXY) {
        colHasGalaxy[col] = hasGalaxy = true;
        galaxyList.push([col, row]);
      }
    });
    // flag the row as being non-empty
    rowHasGalaxy[row] = hasGalaxy;
  });

  // create a list of the additional distance at each column
  const colOffset = colHasGalaxy.reduce((acc, el) => {
    const last = acc[acc.length - 1] ?? 0;
    acc.push(last + (el ? 0 : 1));
    return acc;
  }, []);

  // create a list of the additional distance at each row
  const rowOffset = rowHasGalaxy.reduce((acc, el) => {
    const last = acc[acc.length - 1] ?? 0;
    acc.push(last + (el ? 0 : 1));
    return acc;
  }, []);

  // sum up the distances between all galaxy pairs
  galaxyList.forEach((galaxy, galaxyIndex) => {
    for (
      let destinationIndex = galaxyIndex + 1;
      destinationIndex < galaxyList.length;
      destinationIndex++
    ) {
      // get destination galaxy
      const destination = galaxyList[destinationIndex];
      // calculate offset of source galaxy location
      const galaxyOffset: Point = [colOffset[galaxy[0]], rowOffset[galaxy[1]]];
      // calculate offset of destination galaxy location
      const destinationOffset: Point = [colOffset[destination[0]], rowOffset[destination[1]]];
      // calculate shortest path by manhattan distance between galaxies
      const dist = manhDistBetween(
        addPoints(galaxyOffset, galaxy),
        addPoints(destinationOffset, destination),
      );
      // add to distance array
      distances.push(dist);
    }
  });
  // return sum of all distances
  return sum(distances);
}
