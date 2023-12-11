import { readInputFromFile } from "../../utils/io";

export function part1(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);
  const instructions = lines[0].split("");

  // create a map of nodes and their left/right connections
  const nodeMap: Record<string, { left: string; right: string }> = {};
  lines.slice(2).forEach((line) => {
    const [from, left, right] = line.match(/\w+/g) ?? ["", "", ""];
    nodeMap[from] = {
      left,
      right,
    };
  });
  // set start and end nodes
  let location = "AAA";
  const destination = "ZZZ";

  // set instruction index and number of steps taken counters
  let instrIndex = 0;
  let steps = 0;
  // while not yet at destination node
  while (location !== destination) {
    // follow instruction to next node
    location = instructions[instrIndex] === "L" ? nodeMap[location].left : nodeMap[location].right;

    // increment steps taken
    steps++;
    // increment to next instruction, looping back to start if needed
    instrIndex = (instrIndex + 1) % instructions.length;
  }
  // return steps taken counter
  return steps;
}
