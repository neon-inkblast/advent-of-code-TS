import { part2 } from "./part_2";

describe("day 09 - part 2", () => {
  it("solves the puzzle!", () => {
    const input = ["0 3 6 9 12 15", "1 3 6 10 15 21", "10 13 16 21 30 45"];
    const result = part2(input);
    expect(result).toBe(2);
  });
});
