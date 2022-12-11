export type Point = [number, number];

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
