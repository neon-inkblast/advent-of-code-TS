import { readInputFromFile } from "../../utils/io";
import {
  Point,
  getElementByPoint,
  setElementByPoint,
  addPoints,
  DIRECTIONS,
  isInGrid,
} from "../../utils/point";

type MapPoint = { height: number; score: number; visited: boolean };
export function part2bfs(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);

  let start: Point = [0, 0];
  let target: Point = [0, 0];

  const grid = lines.map((line, y) =>
    line.split("").map((h, x) => {
      let height = h.charCodeAt(0);
      if (h === "S") {
        start = [x, y];
        height = "a".charCodeAt(0);
      }
      if (h === "E") {
        target = [x, y];
        height = "z".charCodeAt(0);
      }

      return { height, score: 0, visited: false };
    }),
  );

  return search(grid, start, target);

  function search(grid: MapPoint[][], start: Point, target: Point) {
    const pQueue = [target];
    let score = 0;
    while (pQueue.length > 0) {
      const current = pQueue.shift();
      const neighbours = findValidNeighbours(current!);
      score = getElementByPoint(current!, grid).score + 1;

      const found = neighbours.filter((n) => {
        pQueue.push(n);
        let mNode = getElementByPoint(n, grid);
        setElementByPoint(n, grid, {
          height: mNode.height,
          score,
          visited: true,
        });
        return mNode.height === 97;
      });

      if (found.length > 0) {
        break;
      }
    }
    return score;
  }

  function findValidNeighbours(current: Point) {
    // get each point in cardinal directions
    const options: Point[] = [
      addPoints(current, DIRECTIONS.U),
      addPoints(current, DIRECTIONS.D),
      addPoints(current, DIRECTIONS.R),
      addPoints(current, DIRECTIONS.L),
    ];
    // filter out points outside of the grid, or that are invalid moves
    return options.filter(
      (p) =>
        isInGrid(p, grid) &&
        isValidMove(
          getElementByPoint(current, grid),
          getElementByPoint(p, grid),
        ),
    );
  }

  // check to see if a move is valid
  function isValidMove(from: MapPoint, to: MapPoint) {
    return to.visited === false && from.height - to.height <= 1;
  }
}
