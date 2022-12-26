import { readFromFile, readInputFromFile } from "../../../utils/io";
import { mod } from "../../../utils/math";
import {
  addPoints,
  DIRECTIONS,
  isEqual,
  isInGrid,
  manhDistBetween,
  Point,
} from "../../../utils/point";

export function part2(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);
  const grid = lines.map((row) =>
    row.split("").map((loc) => ("v^<>#".includes(loc) ? [loc] : [])),
  );
  // a map for indexing blizzard locations by time
  const quantumBlizzards: Record<string, string[][][]> = {};
  // set of states visited
  const stateSet = new Set();

  // entry point
  const start: Point = [grid[0].findIndex((cell) => cell.length === 0), 0];
  // exit point
  const end: Point = [
    grid[grid.length - 1].findIndex((cell) => cell.length === 0),
    grid.length - 1,
  ];

  // grid dimensions
  const gridHeight = grid.length;
  const gridWidth = grid[0].length;

  // calculate blizzards for a given grid at a given time
  function step(grid: string[][][], time: number = 1) {
    // if we've already calculated positions at this time, return the memo'd value
    if (quantumBlizzards[time]) {
      return quantumBlizzards[time];
    }

    // set up a new grid to hold the state of the blizzards at `time`
    const newGrid = grid.map((row) =>
      row.map((cell) => (cell[0] === "#" ? cell : ([] as string[]))),
    );

    // loop through the input grid
    for (let y = 1; y <= gridHeight - 2; y++) {
      for (let x = 1; x <= gridWidth - 2; x++) {
        // get the blizzards at this location
        let blizz = grid[y][x];
        // for each blizzard, predict where it will be at `time`
        blizz.forEach((blizz) => {
          let nx = x;
          let ny = y;
          // consider each direction and shift appropriately
          switch (blizz) {
            case "<": {
              nx = mod(x - time, gridWidth - 2);
              break;
            }
            case ">": {
              nx = mod(x + time, gridWidth - 2);
              break;
            }
            case "^": {
              ny = mod(y - time, gridHeight - 2);
              break;
            }
            case "v": {
              ny = mod(y + time, gridHeight - 2);
              break;
            }
          }
          // wrap the blizzard around the map if it hits the edges
          nx = nx === 0 ? gridWidth - 2 : nx === gridWidth - 1 ? 0 : nx;
          ny = ny === 0 ? gridHeight - 2 : ny === gridHeight - 1 ? 0 : ny;
          // store new location in new grid
          newGrid[ny][nx].push(blizz);
        });
      }
    }
    // add this new grid mapping to the index of states calculated
    quantumBlizzards[time] = newGrid;
    // and return new grid as result
    return newGrid;
  }

  // BFS to find the path through the storm!
  function search(start: Point, target: Point, timeStart = 0) {
    // set up a queue with the starting state location and time
    let queue = [{ p: start, t: timeStart }];
    while (queue.length > 0) {
      // extract next node to check
      const { p: curr, t: time } = queue.shift()!;
      const [x, y] = curr;
      // if we're at the target, return the time taken
      if (isEqual(curr, target)) {
        return time;
      }
      // find neighbours that will be able to survive moving
      else {
        // get the grid state at the next time increment
        const t = time + 1;
        const gridNext = step(grid, t);

        // for each cardinal direction, as well as waiting in place
        // add to a list of potential moves from this location/time
        const potentials: Point[] = [
          DIRECTIONS.U,
          DIRECTIONS.D,
          DIRECTIONS.L,
          DIRECTIONS.R,
          [0, 0],
        ];

        // add to the queue, if the proposed move is
        // - in the grid
        // - the grid won't have any blizzards at that time
        // - this state hasn't been checked before
        potentials.forEach((potential) => {
          const [nx, ny] = addPoints([x, y], potential);
          if (
            isInGrid([nx, ny], grid) &&
            gridNext[ny][nx].length === 0 &&
            !stateSet.has(`${t},${nx},${ny}`)
          ) {
            stateSet.add(`${t},${nx},${ny}`);
            queue.push({ p: [nx, ny], t });
          }
        });
      }
    }
    // if we never found a safe path, it would take INFINITY time, all the quantum elves died
    return Number.POSITIVE_INFINITY;
  }

  // make the first journey
  const timeThere = search(start, end, 0);
  // make the journey back
  const timeAndBackAgain = search(end, start, timeThere);
  // return with snacks
  const timeTheAdventure = search(start, end, timeAndBackAgain);

  // log out the grid state to terminal
  function logGrid() {
    console.log(
      grid
        .map((row) =>
          row
            .map((x) => {
              if (x.length < 1) {
                return [" "];
              } else if (x.length > 1) {
                return [x.length];
              }
              return x;
            })
            .join("|"),
        )
        .join("\n"),
    );
  }

  return timeTheAdventure;
}
