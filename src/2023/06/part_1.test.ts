import { part1 } from "./part_1";

describe("day 06 - part 1", () => {
  it("calculates the right answer!", () => {
    const input = ["Time:      7  15   30", "Distance:  9  40  200"];
    const result = part1(input);
    expect(result).toBe(288);
  });
});
