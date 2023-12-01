import chalk from "chalk";
import { print } from "../../utils/console";
import { timeExec } from "../../utils/perf";
import { part1 } from "./part_1";
import { part2 } from "./part_2";

export function day_XX() {
  const color = +"XX" % 2 === 0 ? chalk.greenBright : chalk.redBright;
  print(color(`  Day XX - Part 1: ${timeExec(part1)}`));
  print(color(`  Day XX - Part 2: ${timeExec(part2)}`));
}
