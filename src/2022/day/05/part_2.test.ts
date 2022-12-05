import { part2 } from "./part_2";

describe("day 05 - part 2", () => {
  it("Can list the top crate in each stack after the CrateMover 9001 finishes shuffling them!", () => {
    const input = [
      "    [D]",    
      "[N] [C]",
      "[Z] [M] [P]",
      " 1   2   3 ",
      "",
      "move 1 from 2 to 1",
      "move 3 from 1 to 3",
      "move 2 from 2 to 1",
      "move 1 from 1 to 2"
    ];
    const result = part2(input);
    expect(result).toBe("MCD");
  });
});
