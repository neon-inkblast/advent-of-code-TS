import { readFromFile } from "../../../utils/io";
import { part1 } from "./part_1";

describe("day 22 - part 1", () => {
  it("Finds a path using the map!", () => {
    const input = readFromFile("_test.txt", __dirname);
    const result = part1(input);
    expect(result).toBe(6032);
  });
});
