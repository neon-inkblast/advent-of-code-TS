import { part2 } from "./part_2";

describe("day 15 - part 2", () => {
  it("calculates the focal length through all HASHMAP boxes!", () => {
    const input = ["rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7"];
    const result = part2(input);
    expect(result).toBe(145);
  });
});
