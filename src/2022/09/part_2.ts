import {
  Point,
  addPoints,
  distanceBetween,
  normalisePoint,
} from "../../utils/point";
import { readInputFromFile } from "../../utils/io";

type DirIns = "D" | "U" | "R" | "L";

export function part2(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);

  // set up direction vectors for point addition
  const directions: Record<DirIns, Point> = {
    R: [1, 0],
    U: [0, 1],
    L: [-1, 0],
    D: [0, -1],
  };

  // set length of rope (numebr of segments)
  const numberOfSegments = 10;
  // prefill co-ords for all segments
  let segments: Array<Point> = new Array(numberOfSegments).fill(null);
  segments = segments.map((_) => [0, 0]);
  // store the index of the tail, for fun
  const tailIndex = segments.length - 1;

  // set up array of tail positions
  let tailPositions: Point[] = [[0, 0]];

  lines.forEach((line) => {
    // get instruction and number of times to repeat
    const [d, n] = line.split(" ");
    const dir = directions[d as DirIns];
    // for n (times to repeat instruction) do
    for (let instruct = 0; instruct < +n; instruct++) {
      // move the head, segment[0], in the right direction
      segments[0] = addPoints(segments[0], dir);
      // set the "parent" of the next segment to the head
      let parent = segments[0];

      // for each segment, check if it needs to move
      for (let current = 1; current < segments.length - 1; current++) {
        const segment = segments[current];
        // if distance between this segment and the parent it's led by
        if (distanceBetween(parent, segment) > 1) {
          // move this segment
          segments[current] = moveSeg(parent, segment);
        }
        // set the parent to this segment for the next iteration
        parent = segments[current];
      }

      // do the same check for the last segment (tail) and if true, store position in the tail positions list
      if (distanceBetween(parent, segments[tailIndex]) > 1) {
        segments[tailIndex] = moveSeg(parent, segments[tailIndex]);
        tailPositions.push(segments[tailIndex]);
      }
    }
  });

  // dedupe the tail positions by using a set and return the size
  return new Set(tailPositions.map((p) => p[0] + "," + p[1])).size;
}

// move a segment closer to the target (or parent/whatever)
function moveSeg(target: Point, segment: Point) {
  const xDist = target[0] - segment[0];
  const yDist = target[1] - segment[1];
  // normalise a point created from the x and y distance from target
  const dest: Point = normalisePoint([xDist, yDist]);
  // return the new point
  return addPoints(segment, dest);
}
