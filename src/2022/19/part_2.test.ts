import { readFromFile } from "../../../utils/io";
import { part2 } from "./part_2";

describe("day 19 - part 2", () => {
  it("Works out which bots to build for 32 mins!", () => {
    const input = readFromFile("_test.txt", __dirname);
    const result = part2(input);
    // should be 56 x 62 according to test case
    expect(result).toBe(3348);
  });
});
