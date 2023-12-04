import { part2 } from "./part_2";

describe("day 03 - part 2", () => {
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
    const result = part2(input);
    expect(result).toBe(467835);
  });
});
