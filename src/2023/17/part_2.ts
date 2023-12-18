import {
  DIRECTIONS,
  DIRECTION_OPPOSITE,
  Direction,
  Point,
  addPoints,
  getElementByPoint,
  isEqual,
  isInGrid,
  multiplyArray,
  pointToString,
  toNumbers,
} from "../../utils";
import { readInputFromFile } from "../../utils/io";

interface SearchNode {
  score: number;
  weight: number;
  pos: Point;
  dir: Direction | null;
}

export function part2(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);
  let queue: SearchNode[] = [];
  const grid = lines.map((line, r) => toNumbers(line.split("")));
  let visited = new Set();
  const gridHeight = grid.length;
  const gridWidth = grid[0].length;
  const start = createNode([0, 0], 0, null);
  const target: Point = [gridHeight - 1, gridWidth - 1];
  start.score = 0;
  queue.push(start);

  let loops = 0;

  let current;
  let score = 0;
  while (queue.length > 0 && loops < 1500000) {
    loops++;
    current = queue.shift();
    if (!current) {
      break;
    }
    if (isEqual(current.pos, target)) {
      score = current.score;
      break;
    }

    // some nodes will have been stored with higher score values
    if (visited.has(toKey(current))) {
      continue;
    }
    // now it's been visited this is the best option for this node
    visited.add(toKey(current));
    const neigh = getNeighbours(current);

    if (neigh.length > 0) {
      queue.push(...neigh);
      queue.sort((a, b) => a.score - b.score);
    }
    // console.log(queue);
  }

  function getNeighbours(n: SearchNode) {
    const directions: Direction[] = (["U", "D", "L", "R"] as Direction[]).filter(
      (d) => n.dir !== d && n.dir !== DIRECTION_OPPOSITE[d]!,
    ) as Direction[];
    const neighbours: SearchNode[] = [];
    const multiDirections = directions.forEach((d) => {
      let mScore = n.score;
      for (let m = 1; m <= 10; m++) {
        const newPos = addPoints(n.pos, multiplyArray(DIRECTIONS[d], m) as Point);
        if (isInGrid(newPos, grid)) {
          const newNode = createNode(newPos, mScore, d);
          mScore = newNode.score;
          if (!visited.has(toKey(newNode)) && m >= 4) {
            neighbours.push(newNode);
          }
        } else {
          m = 10;
        }
      }
    });

    return neighbours;
  }

  function createNode(p: Point, score: number, d: Direction | null): SearchNode {
    const heatLoss = getElementByPoint(p, grid)!;

    return { dir: d, score: score + heatLoss, weight: heatLoss, pos: p };
  }

  function toKey(n: SearchNode) {
    return pointToString(n.pos) + "," + n.dir;
  }

  return score;
}
