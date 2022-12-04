import { part2 } from "./part_2";

describe("day 02 - part 2", () => {
  it("calculates a score for Rock Paper Scissors based on a predetermined outcome", () => {
    const input = ["A Y", "B X", "C Z"];
    const result = part2(input);
    expect(result).toBe(12);
  });
});
