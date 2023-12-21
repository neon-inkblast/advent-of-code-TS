import { readFromFile } from "../../utils";
import { part1 } from "./part_1";

describe("day 20 - part 1", () => {
  it("Pushes the button 1000 times!", () => {
    const input = readFromFile("_test.txt", __dirname);
    const result = part1(input);
    expect(result).toBe(32000000);
  });
  it("Pushes the button 1000 times more!", () => {
    const input = readFromFile("_test2.txt", __dirname);
    const result = part1(input);
    expect(result).toBe(11687500);
  });
});
