import { part2 } from "./part_2";

describe("day 14 - part 2", () => {
  it("Counts the sands until the end of time!", () => {
    const input = [
      "498,4 -> 498,6 -> 496,6",
      "503,4 -> 502,4 -> 502,9 -> 494,9"
    ];
    const result = part2(input);
    expect(result).toBe(93);
  });
});
