import { timeExec } from "../../../utils/perf";
import { part1 } from "./part_1";
import { part2 } from "./part_2";

export function day_10() {
  console.log(`║ Day 10 - Part 1: ${timeExec(part1)}`);
  console.log(`║ Day 10 - Part 2: ${part2()}`);
}
