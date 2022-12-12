import { create2dArrayOf } from "../../../utils/array";
import { readInputFromFile } from "../../../utils/io";
import { addPoints, DIRECTIONS, getElementByPoint, isInGrid, Point, setElementByPoint } from "../../../utils/point";

export function part2(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);
  const grid = lines.map(line => line.split(""));
  const scores: number[][]= create2dArrayOf(grid.length, grid[0].length, () => (Number.POSITIVE_INFINITY));
  
  const {start, target} = findEndpoints(grid);
  

  // set the starting square to zero steps
  setElementByPoint(start!, scores, 0)

  let searching = true;
  let current = start!;
  let currentPath: Point[] = [];

  while(searching){
    let score = getElementByPoint(current, scores) + 1;
    // get available moves from here
    const available = findValidNext(current);
    // filter to options with worse scores 
    const options = available.filter(option => getElementByPoint(option, scores) > score);

    if (!options || options.length < 1) {
      // pop the previous node from the stack
      current = currentPath.pop()!;
      // back at the start and nowhere to run
      if (current == null) {
        searching = false;
      }
    } else {
      // push the current path to a stack
      currentPath.push(current);
      // set current to the new node
      current = options[0];
      // if this letter is a, set the score back to zero
      score = getElementByPoint(current, grid) === "a" ? 0: score; 
      // set score for the new node
      setElementByPoint(current, scores, score);
    }
  }

  // finished scoring, now just return the target score
  return getElementByPoint(target, scores);

  function findValidNext(current:Point) {
    const options:Point[] = [addPoints(current, DIRECTIONS.U), addPoints(current, DIRECTIONS.D), addPoints(current, DIRECTIONS.R), addPoints(current, DIRECTIONS.L)];
    return options.filter((p) => isInGrid(p, grid) && isValidMove(current, p));
  }

  function getHeight(letter:string) {
    if (letter === "S") {
      return 1
    }
    if (letter === "E") {
      return 26
    }
    let alphabet = '_abcdefghijklmnopqrstuvwxyzSE';
    return alphabet.indexOf(letter);
  };

  function isValidMove(from:Point, to:Point) {
      const f = getHeight(grid[from[0]][from[1]]) 
      const t = getHeight(grid[to[0]][to[1]]);
      return f >= t - 1;
  };

  // find start node and target node
  function findEndpoints(grid:string[][]):{start:Point, target:Point} {

    let start:Point|null = null
    let target:Point|null = null
  
    for (let y = 0; y < grid.length; y++) {
      for(let x = 0; x < grid[0].length; x++) {
        // find start
        if (grid[y][x] === "S"){
          start = [y,x];
        } 
        // find end
        else if (grid[y][x] === "E") {
          target = [y,x];
        }
        // early exit
        if (start != null && target != null) {
          break;
        }
      }
    }
    return {start : start ?? [0,0], target : target ?? [0,0] }
  }
}
