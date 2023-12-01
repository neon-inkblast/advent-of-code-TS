import { part1dfs } from "./part_1_dfs";
import { part1bfs } from "./part_1_bfs";

describe("day 12 - part 1", () => {
  it("Finds the shortest path to the top!", () => {
    const input = ["Sabqponm", "abcryxxl", "accszExk", "acctuvwj", "abdefghi"];
    const resultBFS = part1bfs(input);
    const resultDFS = part1dfs(input);
    expect(resultBFS).toBe(31);
    expect(resultDFS).toBe(31);
  });
});
