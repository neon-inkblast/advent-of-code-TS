import { readInputFromFile } from "../../utils/io";
import { sum } from "../../utils/array";

export function part1(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);
  const nums = lines.map((line) => {
    const matches = line.match(/\d/g) ?? [];
    return +`${matches![0]}${matches![matches!.length - 1]}`;
  });

  return sum(nums);
}
