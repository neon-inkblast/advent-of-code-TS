import { part2dfs } from "./part_2_dfs";
import { part2bfs } from "./part_2_bfs";

describe("day 12 - part 2", () => {
  it("Finds the best path to set up permanently!", () => {
    const input = ["Sabqponm", "abcryxxl", "accszExk", "acctuvwj", "abdefghi"];
    const resultBFS = part2bfs(input);
    const resultDFS = part2dfs(input);
    expect(resultBFS).toBe(29);
    expect(resultDFS).toBe(29);
  });
});
