import { part1 } from "./part_1";

describe("day 13 - part 1", () => {
  it("calculates the right answer!", () => {
    const input = [
      "#.##..##.",
      "..#.##.#.",
      "##......#",
      "##......#",
      "..#.##.#.",
      "..##..##.",
      "#.#.##.#.",
      "",
      "#...##..#",
      "#....#..#",
      "..##..###",
      "#####.##.",
      "#####.##.",
      "..##..###",
      "#....#..#",
    ];
    const result = part1(input);
    expect(result).toBe(405);
  });
});
