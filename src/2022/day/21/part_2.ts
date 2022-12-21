import { readInputFromFile } from "../../../utils/io";

type OpsMonkey = {
  op: string;
  deps: string[];
};

export function part2(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);

  // me
  const SPECIAL_MONKEY = "humn";
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
      if (name !== SPECIAL_MONKEY) {
        solvedMonkeys[name] = +mNum.trim();
        monqueues.push(name);
      }
    }
  });

  // traverse through the dependency chain from 'id'
  // until we find 'root', return store the path taken
  function getDependencyPath(id: string) {
    let next = monkeyDeps[id][0];
    let deps = [id];
    while (next !== "root") {
      deps.push(next);
      next = monkeyDeps[next][0];
    }
    return deps;
  }

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
        // if we're in the special case of being the 'root' node
        // don't need both sides solved, as one side is just equal to the other
        // solve root as whichever side comes in first
        if (monkeyInNeed === "root") {
          result = opNums.filter((n) => n != null)[0];
        }
        // if not root, behave as normal
        // if we have both dependencies then stop monkeying about
        // and solve this monkey's mathemagical operation
        else if (hasAll) {
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

  // solve all monkeys that we can solve
  while (monqueues.length > 0) {
    trickleUpMonkeynomics(monqueues.pop()!);
  }
  // get the list of solves needed to get from root back to me
  const humanDependencies = getDependencyPath(SPECIAL_MONKEY);
  // get the last value from here, will be the unknown side
  // of the root equality check
  let humanPointer = humanDependencies.pop()!;
  // get the value of the known side of the root equality check
  let result = solvedMonkeys["root"];
  while (humanDependencies.length > 0) {
    // store the last result against this monkey
    // first iteration will store the unknown side of the root
    // equality check against the appropriate key
    solvedMonkeys[humanPointer] = result;

    // find the operation that was used to come up with 'result'
    const opParent = opsMonkeys[humanPointer];
    // get the known side of the operation
    const opNum =
      solvedMonkeys[opParent.deps[0]] ?? solvedMonkeys[opParent.deps[1]];
    // work out if the known side is to the left or right of the operator
    const haveLeft = !!solvedMonkeys[opParent.deps[0]];
    // reverse the operation
    switch (opParent.op) {
      case "/": {
        result = haveLeft ? opNum / result : result * opNum;
        break;
      }
      case "*": {
        result = result / opNum;
        break;
      }
      case "+": {
        result = result - opNum;
        break;
      }
      case "-": {
        result = haveLeft ? opNum - result : result + opNum;
        break;
      }
    }
    // get the next link in the human dependencies
    humanPointer = humanDependencies.pop()!;
  }

  // we exited the loop when we hit my name, so store it
  solvedMonkeys[SPECIAL_MONKEY] = result;

  // return my number
  return solvedMonkeys[SPECIAL_MONKEY];
}
