import chalk from "chalk";
import { print } from "../../utils/console";
import { timeExec } from "../../utils/perf";
import { part1 } from "./part_1";
import { part2 } from "./part_2";

export function day_XX() {
  const color1 = chalk.greenBright;
  const color2 = chalk.redBright;
  print(color1(`  Day XX - Part 1: ${timeExec(part1)}`));
  print(color2(`  Day XX - Part 2: ${timeExec(part2)}`));
}
