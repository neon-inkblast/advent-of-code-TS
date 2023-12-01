import { part1 } from "./part_1";

describe("day 07 - part 1", () => {
  it("finds the total space used by directories on the device < 1000000 in size", () => {
    const input = [
      "$ cd /",
      "$ ls",
      "dir a",
      "14848514 b.txt",
      "8504156 c.dat",
      "dir d",
      "$ cd a",
      "$ ls",
      "dir e",
      "29116 f",
      "2557 g",
      "62596 h.lst",
      "$ cd e",
      "$ ls",
      "584 i",
      "$ cd ..",
      "$ cd ..",
      "$ cd d",
      "$ ls",
      "4060174 j",
      "8033020 d.log",
      "5626152 d.ext",
      "7214296 k"
    ];
    const result = part1(input);
    expect(result).toBe(95437);
  });
});
