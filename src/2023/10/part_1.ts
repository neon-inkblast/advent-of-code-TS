import { Point, isEqual } from "../../utils";
import { readInputFromFile } from "../../utils/io";
import { PipeNode, PipeType, getNextNode, getStartNodes } from "./pipes";

export function part1(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);
  let start: Point = [0, 0];
  const grid: PipeNode[][] = lines.map((line, row) =>
    line.split("").map((char, col) => {
      // if this is the Start, save the value;
      if (char === "S") {
        start = [col, row];
      }
      // return a path node
      return {
        isInPath: false,
        type: char as PipeType,
        nextDirection: "DR",
        location: [col, row],
      };
    }),
  );

  // step starts at one as we're already getting the first step in each direction
  let step = 1;
  // get the next nodes in either direction from S
  let currentNodes: PipeNode[] = getStartNodes(start, grid).connections;

  // loop until both nodes are the same pipe
  while (!isEqual(currentNodes[0].location, currentNodes[1].location)) {
    step++;
    currentNodes = currentNodes.map((node) => {
      const newNode = getNextNode(node, grid);
      return newNode;
    });
  }
  // return steps taken to reach max distance from S
  return step;
}
