import { readFromFile } from "../../../utils/io";
import { part1 } from "./part_1";

describe("day 18 - part 1", () => {
  it("calculates the surface area of a flying lava droplet!", () => {
    const input = readFromFile("_test.txt", __dirname);
    const result = part1(input);
    expect(result).toBe(64);
  });
});
