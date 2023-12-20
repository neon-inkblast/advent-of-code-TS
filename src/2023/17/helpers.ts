import {
  Point,
  Direction,
  getElementByPoint,
  pointToString,
  isEqual,
  DIRECTIONS,
  DIRECTION_OPPOSITE,
  addPoints,
  isInGrid,
  multiplyArray,
  setElementByPoint,
  create2dArrayOf,
} from "../../utils";

export interface SearchNode {
  score: number;
  weight: number;
  pos: Point;
  dir: Direction | null;
}

// helper to create a new search node
export function createNode(
  p: Point,
  score: number,
  d: Direction | null,
  grid: number[][],
): SearchNode {
  const heatLoss = getElementByPoint(p, grid)!;

  return { dir: d, score: score + heatLoss, weight: heatLoss, pos: p };
}

// helper to create an identity key for a search node
// returns "x,y,d"
export function toKey(n: SearchNode) {
  return pointToString(n.pos) + "," + n.dir;
}

// helper to create the getNeighbour finding function with min/max straight line movement parameters
export function createGetNeighbours(minMove: number, maxMove: number, grid: number[][]) {
  const gridHeight = grid.length;
  const gridWidth = grid[0].length;

  // node map of best scores found so far for each node with entry direction
  const scores = create2dArrayOf(
    gridHeight,
    gridWidth,
    (): Partial<Record<Direction, number>> => ({
      U: Number.POSITIVE_INFINITY,
      D: Number.POSITIVE_INFINITY,
      L: Number.POSITIVE_INFINITY,
      R: Number.POSITIVE_INFINITY,
    }),
  );

  // function for finding valid neighbours
  return function getNeighbours(n: SearchNode, visited: Set<string>) {
    // get the set of cardinal directions from this node
    // filter to eliminate forward and reverse movement,
    // only allow turning.  this works because in the next step we'll queue
    // up all the nodes on the straight path
    const directions: Direction[] = (["U", "D", "L", "R"] as Direction[]).filter(
      (d) => n.dir !== d && n.dir !== DIRECTION_OPPOSITE[d]!,
    ) as Direction[];

    // prepare a list of search nodes
    const neighbours: SearchNode[] = [];

    // for each valid direction
    directions.forEach((d) => {
      // set an initial score, starting at the current location score
      let mScore = n.score;
      // for each node in this direction up to the maximum allowable limit
      for (let m = 1; m <= maxMove; m++) {
        // get the position of the new location
        const newPos = addPoints(n.pos, multiplyArray(DIRECTIONS[d], m) as Point);
        // if it's in the grid
        if (isInGrid(newPos, grid)) {
          // create a new search node for this location
          const newNode = createNode(newPos, mScore, d, grid);
          // update the current score tracker for this direction's loop
          mScore = newNode.score;
          // if we haven't already searched FROM this node
          if (!visited.has(toKey(newNode)) && m >= minMove) {
            // look up the best score for this node entering from this direction we have already found
            const existingScores = getElementByPoint(newPos, scores)!;
            // if the score we've found this time is better than any that already exist in list for this
            // particular search node
            if (newNode.score < existingScores[d]!) {
              // update the best found score for this node
              setElementByPoint(newPos, scores, { ...existingScores, [d]: mScore });
              // and push it into the list of valid neighbour nodes
              neighbours.push(newNode);
            }
          }
        } else {
          // node wasn't in grid, just exit loop
          break;
        }
      }
    });
    // return all valid neighbours
    return neighbours;
  };
}

export function dijkstraSearch(
  start: SearchNode,
  target: Point,
  getNeighbours: (n: SearchNode, visited: Set<string>) => SearchNode[],
) {
  // queue of search nodes
  // TODO: replace with a priority queue (min-heap backed)
  const queue: SearchNode[] = [start];

  // storage for nodes that have been visited
  const visited = new Set<string>();

  let current: SearchNode | undefined;
  let score = start.score;
  while (queue.length > 0) {
    // get the next search node, this will be the closest node to start,
    // that hasn't already been visited, due to Dijkstra sorting by shortest path
    current = queue.shift()!;

    // if the target has been found then break out of the search with the current score
    if (isEqual(current.pos, target)) {
      score = current.score;
      break;
    }

    // if we've already visited this node, discard it as
    // the shortest path will already have been found
    if (visited.has(toKey(current))) {
      continue;
    }

    // otherwise mark it as visited
    visited.add(toKey(current));
    // and retrieve it's neighbouring set of nodes
    const neigh = getNeighbours(current, visited);

    // if there are new neighbours
    if (neigh.length > 0) {
      // add them into the queue
      queue.push(...neigh);
      // sort the queue by score so that the shortest path node
      // is at the head of the queue
      queue.sort((a, b) => a.score - b.score);
    }
    // iterate
  }
  // returns the shortest path to target
  return score;
}
