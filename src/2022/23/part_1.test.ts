import { readFromFile } from "../../../utils/io";
import { part1 } from "./part_1";

describe("day 23 - part 1", () => {
  it("calculates the right answer!", () => {
    const input = readFromFile("_test.txt", __dirname);
    const result = part1(input);
    expect(result).toBe(110);
  });
});
