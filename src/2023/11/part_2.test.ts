import { part2 } from "./part_2";

describe("day 11 - part 2", () => {
  it("calculates the right answer for expansion of 10 times", () => {
    const input = [
      "...#......",
      ".......#..",
      "#.........",
      "..........",
      "......#...",
      ".#........",
      ".........#",
      "..........",
      ".......#..",
      "#...#.....",
    ];
    const result = part2(input, 9);
    expect(result).toBe(1030);
  });
  it("calculates the right answer for expansion of 100 times", () => {
    const input = [
      "...#......",
      ".......#..",
      "#.........",
      "..........",
      "......#...",
      ".#........",
      ".........#",
      "..........",
      ".......#..",
      "#...#.....",
    ];
    const result = part2(input, 99);
    expect(result).toBe(8410);
  });
});
