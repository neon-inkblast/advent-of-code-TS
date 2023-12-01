import { splitOnEmpty } from "../../utils/array";
import { readInputFromFile } from "../../utils/io";

export function part1(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);
  const [stackLines, instructions] = splitOnEmpty(lines);

  // set up an array to hold the stacks of crates
  const stacks: string[][] = [];
  // reverse the input definition to read bottom to top
  // ie.
  //
  //    "    [D]"                    " 1   2   3 "
  //    "[N] [C]"       |---->       "[Z] [M] [P]"
  //    "[Z] [M] [P]"   |---->       "[N] [C]"
  //    " 1   2   3 "                "    [D]"
  stackLines.reverse();
  // work out the number of stacks by counting the number of words in first row
  const numStacks = stackLines[0].split(" ").filter((x) => !!x).length;
  // fill the stacks queues with the corresponding crates
  // by checking character at position n+4 in each line
  // where n starts at 1
  stackLines.slice(1).forEach((line: string) => {
    // n = 1, first character in a line a crate label can be in
    let n = 1;
    // loop for the number of stacks (length of line)
    // increase n by 4 each iteration to jump to the next char space
    for (let i = 0; i < numStacks; i++, n += 4) {
      // if the char at pos n isn't blank, it's a crate label
      if (line[n] && line[n] != " ") {
        // add crate n to stack i
        stacks[i] = stacks[i] ? [...stacks[i], line[n]] : [line[n]];
      }
    }
  });

  // read crate movement instructions line by line
  instructions.forEach((instruction: string) => {
    // parse the instruction for 3 numbers
    const matches = instruction.matchAll(/\d+/g);
    // first is the number of crates to move
    const num = matches.next().value[0];
    // second is the stack to move from
    const from = matches.next().value[0];
    // third is the stack to move to
    const to = matches.next().value[0];

    // for each crate to move
    for (let i = 0; i < num; i++) {
      // if the source stack exists and isn't empty
      if (stacks[from - 1] && stacks[from - 1].length > 0) {
        // push a crate onto the destination stack from the source stack
        stacks[to - 1].push(stacks[from - 1].pop() as string);
      }
    }
  });

  // concat the last crate element from each stack into a string and return
  return stacks.reduce((acc, stack) => {
    return acc + stack.pop();
  }, "");
}
