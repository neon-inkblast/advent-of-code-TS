export type Monkey = {
  id: number;
  inspections: number;
  items: number[];
  op: (old: number) => number;
  test: {
    divisor: number;
    true: number;
    false: number;
  };
};

export function monkeyParser(monkeyLines: string[][]) {
  const monkeys = monkeyLines.map((rawMonkey) => {
    const monkey: Monkey = {
      id: 0,
      inspections: 0,
      items: [],
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

          const [, operator, amount] = eqn.trim().split(" ");

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
