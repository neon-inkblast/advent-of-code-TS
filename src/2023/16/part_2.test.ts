import { part2 } from "./part_2";

describe("day 16 - part 2", () => {
  it("solves the puzzle!", () => {
    const input = [
      ".|...\\....",
      "|.-.\\.....",
      ".....|-...",
      "........|.",
      "..........",
      ".........\\",
      "..../.\\\\..",
      ".-.-/..|..",
      ".|....-|.\\",
      "..//.|....",
    ];
    const result = part2(input);
    expect(result).toBe(51);
  });
});
