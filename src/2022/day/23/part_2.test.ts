import { readFromFile } from "../../../utils/io";
import { part2 } from "./part_2";

describe("day 23 - part 2", () => {
  it("solves the puzzle!", () => {
    const input = readFromFile("_test.txt", __dirname);
    const result = part2(input);
    expect(result).toBe(20);
  });
});
