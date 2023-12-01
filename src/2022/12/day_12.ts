import { part1dfs } from "./part_1_dfs";
import { part1bfs } from "./part_1_bfs";
import { part2dfs } from "./part_2_dfs";
import { part2bfs } from "./part_2_bfs";
import { timeExec } from "../../utils/perf";

export function day_12() {
  console.log(`║ Day 12 - Part 1 - DFS: ${timeExec(part1dfs)}`);
  console.log(`║ Day 12 - Part 2 - DFS: ${timeExec(part2dfs)}`);

  console.log(`║ Day 12 - Part 1 - BFS: ${timeExec(part1bfs)}`);
  console.log(`║ Day 12 - Part 2 - BFS: ${timeExec(part2bfs)}`);
}
