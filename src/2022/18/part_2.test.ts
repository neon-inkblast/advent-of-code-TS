import { readFromFile } from "../../utils/io";
import { part2 } from "./part_2";

describe("day 18 - part 2", () => {
  it("calculates the EXTERNAL surface area of a flying lava droplet!", () => {
    const input = readFromFile("_test.txt", __dirname);
    const result = part2(input);
    expect(result).toBe(58);
  });
});
