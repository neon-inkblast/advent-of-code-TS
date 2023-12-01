import { readFromFile } from "../../../utils/io";
import { part2 } from "./part_2";

describe("day 17 - part 2", () => {
  it("solves the puzzle!", () => {
    const input = readFromFile("_test.txt", __dirname);
    const result = part2(input[0]);
    expect(result).toBe(1514285714288);
  });
});
