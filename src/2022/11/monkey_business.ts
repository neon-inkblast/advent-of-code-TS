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
        case 0: // Monkey 0:
          monkey.id = +line[7];
          break;
        case 1: // Starting items: 62, 92, 50, 63, 62, 93, 73, 50
          const matches = line.matchAll(/\s(\d+)/g);
          monkey.items.push(...[...matches].map((m) => +m[1]));
          break;
        case 2: // Operation: new = old * 7
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
        case 3: // Test: divisible by 2
          monkey.test.divisor = +line.match(/(\d+)/g)![0];
        case 4: // If true: throw to monkey 7
          monkey.test.true = +line[29];
          break;
        case 5: // If false: throw to monkey 1
          monkey.test.false = +line[30];
          break;
      }
    }
    return monkey;
  });
  return monkeys;
}
