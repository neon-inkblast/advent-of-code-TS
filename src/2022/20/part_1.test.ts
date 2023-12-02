import { part1 } from "./part_1";

describe("day 20 - part 1", () => {
  it("Performs signal mixing to find the elves grove!", () => {
    const input = ["1", "2", "-3", "3", "-2", "0", "4"];
    const result = part1(input);
    expect(result).toBe(3);
  });
});
