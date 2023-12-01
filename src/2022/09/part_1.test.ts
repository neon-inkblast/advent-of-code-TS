import { part1 } from "./part_1";

describe("day 09 - part 1", () => {
  it("Tracks the position of the tail", () => {
    const input = ["R 4", "U 4", "L 3", "D 1", "R 4", "D 1", "L 5", "R 2"];
    const result = part1(input);
    expect(result).toBe(13);
  });
});
