import { sum } from "../../utils";
import { readInputFromFile } from "../../utils/io";

export function part2(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);

  const numMap: Record<string, number> = {
    on: 1,
    tw: 2,
    thre: 3,
    four: 4,
    fiv: 5,
    six: 6,
    seve: 7,
    eigh: 8,
    nin: 9,
  };

  const nums = lines.map((line) => {
    const matches = Array.from(
      line.matchAll(
        /(?:\d|on(?=e)|tw(?=o)|thre(?=e)|four|fiv(?=e)|six|seve(?=n)|eigh(?=t)|nin(?=e))/g,
      ) ?? [],
    ).map((x) => x[0]);

    const ttn = matches.map((match) => {
      if (numMap[match] != null) {
        return numMap[match];
      }
      return match;
    });
    if (ttn.length < 1) {
      return 0;
    }
    const first = ttn[0];
    const last = ttn[ttn.length - 1];
    let add = +`${first}${last}`;
    return add;
  });

  return sum(nums);
}
