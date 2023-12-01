import { part2 } from "./part_2";

describe("day 21 - part 2", () => {
  it("figures out what huge number i need to yell!!!", () => {
    const input = [
      "root: pppw + sjmn",
      "dbpl: 5",
      "cczh: sllz + lgvd",
      "zczc: 2",
      "ptdq: humn - dvpt",
      "dvpt: 3",
      "lfqf: 4",
      "humn: 5",
      "ljgn: 2",
      "sjmn: drzm * dbpl",
      "sllz: 4",
      "pppw: cczh / lfqf",
      "lgvd: ljgn * ptdq",
      "drzm: hmdt - zczc",
      "hmdt: 32",
    ];
    const result = part2(input);
    expect(result).toBe(301);
  });
});
