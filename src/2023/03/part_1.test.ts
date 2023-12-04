import { part1 } from "./part_1";

describe("day 03 - part 1", () => {
  it("calculates the right answer!", () => {
    const input = [
      "467..114..",
      "...*......",
      "..35..633.",
      "......#...",
      "617*......",
      ".....+.58.",
      "..592.....",
      "......755.",
      "...$.*....",
      ".664.598..",
    ];
    const result = part1(input);
    expect(result).toBe(4361);
  });
});
