import { readFromFile } from "../../../utils/io";
import { part1 } from "./part_1";

describe("day 19 - part 1", () => {
  it("calculates the right answer!", () => {
    const input = readFromFile("_test.txt", __dirname);
    const result = part1(input, 5);
    expect(result).toBe(33);
  });
});
