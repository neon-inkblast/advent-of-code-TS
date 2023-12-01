import { part1 } from "./part_1";

describe("day 01 - part 1", () => {
  it("calculates the right answer!", () => {
    const input = ["1abc2", "pqr3stu8vwx", "a1b2c3d4e5f", "treb7uchet"];
    const result = part1(input);
    expect(result).toBe(142);
  });
});
