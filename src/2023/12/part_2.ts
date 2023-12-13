import { ints } from "../../utils";
import { readInputFromFile } from "../../utils/io";
import { part1 } from "./part_1";

export function part2(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);
  const mappedLines = lines.map((line) => {
    const [springs, nums] = line.split(" ");
    const damagedSegments = ints(nums);
    // unfold the input
    return (
      // duplicate spring string 5 times and separate copies with an extra '?'
      [springs, springs, springs, springs, springs].join("?") +
      " " +
      // duplicate number section 5 times
      [
        ...damagedSegments,
        ...damagedSegments,
        ...damagedSegments,
        ...damagedSegments,
        ...damagedSegments,
      ].join(",")
    );
  });

  // run unfolded input into part 1
  return part1(mappedLines);
}
