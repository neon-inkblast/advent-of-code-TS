import { part1 } from "./part_1";

describe("day 15 - part 1", () => {
  it("can HASH the input instructions", () => {
    const input = ["rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7"];
    const result = part1(input);
    expect(result).toBe(1320);
  });
});
