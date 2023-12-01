import { readInputFromFile } from "../../utils/io";

type OpsMonkey = {
  op: string;
  deps: string[];
};

export function part1(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);

  // monkeys with operations
  const opsMonkeys: Record<string, OpsMonkey> = {};
  // monkey reverse dependency mapping
  const monkeyDeps: Record<string, string[]> = {};
  // monkeys with known values
  const solvedMonkeys: Record<string, number> = {};
  // monkeys to solve
  const monqueues: string[] = [];

  // parse monkeys into various maps and lists
  lines.forEach((line) => {
    const tokens = line.split(" ");
    // operations monkey, add to ops monkeys
    if (tokens.length > 2) {
      let [name, dep1, op, dep2] = tokens;
      name = name.slice(0, 4);
      opsMonkeys[name] = {
        op,
        deps: [dep1, dep2],
      };

      // map the dependencies, keyed on the dependency names
      monkeyDeps[dep1] = monkeyDeps[dep1]
        ? [...monkeyDeps[dep1], name]
        : [name];

      monkeyDeps[dep2] = monkeyDeps[dep2]
        ? [...monkeyDeps[dep2], name]
        : [name];
    } else {
      // not ops monkey, already known value
      let [name, mNum] = tokens;
      name = name.slice(0, 4);
      solvedMonkeys[name] = +mNum.trim();
      monqueues.push(name);
    }
  });

  function trickleUpMonkeynomics(name: string) {
    // if there are other monkeys dependent on this one
    if (monkeyDeps[name]) {
      // got through each depending monkey
      monkeyDeps[name].forEach((monkeyInNeed) => {
        // if it's already solved, don't bother solving again
        if (solvedMonkeys[monkeyInNeed]) {
          return;
        }
        // put operations monkey results here
        let result: number | null = null;
        // monkeys that need other monkeys do operations
        // so get the ops data
        const opParent = opsMonkeys[monkeyInNeed];
        // and see if we have both dependencies solved
        const opNums = opParent.deps.map((needs) => solvedMonkeys[needs]);
        const hasAll = opNums.every((opNum) => opNum != undefined);

        // if we have both dependencies then stop monkeying about
        // and solve this monkey's mathemagical operation
        if (hasAll) {
          switch (opParent.op) {
            case "/": {
              result = opNums[0] / opNums[1];
              break;
            }
            case "*": {
              result = opNums[0] * opNums[1];
              break;
            }
            case "+": {
              result = opNums[0] + opNums[1];
              break;
            }
            case "-": {
              result = opNums[0] - opNums[1];
              break;
            }
          }
        }
        // if we ended up with a solution
        if (result != null) {
          // add it to the monkey map of known solutions
          solvedMonkeys[monkeyInNeed] = result;
          // and pop it in the queue (but actually push)
          // for evalutating it's depending ops monkeys
          monqueues.push(monkeyInNeed);
        }
      });
    }
  }

  // solve all monkeys that we can solve!
  while (monqueues.length > 0) {
    trickleUpMonkeynomics(monqueues.pop()!);
  }

  // monkey mathgic!
  return solvedMonkeys["root"];
}
