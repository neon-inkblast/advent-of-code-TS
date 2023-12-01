import {
  create2dArrayOf,
  createArrayOf,
  max,
  splitOnEmpty,
} from "../../utils/array";
import { readInputFromFile } from "../../utils/io";
import { mod } from "../../utils/math";
import { addPoints, DIRECTIONS, Point } from "../../utils/point";
// R D L U
type Heading = 0 | 1 | 2 | 3;
type CubeFace = 1 | 2 | 3 | 4 | 5 | 6;
type NextFace = {
  face: CubeFace;
  heading: Heading;
  position?: Point;
  tx?: (p: Point) => Point;
};

type WrapMap = Record<string, Record<string, NextFace>>;
type Command = {
  type: "walk" | "turn";
  amount: number;
};
export type Vec4<T = number> = [T, T, T, T];
export function part2(input?: string[], log = false) {
  const moveDirections: Vec4<Point> = [
    DIRECTIONS.R,
    DIRECTIONS.D,
    DIRECTIONS.L,
    DIRECTIONS.U,
  ];
  const HEADINGS = ["R", "D", "L", "U"];
  // direction icons for logging path
  const dString: Vec4<string> = [">", "V", "<", "^"];

  // hardcoded edge transitions
  const wrapMap: WrapMap = {
    // 1 L / 2 R, L
    // 1 R / 4 R, L
    // 1 U / 6 D, U
    // 1 D / 3 R, L
    1: {
      L: { face: 2, heading: 2, tx: (pos: Point) => [49, pos[1]] },
      R: { face: 4, heading: 2, tx: (pos: Point) => [49, 49 - pos[1]] },
      U: { face: 6, heading: 3, tx: (pos: Point) => [pos[0], 49] },
      D: { face: 3, heading: 2, tx: (pos: Point) => [pos[1], pos[0]] },
    },
    // 2 L / 5 L, R
    // 2 R / 1 L, R
    // 2 U / 6 L, R
    // 2 D / 3 U, D
    2: {
      L: { face: 5, heading: 0, tx: (pos: Point) => [0, 49 - pos[1]] },
      R: { face: 1, heading: 0, tx: (pos: Point) => [0, pos[1]] },
      U: { face: 6, heading: 0, tx: (pos: Point) => [pos[1], pos[0]] },
      D: { face: 3, heading: 1, tx: (pos: Point) => [pos[0], 0] },
    },
    // 3 L / 5 U, D
    // 3 R / 1 D, U
    // 3 U / 2 D, U
    // 3 D / 4 U, D

    3: {
      L: { face: 5, heading: 1, tx: (pos: Point) => [pos[1], pos[0]] },
      R: { face: 1, heading: 3, tx: (pos: Point) => [pos[1], pos[0]] },
      U: { face: 2, heading: 3, tx: (pos: Point) => [pos[0], 49] },
      D: { face: 4, heading: 1, tx: (pos: Point) => [pos[0], 0] },
    },
    // 4 L / 5 R, L
    // 4 R / 1 R, L
    // 4 U / 3 D, U
    // 4 D / 6 R, L

    4: {
      L: { face: 5, heading: 2, tx: (pos: Point) => [49, pos[1]] },
      R: { face: 1, heading: 2, tx: (pos: Point) => [49, 49 - pos[1]] },
      U: { face: 3, heading: 3, tx: (pos: Point) => [pos[0], 49] },
      D: { face: 6, heading: 2, tx: (pos: Point) => [pos[1], pos[0]] },
    },
    // 5 L / 2 L, R
    // 5 R / 4 L, R
    // 5 U / 3 L, R
    // 5 D / 6 U, D
    5: {
      L: { face: 2, heading: 0, tx: (pos: Point) => [0, 49 - pos[1]] },
      R: { face: 4, heading: 0, tx: (pos: Point) => [0, pos[1]] },
      U: { face: 3, heading: 0, tx: (pos: Point) => [pos[1], pos[0]] },
      D: { face: 6, heading: 1, tx: (pos: Point) => [pos[0], 0] },
    },
    // 6 L / 2 U, D
    // 6 R / 4 D, U
    // 6 U / 5 D, U
    // 6 D / 1 U, D
    6: {
      L: { face: 2, heading: 1, tx: (pos: Point) => [pos[1], pos[0]] },
      R: { face: 4, heading: 3, tx: (pos: Point) => [pos[1], pos[0]] },
      U: { face: 5, heading: 3, tx: (pos: Point) => [pos[0], 49] },
      D: { face: 1, heading: 1, tx: (pos: Point) => [pos[0], 0] },
    },
  };
  // boundaries of each face in the cube
  // in the following shape
  // |   | 2 | 1 |
  // |   | 3 |   |
  // | 5 | 4 |   |
  // | 6 |   |   |
  const faceBounds = [
    [],
    [
      //1
      // xbounds
      [100, 149],
      // ybounds
      [0, 49],
    ],
    [
      //2
      [50, 99],
      [0, 49],
    ],
    [
      //3
      [50, 99],
      [50, 99],
    ],
    [
      //4
      [50, 99],
      [100, 149],
    ],
    [
      //5
      [0, 49],
      [100, 149],
    ],
    [
      //6
      [0, 49],
      [150, 199],
    ],
  ];

  const lines =
    input ??
    // readFromFile("_test.txt", __dirname) ??
    readInputFromFile(__dirname);
  const [cubeMap, instructionString] = splitOnEmpty(lines);
  const instructions: Command[] = [
    ...instructionString[0].matchAll(/(\d+|\D)/g),
  ].map((i) => {
    const match = i[1];
    if (match === "R") {
      return { type: "turn", amount: 1 };
    }
    if (match === "L") {
      return { type: "turn", amount: -1 };
    }
    return { type: "walk", amount: +i[1] };
  });

  // get the size of a face
  const cubeSize = Math.floor(max(cubeMap.map((r) => r.length / 3)));

  // create an array of faces, index 0 will be blank
  const faces = createArrayOf(7, () =>
    create2dArrayOf(cubeSize, cubeSize, " "),
  );

  // populate each face from the map
  faces.forEach((face, fi) => {
    if (fi === 0) {
      return;
    }
    const yOffset = faceBounds[fi][1][0];
    const xFrom = faceBounds[fi][0][0];
    const xTo = faceBounds[fi][0][1] + 1;
    for (let y = 0; y < cubeSize; y++) {
      face[y] = cubeMap[y + yOffset].slice(xFrom, xTo).split("");
    }
  });

  // setup current state variables
  let heading: Heading = 0;
  let face: CubeFace = 2;
  let position: Point = [0, 0];
  let totalSteps = 0;

  // do instructions
  instructions.forEach((instruction, iNum) => {
    if (instruction.type === "walk") {
      // walk forwards
      walk(instruction.amount);
    } else if (instruction.type === "turn") {
      // rotate, changing heading a step left or right
      heading = mod(
        heading + instruction.amount,
        moveDirections.length,
      ) as Heading;
    }
  });

  function walk(n: number) {
    // get next position
    let next = findNextPosition(position);
    let steps = n;
    // while still have steps to take and next position isn't a wall
    while (steps > 0 && getGridValue(next) !== "#") {
      totalSteps++;
      // if moving to a new face, need to update all
      // current face, heading (direction) and position
      if ("position" in next) {
        position = next.position!;
        face = next.face;
        heading = next.heading;
      } else {
        // in same face, just update position
        position = next as Point;
      }
      if (log) {
        faces[face][position[1]][position[0]] = dString[heading];
      }
      // decrement steps
      steps--;
      // get next position
      next = findNextPosition(position);
    }
  }

  function findNextPosition(
    position: Point,
    cFace = face,
    head = heading,
  ): Point | NextFace {
    // move position to next
    const next = addPoints(position, moveDirections[head]);
    // if next is off the edge of the current face
    if (
      // moving right
      (head === 0 && next[0] >= cubeSize) ||
      // moving down
      (head === 1 && next[1] >= cubeSize) ||
      // moving left
      (head === 2 && next[0] < 0) ||
      // moving up
      (head === 3 && next[1] < 0)
    ) {
      //
      const newPos = {
        // retrieve the next face and translated direction
        ...wrapMap[cFace][HEADINGS[head]],
        // and translate position on the new face
        position: wrapMap[cFace][HEADINGS[head]].tx!(position),
      };

      return newPos;
    }
    return next;
  }

  // get value from the grid at a point, supports next pos values
  function getGridValue(point: Point | NextFace) {
    const pos = (point as NextFace).position ?? (point as Point);
    const fc = (point as NextFace).face ?? face;
    return faces[fc][pos![1]][pos![0]];
  }

  // calculate the password
  const password =
    1000 * (1 + (position[1] + faceBounds[face][1][0])) +
    4 * (1 + (position[0] + faceBounds[face][0][0])) +
    heading;

  // some fun logging?
  if (log) {
    faces[face][position[1]][position[0]] = "X";
    for (let i = 1; i < faces.length; i++) {
      console.log("Face:", i);
      console.log(faces[i].map((row) => row.join("")));
    }
    console.log("Total steps:", totalSteps);
  }

  return password;
}
