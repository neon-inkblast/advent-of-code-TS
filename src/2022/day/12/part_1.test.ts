import { part1 } from "./part_1";

describe("day 12 - part 1", () => {
  it("Finds the shortest path to the top!", () => {
    const input = [
      "Sabqponm",
      "abcryxxl",
      "accszExk",
      "acctuvwj",
      "abdefghi"
    ];
    const result = part1(input);
    expect(result).toBe(31);
  });
});
