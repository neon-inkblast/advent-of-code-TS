import { part1 } from "./part_1";

describe("day 21 - part 1", () => {
  it("translates the monkey numbers good!", () => {
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
    const result = part1(input);
    expect(result).toBe(152);
  });
});
