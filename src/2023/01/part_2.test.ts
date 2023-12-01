import { part2 } from "./part_2";

describe("day 01 - part 2", () => {
  it("solves the puzzle!", () => {
    const input = [
      "two1nine",
      "eightwothree",
      "abcone2threexyz",
      "xtwone3four",
      "4nineeightseven2",
      "nineighte",
      "zoneight234",
      "7pqrstsixteen",
    ];
    const result = part2(input);
    expect(result).toBe(379);
  });
});
