import { part1 } from "./part_1";

describe("day 01 - part 1", () => {
  it("calculates the elf with the most calories in their backpack", () => {
    const input = ["1", "2", "", "3", "4", "", "2", "1", "1", "100"];
    const result = part1(input);
    expect(result).toBe(104);
  });
});
