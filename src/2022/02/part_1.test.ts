import { part1 } from "./part_1";

describe("day 02 - part 1", () => {
  it("calculates a score for Rock Paper Scissors based on a predetermined move", () => {
    const input = ["A Y", "B X", "C Z"];
    const result = part1(input);
    expect(result).toBe(15);
  });
});
