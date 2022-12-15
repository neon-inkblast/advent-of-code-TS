import { readInputFromFile } from "../../../utils/io";
import { manhDistBetween, Point } from "../../../utils/point";

type SensorData = {
  loc: Point;
  dis: number;
};
export function part2(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);

  const sensors: SensorData[] = [];
  lines.forEach((line, idn) => {
    // extract the digits from the input
    const [sx, sy, bx, by] = [...line.matchAll(/(-{0,1}\d+)/g)].map(
      (i) => +i[1]
    );
    const beacon: Point = [bx, by];
    const sensor: Point = [sx, sy];
    // calculate the manhattan distance between the sensor and the
    // beacon to find the range of the sensor
    const dis = manhDistBetween(sensor, beacon);
    // push to sensor collection
    sensors.push({ loc: sensor, dis });
  });

  let distressBeacon: Point = [0, 0];
  let found = false;
  for (let y = 0; y <= 4000000; y++) {
    for (let x = 0; x <= 4000000; x++) {
      found = false;
      sensors.forEach((s) => {
        if (manhDistBetween(s.loc, [x, y]) < s.dis) {
          found = true;
          // if we found a beacon,
          // we can move x to the edge of this sensor's range `s.loc[0] + s.dis`
          // for this row `- Math.abs(s.loc[1] - y)`
          x = Math.max(s.loc[0] + s.dis - Math.abs(s.loc[1] - y), x);
        }
      });
      // escape the x loop if we found the distress beacon
      // and save the beacon
      if (!found) {
        distressBeacon = [x, y];
        break;
      }
    }
    // escape the y loop if we found the distress beacon
    if (!found) {
      break;
    }
  }

  return distressBeacon[1] + distressBeacon[0] * 4000000;
}
