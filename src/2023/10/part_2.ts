import { Point, getElementByPoint, isEqual } from "../../utils";
import { readInputFromFile } from "../../utils/io";

import { PipeNode, PipeType, getNextNode, getStartNodes } from "./pipes";

export function part2(input?: string[]) {
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

  let step = 0;
  // get the connected pipes and real pipe shape of S
  let { connections: currentNodes, type: startType } = getStartNodes(start, grid);

  // mark out the path nodes, same as part 1
  while (!isEqual(currentNodes[0].location, currentNodes[1].location)) {
    step++;
    currentNodes = currentNodes.map((node, idx) => {
      const newNode = getNextNode(node, grid);
      return newNode;
    });
  }

  // counter for nodes inside the pipe loop
  let inCount = 0;
  // replace S with it's real shape so that it can be used in in/out calculation
  // actual pipe loop already calculated
  const startNode = getElementByPoint(start, grid)!;
  startNode.type = startType;
  startNode.isInPath = true;

  // is this node outside the loop?
  function isOut(vertPipeCount: number) {
    return vertPipeCount % 2 === 0;
  }

  for (let row = 0; row < lines.length; row++) {
    let horizontalOpen = null;
    let vertPipeCount = 0;
    for (let col = 0; col < lines[0].length; col++) {
      const node = getElementByPoint([col, row], grid)!;
      // if node is not in the path and is inside loop
      if (!node.isInPath && !isOut(vertPipeCount)) {
        // count it
        inCount++;
      }
      // if pipe is in loop and IS a vertical divider
      else if (node.isInPath) {
        // types of pipe that cause the in/out to swap
        // are vertical lines, no turning back
        // so like
        // . . | . .
        // . . | . .
        // . . | . .
        // . . | . .
        //
        // or each horizontal row below has 1 dividing vertical
        // the segments like L---7 or F---J are the same as a single |
        // for these purposes
        //
        // . . | . . .
        // . . L - 7 .
        // . . . . | .
        // . F - - J .
        // . | . . . .
        //
        //

        if (
          node.type === "|" ||
          (horizontalOpen === "F" && node.type === "J") ||
          (horizontalOpen === "L" && node.type === "7")
        ) {
          vertPipeCount++;
        } else if (["F", "L"].includes(node.type)) {
          horizontalOpen = node.type;
        }
      }
    }
  }

  return inCount;
}
