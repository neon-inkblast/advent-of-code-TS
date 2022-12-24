import { clamp } from "./math";

/**
 * A structure for representing a 2 dimensional point
 * for example x and y on a 2D grid
 * `Point[x, y]`
 */
export type Point = [number, number];
/**
 * A structure for representing a 3 dimensional point
 * for example x, y and z on a 3D grid
 * `Point[x, y, z]`
 */
export type Point3D = [number, number, number];
export type Directions = "U" | "R" | "D" | "L" | "UR" | "DR" | "UL" | "DL";
/**
 * The 8 squares neighbouring a point on a 2D grid
 */
export const DIRECTIONS: Record<Directions, Point> = {
  U: [0, -1],
  R: [1, 0],
  D: [0, 1],
  L: [-1, 0],
  UR: [1, -1],
  DR: [1, 1],
  UL: [-1, -1],
  DL: [-1, 1],
};

/**
 *  clamp point values between (-1 < n < 1)
 */
export function normalisePoint(p: Point): Point {
  return [clamp(p[0], -1, 1), clamp(p[1], -1, 1)];
}

/**
 * Add 2 points together
 * */
export function addPoints(a: Point, b: Point): Point {
  return [a[0] + b[0], b[1] + a[1]];
}

/**
 * Find the max distance between 2 points on either X or Y axes
 * */
export function distanceBetween(a: Point, b: Point): number {
  const xDist = Math.abs(a[0] - b[0]);
  const yDist = Math.abs(a[1] - b[1]);
  return Math.max(xDist, yDist);
}

/**
 * Find the max distance between 2 points on either X or Y axes
 * */
export function manhDistBetween(a: Point, b: Point): number {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}

/**
 * Returns the value of the element at grid coordinate P
 * @param p Point in grid
 * @param grid The grid
 * @returns The value held in the grid at position
 * ```
 * x = p[0]
 * y = p[1]
 * ```
 */
export function getElementByPoint<T>(p: Point, grid: T[][]): T {
  return grid[p[1]][p[0]];
}

/**
 * Sets the value of the element at grid coordinate P[x,y]
 * @param p Point in grid
 * @param grid The grid
 * @param val The value to set in the grid at coord [x,y]
 */
export function setElementByPoint<T>(p: Point, grid: T[][], val: T) {
  grid[p[1]][p[0]] = val;
}

/**
 * Returns whether 2 points are equal in values
 * @param a Point a
 * @param b Point b
 * @returns true if both points hold the same values in each index
 */
export function isEqual(a: Point, b: Point) {
  return a[0] === b[0] && a[1] === b[1];
}

/**
 * Returns whether a point lies within the boundaries of a given grid
 * @param p Point to check
 * @param grid to evaluate boundaries of
 * @returns true if both xand y values of the point are in the grid space
 */
export function isInGrid<T>(p: Point, grid: T[][]): boolean {
  return p[0] >= 0 && p[0] < grid[0].length && p[1] >= 0 && p[1] < grid.length;
}

export function clampPoint<T>(p: Point, xRange: Point, yRange: Point): Point {
  return [clamp(p[0], xRange[0], xRange[1]), clamp(p[1], yRange[0], yRange[1])];
}

export function clampPointInGrid<T>(p: Point, grid: T[][]): Point {
  return clampPoint(p, [0, grid[0].length - 1], [0, grid.length - 1]);
}
