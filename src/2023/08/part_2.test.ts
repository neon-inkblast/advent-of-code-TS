import { part2 } from "./part_2";

describe("day 08 - part 2", () => {
  it("solves the puzzle!", () => {
    const input = [
      "LR",
      "",
      "11A = (11B, XXX)",
      "11B = (XXX, 11Z)",
      "11Z = (11B, XXX)",
      "22A = (22B, XXX)",
      "22B = (22C, 22C)",
      "22C = (22Z, 22Z)",
      "22Z = (22B, 22B)",
      "XXX = (XXX, XXX)",
    ];
    const result = part2(input);
    expect(result).toBe(6);
  });
});
