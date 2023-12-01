import { part2 } from "./part_2";

describe("day 08 - part 2", () => {
  it("Helps the elves select the best tree for a treehouse", () => {
    const input = ["30373", "25512", "65332", "33549", "35390"];
    const result = part2(input);
    expect(result).toBe(8);
  });
});
