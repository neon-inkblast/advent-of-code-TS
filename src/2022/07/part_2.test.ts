import { part2 } from "./part_2";

describe("day 07 - part 2", () => {
  it("finds the smallest directory large enough to free up space on the device!", () => {
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
    const result = part2(input);
    expect(result).toBe(24933642);
  });
});
