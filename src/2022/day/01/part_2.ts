import { readInputFromFile } from "../../../utils/readInputFromFile";

export function part2(input?: string[]) {
  const weights = input ?? readInputFromFile(__dirname);
  const elves: number[] = [];
  const leftover = weights.reduce((total, calories) => {
    if (calories.length === 0) {
      elves.push(total);
      return 0;
    }
    return total + +calories;
  }, 0);
  if (leftover) {
    elves.push(leftover);
  }
  elves.sort((a, b) => b - a);
  return elves[0] + elves[1] + elves[2];
}
