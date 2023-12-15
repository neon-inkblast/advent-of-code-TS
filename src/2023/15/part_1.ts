import { sum } from "../../utils";
import { readInputFromFile } from "../../utils/io";

export function part1(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);
  // 1 line, split on ',' and hash values
  const vals = lines[0].split(",").map((str) => {
    return holidayAsciiStringHelper(str);
  });

  function holidayAsciiStringHelper(str: string): number {
    let current = 0;
    // for each char hash and add to previous hash
    for (let s of str) {
      current += s.charCodeAt(0);
      current *= 17;
      current = current % 256;
    }
    return current;
  }
  // return sum of hashed values
  return sum(vals);
}
