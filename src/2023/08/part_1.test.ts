import { part1 } from "./part_1";

describe("day 08 - part 1", () => {
  it("calculates the right answer!", () => {
    const input = [
      "RL",
      "",
      "AAA = (BBB, CCC)",
      "BBB = (DDD, EEE)",
      "CCC = (ZZZ, GGG)",
      "DDD = (DDD, DDD)",
      "EEE = (EEE, EEE)",
      "GGG = (GGG, GGG)",
      "ZZZ = (ZZZ, ZZZ)",
    ];
    const result = part1(input);
    expect(result).toBe(2);
  });
  it("calculates the right answer!", () => {
    const input = [
      "LLR",
      "",
      "AAA = (BBB, BBB)",
      "BBB = (AAA, ZZZ)",
      "ZZZ = (ZZZ, ZZZ)",
    ];
    const result = part1(input);
    expect(result).toBe(6);
  });
});
