import { part1 } from "./part_1";

describe("day 14 - part 1", () => {
  it("Counts the sands through the hourglass!", () => {
    const input = [
      "498,4 -> 498,6 -> 496,6",
      "503,4 -> 502,4 -> 502,9 -> 494,9"
    ];
    const result = part1(input);
    expect(result).toBe(24);
  });
});
