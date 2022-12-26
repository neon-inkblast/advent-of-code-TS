import { part1 } from "./part_1";

describe("day 25 - part 1", () => {
  it("calculates the right answer!", () => {
    const input = [
      // 3125   625   125   25    5  1
      //  1     -2     -1    0   -1  2
      "1=-0-2",
      "12111",
      "2=0=",
      "21",
      "2=01",
      "111",
      "20012",
      "112",
      "1=-1=",
      "1-12",
      "12",
      "1=",
      "122",
    ];
    const result = part1(input);
    expect(result).toBe("2=-1=0");
  });
});
