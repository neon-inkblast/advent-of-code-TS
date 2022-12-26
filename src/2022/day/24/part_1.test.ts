import { part1 } from "./part_1";

describe("day 24 - part 1", () => {
  it("Can find a path through the storm!", () => {
    const input = [
      "#E######",
      "#>>.<^<#",
      "#.<..<<#",
      "#>v.><>#",
      "#<^v^^>#",
      "######.#",
    ];
    const result = part1(input);
    expect(result).toBe(18);
  });
});
