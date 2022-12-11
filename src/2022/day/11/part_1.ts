import { multi, sortAsc, splitOnEmpty } from "../../../utils/array";
import { readInputFromFile } from "../../../utils/io";
import { Monkey, monkeyParser } from "./monkey_business";

export function part1(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);

  const rawMonkeys = splitOnEmpty(lines);

  const monkeys = monkeyParser(rawMonkeys);

  for (let i = 0; i < 20; i++) {
    monkeyARound(monkeys);
  }

  return multi(sortAsc(monkeys.map((monkey) => monkey.inspections)).slice(-2));
}

function monkeyARound(monkeys: Monkey[]) {
  monkeys.forEach((monkey) => {
    monkey.items.forEach((worry) => {
      let newWorry = 0;

      newWorry = monkey.op(worry);

      newWorry = Math.floor(newWorry / 3);

      const test = newWorry % monkey.test.divisor === 0;
      const index = test ? monkey.test.true : monkey.test.false;

      monkeys[index].items.push(newWorry);
      monkey.inspections++;
    });
    monkey.items = [];
  });
}
