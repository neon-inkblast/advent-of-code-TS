import { part2 } from "./part_2";

describe("day 09 - part 2", () => {
  it("Tracks the position of the tail of a longer rope", () => {
    const input = ["R 5", "U 8", "L 8", "D 3", "R 17", "D 10", "L 25", "U 20"];
    const result = part2(input);
    expect(result).toBe(36);
  });
});
