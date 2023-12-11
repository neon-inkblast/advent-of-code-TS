import { DIRECTIONS, Direction, Point, addPoints, getElementByPoint } from "../../utils";

export interface PipeNode {
  location: Point;
  type: PipeType;
  nextDirection: Direction;
  isInPath: boolean;
}

export type PipeType = "|" | "-" | "F" | "J" | "L" | "7" | "S" | ".";

// entering direction > exit direction map
export const typeToDirections: Record<PipeType, Partial<Record<Direction, Direction>>> = {
  F: { L: "D", U: "R" },
  "|": { U: "U", D: "D" },
  "-": { L: "L", R: "R" },
  J: { R: "U", D: "L" },
  L: { L: "U", D: "R" },
  "7": { R: "D", U: "L" },
  S: {},
  ".": {},
};

// what connections are valid on each side of a node
export const validConnections: Partial<Record<Direction, PipeType[]>> = {
  L: ["F", "L", "-"],
  U: ["|", "F", "7"],
  D: ["|", "L", "J"],
  R: ["-", "J", "7"],
};

// find the nodes that branch out in either direction from S
export const getStartNodes = (start: Point, grid: PipeNode[][]) => {
  // for boundary checks
  const uPoint = addPoints(start, DIRECTIONS.U);
  const dPoint = addPoints(start, DIRECTIONS.D);
  const lPoint = addPoints(start, DIRECTIONS.L);
  const rPoint = addPoints(start, DIRECTIONS.R);

  // points to test for valid next steps
  const testPoints: Partial<Record<Direction, PipeNode | null>> = {
    U: getElementByPoint(uPoint, grid),
    D: getElementByPoint(dPoint, grid),
    L: getElementByPoint(lPoint, grid),
    R: getElementByPoint(rPoint, grid),
  };
  const connections: PipeNode[] = [];
  const dirs: Direction[] = [];
  (Object.entries(testPoints) as [Direction, PipeNode][]).forEach(([dir, node]) => {
    // null check, went off map somehow
    if (!node) {
      return;
    }
    // add connected nodes to the connections list and store directions that were valid
    if (validConnections[dir]?.includes(node.type)) {
      node.nextDirection = typeToDirections[node.type][dir]!;
      node.isInPath = true;
      connections.push(node);
      dirs.push(dir);
    }
  });
  const type = getPipeFromConnections(dirs);

  return { connections, type };
};

// calculate the shape of this piece by the directions that are connected
export function getPipeFromConnections(dirs: Direction[]): PipeType {
  if (dirs.includes("U")) {
    if (dirs.includes("D")) {
      return "|";
    } else if (dirs.includes("L")) {
      return "J";
    } else if (dirs.includes("R")) {
      return "L";
    }
  } else if (dirs.includes("D")) {
    if (dirs.includes("L")) {
      return "7";
    } else if (dirs.includes("R")) {
      return "F";
    }
  }
  return ".";
}

// get the next pipe from the current pipe
export const getNextNode = (node: PipeNode, grid: PipeNode[][]) => {
  const nextLoc = addPoints(node.location, DIRECTIONS[node.nextDirection]);
  const nextNode = getElementByPoint(nextLoc, grid)!;
  const nextDirection = typeToDirections[nextNode.type][node.nextDirection];
  if (!nextDirection) {
    throw Error();
  }
  nextNode.isInPath = true;
  nextNode.nextDirection = nextDirection;
  return nextNode;
};
