import { readInputFromFile } from "../../utils/io";
import { manhDistBetween, Point } from "../../utils/point";

type SensorData = {
  loc: Point;
  dis: number;
};
export function part1(input?: string[], target?: number) {
  const lines = input ?? readInputFromFile(__dirname);

  const sensors: SensorData[] = [];
  const beacons = new Set<number>();
  const row = target ?? 2000000;

  let maxX = Number.NEGATIVE_INFINITY;
  let minX = Number.POSITIVE_INFINITY;

  lines.forEach((line, idn) => {
    const [sx, sy, bx, by] = [...line.matchAll(/(-{0,1}\d+)/g)].map(
      (i) => +i[1],
    );

    // collect sensor and beacon
    const sensor: Point = [sx, sy];
    const beacon: Point = [bx, by];
    // calculate range of sensor via manhattan distance
    const dis = manhDistBetween(sensor, beacon);
    // collect beacon x locations on the target row to filter out later
    if (by === row) {
      beacons.add(by);
    }
    // add sensor to sensor array
    sensors.push({ loc: sensor, dis });

    // adjust the tracked min/max X values for target
    // taking into account how far this sensor can reach
    // on the target row
    maxX = Math.max(maxX, sx + dis - Math.abs(sy - row));
    minX = Math.min(minX, sx - dis - Math.abs(sy - row));
  });

  // start a counter to count cells scanned that DONT have beacons
  let count = 0;
  for (let x = minX - 1; x <= maxX; x++) {
    // set a flag to track whether a position has been scanned
    let scanned = false;

    // if this position has a beacon, don't count it, skip to next x
    if (beacons.has(x)) {
      continue;
    }
    // check each sensor and see if it can see this position on the target row
    sensors.forEach((s) => {
      if (!scanned && manhDistBetween(s.loc, [x, row]) <= s.dis) {
        // set a flag so that we don't count a scanned position twice
        scanned = true;
        // increment the count of scanned cells
        count++;
      }
    });
  }

  return count;
}
