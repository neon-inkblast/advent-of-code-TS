import chalk from "chalk";
import { print } from "../../utils/console";
import { timeExec } from "../../utils/perf";
import { part1 } from "./part_1";
import { part2 } from "./part_2";

export function day_06() {
  const color1 = chalk.greenBright;
  const color2 = chalk.redBright;
  print(color1(`  Day 06 - Part 1: ${timeExec(part1)}`));
  print(color2(`  Day 06 - Part 2: ${timeExec(part2)}`));
}
