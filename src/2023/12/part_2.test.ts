import { part2 } from "./part_2";

describe("day 12 - part 2", () => {
  it("solves the puzzle!", () => {
    const input = [
      "???.### 1,1,3",
      ".??..??...?##. 1,1,3",
      "????.#...#... 4,1,1",
      "?#?#?#?#?#?#?#? 1,3,1,6",
      "????.######..#####. 1,6,5",
      "?###???????? 3,2,1",
    ];
    const result = part2(input);
    expect(result).toBe(525152);
  });
});
