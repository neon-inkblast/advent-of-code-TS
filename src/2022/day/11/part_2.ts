import { multi, sortAsc, splitOnEmpty } from "../../../utils/array";
import { readInputFromFile } from "../../../utils/io";
import { Monkey, monkeyParser } from "./monkey_business";

export function part2(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);

  const rawMonkeys = splitOnEmpty(lines);

  const monkeys = monkeyParser(rawMonkeys);

  const commonDivisor = monkeys
    .map((monkey) => monkey.test.divisor)
    .reduce((acc, div) => acc * div);

  for (let i = 0; i < 10000; i++) {
    monkeyARound(monkeys, commonDivisor);
  }

  return multi(sortAsc(monkeys.map((monkey) => monkey.inspections)).slice(-2));
}

function monkeyARound(monkeys: Monkey[], commonDivisor: number) {
  monkeys.forEach((monkey) => {
    monkey.items.forEach((worry) => {
      let newWorry = monkey.op(worry);

      newWorry = newWorry % commonDivisor;

      const test = newWorry % monkey.test.divisor === 0;
      const index = test ? monkey.test.true : monkey.test.false;
      monkeys[index].items.push(newWorry);
      monkey.inspections++;
    });
    monkey.items = [];
  });
}
