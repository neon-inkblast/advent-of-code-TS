import { part2 } from "./part_2";

describe("day 06 - part 2", () => {
  it("solves the puzzle!", () => {
    const input = ["Time:      7  15   30", "Distance:  9  40  200"];
    const result = part2(input);
    expect(result).toBe(71503);
  });
});
