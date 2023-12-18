import {
  DIRECTIONS,
  DIRECTION_OPPOSITE,
  Direction,
  Point,
  addPoints,
  getElementByPoint,
  isEqual,
  isInGrid,
  multi,
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
  stepsInDir: number;
}
export function part2(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);
  let queue: SearchNode[] = [];
  const grid = lines.map((line, r) => toNumbers(line.split("")));
  let visited = new Set();
  const gridHeight = grid.length;
  const gridWidth = grid[0].length;
  const start = createNode([0, 0], 0, null, 0);
  const target: Point = [gridHeight - 1, gridWidth - 1];
  start.score = 0;
  queue.push(start);

  let loops = 0;

  let current: SearchNode;
  let score = 0;
  while (queue.length > 0 && loops < 1000000) {
    loops++;
    current = queue.shift()!;
    if (!current) {
      break;
    }
    if (isEqual(current.pos, target)) {
      score = current.score;
      break;
    }
    if (visited.has(toKey(current))) {
      continue;
    }

    visited.add(toKey(current));
    const neigh = getNeighbours(current);

    if (neigh.length > 0) {
      queue.push(...neigh);
      queue.sort((a, b) => a.score - b.score);
    }
  }

  function getNeighbours(n: SearchNode): SearchNode[] {
    const directions: Direction[] = (["U", "D", "L", "R"] as Direction[]).filter((d) => {
      const isOppositeDirection = n.dir === DIRECTION_OPPOSITE[d];
      const canTurn = n.dir !== d && n.stepsInDir >= 4;
      const canGoStraight = n.dir === d && n.stepsInDir < 10;
      const directionOk = canTurn || canGoStraight || n.dir === null;
      return !isOppositeDirection && directionOk;
    }) as Direction[];
    return directions
      .map((d) => {
        const newPoint = addPoints(n.pos, DIRECTIONS[d]);
        const newSteps = n.dir === d ? n.stepsInDir + 1 : 1;
        if (isInGrid(newPoint, grid)) {
          const newNode = createNode(newPoint, n.score, d, newSteps);
          if (!visited.has(toKey(newNode))) {
            return newNode;
          }
        }
        return null;
      })
      .filter((x) => x != null) as SearchNode[];
  }

  function createNode(
    p: Point,
    score: number,
    d: Direction | null,
    stepsInDir: number,
  ): SearchNode {
    const heatLoss = getElementByPoint(p, grid)!;

    return { dir: d, score: score + heatLoss, weight: heatLoss, pos: p, stepsInDir };
  }

  function toKey(n: SearchNode) {
    return pointToString(n.pos) + "," + n.dir + "," + n.stepsInDir;
  }
  console.log(score, loops);
  return score;
}
