import { part1 } from "./part_1";

describe("day 04 - part 1", () => {
  it("calculates the right answer!", () => {
    const input = ["1", "2", "3"];
    const result = part1(input);
    expect(result).toBe("1");
  });
});
