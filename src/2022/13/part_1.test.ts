import { part1 } from "./part_1";

describe("day 13 - part 1", () => {
  it("finds all packet pairs that are in the correct order!", () => {
    const input = [
      "[1,1,3,1,1]",
      "[1,1,5,1,1]",
      "",
      "[[1],[2,3,4]]",
      "[[1],4]",
      "",
      "[9]",
      "[[8,7,6]]",
      "",
      "[[4,4],4,4]",
      "[[4,4],4,4,4]",
      "",
      "[7,7,7,7]",
      "[7,7,7]",
      "",
      "[]",
      "[3]",
      "",
      "[[[]]]",
      "[[]]",
      "",
      "[1,[2,[3,[4,[5,6,7]]]],8,9]",
      "[1,[2,[3,[4,[5,6,0]]]],8,9]"
    ];
    const result = part1(input);
    expect(result).toBe(13);
  });
});
