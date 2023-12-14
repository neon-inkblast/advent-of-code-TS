import { part2 } from "./part_2";

describe("day 14 - part 2", () => {
  it("solves the puzzle!", () => {
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
    const result = part2(input);
    expect(result).toBe(64);
  });
});
