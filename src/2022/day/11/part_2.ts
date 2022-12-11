import { multi, sortAsc, splitOnEmpty, sum } from "../../../utils/array";
import { readInputFromFile } from "../../../utils/readInputFromFile";
import { Big } from "big.js";

type Monkey = {
  id: number;
  inspections: number;
  items: number[];
  nextItems: number[];
  op: (old: number) => number;
  test: {
    divisor: number;
    true: number;
    false: number;
  };
};
export function part2(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);

  const rawMonkeys = splitOnEmpty(lines);

  const monkeys = monkeyParser(rawMonkeys);

  const commonDivisor = monkeys
    .map((monkey) => monkey.test.divisor)
    .reduce((acc, div) => acc * div);

  for (let i = 0; i < 10000; i++) {
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

  return multi(sortAsc(monkeys.map((monkey) => monkey.inspections)).slice(-2));
}

function monkeyParser(monkeyLines: string[][]) {
  const monkeys = monkeyLines.map((rawMonkey) => {
    const monkey: Monkey = {
      id: 0,
      inspections: 0,
      items: [],
      nextItems: [],
      op: (_) => -1,
      test: {
        divisor: 0,
        true: 0,
        false: 0
      }
    };
    for (let i = 0; i < rawMonkey.length; i++) {
      const line = rawMonkey[i];
      switch (i) {
        case 0:
          monkey.id = +line[7];
          break;
        case 1:
          const matches = line.matchAll(/\s(\d+)/g);
          monkey.items.push(...[...matches].map((m) => +m[1]));
          break;
        case 2:
          const [, eqn] = line.split("=");

          const [, operator, amount] = eqn
            .trim()
            .split(" ")
            .map((x: string) => x.trim());

          monkey.op = (old) => {
            const amt = isNaN(+amount) ? old : +amount;
            if (operator === "+") {
              return old + amt;
            }
            return old * amt;
          };
          break;
        case 3:
          monkey.test.divisor = +line.match(/(\d+)/g)![0];
        case 4:
          monkey.test.true = +line[29];
          break;
        case 5:
          monkey.test.false = +line[30];
          break;
        default:
          break;
      }
    }
    return monkey;
  });
  return monkeys;
}
