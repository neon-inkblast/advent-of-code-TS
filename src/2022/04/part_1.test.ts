import { part1 } from "./part_1";

describe("day 4 - part 1", () => {
  it("works out how many elf cleaning pairs have shifts that completely overlap", () => {
    const input = [
      "2-4,6-8",
      "2-3,4-5",
      "5-7,7-9",
      "2-8,3-7",
      "6-6,4-6",
      "2-6,4-8",
    ];
    const result = part1(input);
    expect(result).toBe(2);
  });
});
