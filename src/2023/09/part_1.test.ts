import { part1 } from "./part_1";

describe("day 09 - part 1", () => {
  it("calculates the right answer!", () => {
    const input = ["0 3 6 9 12 15", "1 3 6 10 15 21", "10 13 16 21 30 45"];
    const result = part1(input);
    expect(result).toBe(114);
  });
});
