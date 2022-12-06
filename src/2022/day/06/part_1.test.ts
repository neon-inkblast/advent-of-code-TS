import { part1 } from "./part_1";

describe("day 06 - part 1", () => {
  it("can find the start-packet marker! (4 prev digits are different)", () => {
    const input = ["bvwbjplbgvbhsrlpgdmjqwftvncz"];
    const result = part1(input);
    expect(result).toBe(5);
  });
});
