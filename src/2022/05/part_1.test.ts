import { part1 } from "./part_1";

describe("day 05 - part 1", () => {
  it("Can list the top crate in each stack after all the crate movements!", () => {
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
    const result = part1(input);
    expect(result).toBe("CMZ");
  });
});
