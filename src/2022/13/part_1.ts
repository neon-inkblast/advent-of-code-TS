import { splitOnEmpty, sum } from "../../utils/array";
import { readInputFromFile } from "../../utils/io";
import { compareList } from "./common";

export function part1(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);

  // divide array into sub-arrays of pairs
  const pairs = splitOnEmpty(lines);
  let indices: number[] = [];

  // for each pair, see if they're in order
  pairs.forEach((pair: string[], index: number) => {
    const a = JSON.parse(pair[0]!);
    const b = JSON.parse(pair[1]!);
    // compare as a list
    const result = compareList(a, b);
    // if result > 0 then this pair is in correct order already
    if (result > 0) {
      // push this index (+1, elf indexing) to the collection of sorted pairs
      indices.push(index + 1);
    }
  });

  // return the sum of all correct pair indices
  return sum(indices);
}
