import {
  Point,
  addPoints,
  distanceBetween,
  normalisePoint
} from "../../../utils/point";
import { readInputFromFile } from "../../../utils/io";

// Types for instruction direction and Point(x,y)
type DirIns = "D" | "L" | "U" | "R";

export function part1(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);

  // set up direction vectors for point addition
  const directions: Record<DirIns, Point> = {
    R: [1, 0],
    U: [0, 1],
    L: [-1, 0],
    D: [0, -1]
  };

  let head: Point, tail: Point;
  head = tail = [0, 0];

  // set up array of tail positions
  let tailPositions: Point[] = [[0, 0]];

  // for each instruction
  lines.forEach((line) => {
    // get instruction and number of times to repeat
    const [d, n] = line.split(" ");
    const dir = directions[d as DirIns];

    // for n (times to repeat instruction) do
    for (let i = 0; i < +n; i++) {
      // move the head
      head = addPoints(head, dir);
      // check the absolute distance between head and tail
      if (distanceBetween(head, tail) > 1) {
        // move tail if required
        moveTail();
      }
    }
  });

  // move the tail closer to the head
  function moveTail() {
    const xDist = head[0] - tail[0];
    const yDist = head[1] - tail[1];
    // normalise a point created from the x and y distance from target
    const dest: Point = normalisePoint([xDist, yDist]);
    // set the new tail
    tail = addPoints(tail, dest);
    // add the new tail position to the tails list
    tailPositions.push([...tail]);
  }

  // dedupe the tail positions by using a set and return the size
  const uniqueTails = new Set(tailPositions.map((p) => p[0] + "," + p[1]));
  return uniqueTails.size;
}
