import { part1 } from "./part_1";

describe("day 08 - part 1", () => {
  it("Can count how many trees are visible from outside the forest", () => {
    const input = ["30373", "25512", "65332", "33549", "35390"];
    const result = part1(input);
    expect(result).toBe(21);
  });
});
