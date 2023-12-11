import { leastCommonMultiple, multi, timeExec } from "../../utils";
import { readInputFromFile } from "../../utils/io";

type Node = { start: string; curr: string; steps: number };
type NodeMap = { left: string; right: string; steps: number };

export function part2(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);
  const instructions = lines[0].split("");
  // setup a list of potential start nodes of the form XXA
  let starts: Node[] = [];

  const nodeMap: Record<string, NodeMap> = {};
  lines.slice(2).forEach((line) => {
    const [from, left, right] = line.match(/\w+/g) ?? ["", "", ""];
    nodeMap[from] = {
      left,
      right,
      steps: 0,
    };
    // push node into start nodes list if ends in 'A'
    if (from.charAt(2) === "A") {
      starts.push({ start: from, curr: from, steps: 0 });
    }
  });
  // for each start node, calculate steps to Z
  // this works because A -> Z is same as Z -> next Z cycle length
  // and all cycles are a multiple of the instruction length
  // so each time a ghost lands on a Z, it's at the same instruction
  starts.forEach((node) => {
    let instrIndex = 0;
    let steps = 0;
    let finished = false;
    // loop until landing on a Z
    while (!finished) {
      const instruction = instructions[instrIndex];
      const from = node.curr;
      node.curr = instruction === "L" ? nodeMap[from].left : nodeMap[from].right;
      const to = node.curr;
      finished = to.charAt(2) === "Z";

      instrIndex = (instrIndex + 1) % instructions.length;
      // if this node has already led to an end, use that calculation
      // NB. I think due to the input being disjoint cycles this is never the case
      if (!finished && nodeMap[node.curr].steps > 0) {
        steps += nodeMap[node.curr].steps;
        finished = true;
      } else {
        // increment steps taken
        steps++;
      }
    }
    // write the number of steps taken to the nodeMap and original starting node
    nodeMap[node.start].steps = steps;
    node.steps = steps;
  });

  // retrieve steps taken for all the starting nodes to reach a Z
  const pathStepsTaken: number[] = Object.values(starts).map((node) => node.steps);
  // work out the LCM to determine when they would all line up on a Z
  return leastCommonMultiple(pathStepsTaken);
}
