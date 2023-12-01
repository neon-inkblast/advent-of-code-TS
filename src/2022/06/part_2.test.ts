import { part2 } from "./part_2";

describe("day 06 - part 2", () => {
  it("can find the start-message marker! (14 prev digits are different)", () => {
    const input = ["mjqjpqmgbljsphdztnvjfqwrcgsmlb"];
    const result = part2(input);
    expect(result).toBe(19);
  });
});
