import { part2 } from "./part_2";

describe("day 12 - part 2", () => {
  it("Finds the best path to set up permanently!", () => {
    const input = [
      "Sabqponm",
      "abcryxxl",
      "accszExk",
      "acctuvwj",
      "abdefghi"
    ];
    const result = part2(input);
    expect(result).toBe(29);
  });
});
