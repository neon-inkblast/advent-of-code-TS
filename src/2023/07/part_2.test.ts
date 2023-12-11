import { part2 } from "./part_2";

describe("day 07 - part 2", () => {
  it("solves the puzzle!", () => {
    const input = [
      "32T3K 765",
      "JJJJJ 111",
      "T55J5 684",
      "KK677 28",
      "KTJJT 220",
      "QQQJA 483",
    ];
    const result = part2(input);
    expect(result).toBe(6571);
  });
});
