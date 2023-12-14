import { part1 } from "./part_1";

describe("day 14 - part 1", () => {
  it("calculates the right answer!", () => {
    const input = [
      "O....#....",
      "O.OO#....#",
      ".....##...",
      "OO.#O....O",
      ".O.....O#.",
      "O.#..O.#.#",
      "..O..#O..O",
      ".......O..",
      "#....###..",
      "#OO..#....",
    ];
    const result = part1(input);
    expect(result).toBe(136);
  });
});
