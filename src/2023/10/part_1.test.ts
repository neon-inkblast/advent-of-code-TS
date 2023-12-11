import { part1 } from "./part_1";

describe("day 10 - part 1", () => {
  it("calculates the right answer!", () => {
    const input = [".....", ".S-7.", ".|.|.", ".L-J.", "....."];
    const result = part1(input);
    expect(result).toBe(4);
  });
  it("calculates the right answer!", () => {
    const input = ["7-F7-", ".FJ|7", "SJLL7", "|F--J", "LJ.LJ"];
    const result = part1(input);
    expect(result).toBe(8);
  });
});
