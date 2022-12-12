export type Point = [number, number];
export type DirIns = "D" | "L" | "U" | "R";
export const DIRECTIONS: Record<DirIns, Point> = {
  U: [0, 1],
  L: [-1, 0],
  D: [0, -1],
  R: [1, 0],
};

// normalise point values between (-1 < n < 1)
export function normalisePoint(p: Point): Point {
  return [Math.max(-1, Math.min(1, p[0])), Math.max(-1, Math.min(1, p[1]))];
}

// add 2 points together
export function addPoints(a: Point, b: Point): Point {
  return [a[0] + b[0], b[1] + a[1]];
}

// return the max distance between 2 points in X or Y axes
export function distanceBetween(a: Point, b: Point): number {
  const xDist = Math.abs(a[0] - b[0]);
  const yDist = Math.abs(a[1] - b[1]);
  return Math.max(xDist, yDist);
}


export function getElementByPoint<T>(a: Point, b:T[][]):T {
  return b[a[0]][a[1]];
};

export function setElementByPoint<T>(a: Point, b:T[][], val:T) {
  b[a[0]][a[1]] = val;
};

export function isEqual (a: Point, b:Point) {
  return a[0] === b[0] && a[1] === b[1]
};

export function isInGrid<T>(p: Point, grid: T[][]):boolean {
  return p[0] >= 0 && p[0] < grid.length && p[1] >= 0 && p[1] < grid[0].length
};