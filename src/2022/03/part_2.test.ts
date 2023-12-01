import { part2 } from "./part_2";

describe("day 03 - part 2", () => {
  it("finds the priority sum of common items, or badges, for each group of 3 elves", () => {
    const input = [
      "vJrwpWtwJgWrhcsFMMfFFhFp",
      "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
      "PmmdzqPrVvPwwTWBwg",
      "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
      "ttgJtRGJQctTZtZT",
      "CrZsJsPPZsGzwwsLwLmpwMDw",
    ];
    const result = part2(input);
    expect(result).toBe(70);
  });
});
