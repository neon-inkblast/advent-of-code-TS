import { part2 } from "./part_2";

describe("day 24 - part 2", () => {
  it("Can find a path through the storm, and back, and back again!", () => {
    const input = [
      "#E######",
      "#>>.<^<#",
      "#.<..<<#",
      "#>v.><>#",
      "#<^v^^>#",
      "######.#",
    ];
    const result = part2(input);
    expect(result).toBe(54);
  });
});
