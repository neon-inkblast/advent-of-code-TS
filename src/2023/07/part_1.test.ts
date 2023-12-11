import { part1 } from "./part_1";

describe("day 07 - part 1", () => {
  it("calculates the right answer!", () => {
    const input = [
      "32T3K 765",
      "T55J5 684",
      "KK677 28",
      "KTJJT 220",
      "QQQJA 483",
    ];
    const result = part1(input);
    expect(result).toBe(6440);
  });
});
