import { readFromFile } from "../../../utils/io";
import { part2 } from "./part_2";

describe("day 20 - part 2", () => {
  it("Uses the decryption key and additional mix cycles to find the elves grove!", () => {
    const input = ["1", "2", "-3", "3", "-2", "0", "4"];
    const result = part2(input);
    expect(result).toBe(1623178306);
  });
});
