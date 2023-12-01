import { part2 } from "./part_2";

describe("day 01 - part 2", () => {
  it("calculates the top 3 elves with the most calories in their backpacks", () => {
    const input = [
      "1",
      "2",
      "",
      "3",
      "4",
      "",
      "2",
      "1",
      "1",
      "100",
      "",
      "3",
      "24",
      "",
      "30",
    ];
    const result = part2(input);
    expect(result).toBe(161);
  });
});
