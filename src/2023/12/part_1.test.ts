import { part1 } from "./part_1";

describe("day 12 - part 1", () => {
  it("calculates the right answer!", () => {
    const input = [
      // ok
      "???.### 1,1,3",
      ".??..??...?##. 1,1,3",
      "????.#...#... 4,1,1",
      "?#?#?#?#?#?#?#? 1,3,1,6",
      "????.######..#####. 1,6,5",
      "?###???????? 3,2,1",
    ];
    const result = part1(input);
    expect(result).toBe(21);
  });
});
