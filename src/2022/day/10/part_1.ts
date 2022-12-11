import { readInputFromFile } from "../../../utils/io";

export function part1(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);
  let regX = 1;
  let cycleCounter = 21;
  let sum = 0;

  // can flatten the instructions here to a single array, as each "word" of instruction
  // takes up a whole cycle and since there's only one instruction with a number arg
  // can just assume it's an addX
  const flattened = lines.flatMap((line) => line.split(" "));

  flattened.forEach((line) => {
    // increment the counter
    cycleCounter++;

    // if a number, assume addX and bump the register
    if (!isNaN(+line)) {
      regX += +line;
    }

    // if on a cycle to track
    // add register value * cycle - 20 (starting amount) to the total
    if (cycleCounter % 40 === 0) {
      sum += (cycleCounter - 20) * regX;
    }
  });

  return sum;
}
