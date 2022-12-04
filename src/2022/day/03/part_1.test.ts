import { part1 } from "./part_1";

describe("day 03 - part 1", () => {
  it("finds the priority sum of the common items in each elf's rucksack", () => {
    const input = [
      "vJrwpWtwJgWrhcsFMMfFFhFp",
      "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
      "PmmdzqPrVvPwwTWBwg",
      "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
      "ttgJtRGJQctTZtZT",
      "CrZsJsPPZsGzwwsLwLmpwMDw",
    ];
    const result = part1(input);
    expect(result).toBe(157);
  });
});
