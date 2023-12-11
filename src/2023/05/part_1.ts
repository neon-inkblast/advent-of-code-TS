import { ints, sortAsc, splitOnEmpty } from "../../utils";
import { readInputFromFile } from "../../utils/io";

export function part1(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);
  let items: number[] = sortAsc(ints(lines[0]));
  let nextItems = [];
  const maps = splitOnEmpty(lines.slice(2)).map((map) =>
    map
      .slice(1)
      .map((nums) => {
        const [destStart, sourceStart, range]: number[] = ints(nums);
        return {
          start: sourceStart,
          end: sourceStart + range - 1,
          sourceToDest: destStart - sourceStart,
        };
      })
      .sort((a, b) => a.start - b.start),
  );

  for (let overallIndex = 0; overallIndex < maps.length; overallIndex++) {
    let currItem = items.shift();
    let baseMap = maps[overallIndex];
    let mapLength = baseMap.length;
    let mapIndex = 0;
    let loop = 0;
    while (currItem && mapIndex < mapLength && loop < 1000) {
      let map = baseMap[mapIndex];
      let { start, end, sourceToDest } = map;
      if (currItem < start) {
        nextItems.push(currItem);
        currItem = items.shift();
      } else if (currItem >= start && currItem <= end) {
        const mappedItem = currItem + sourceToDest;
        nextItems.push(mappedItem);
        currItem = items.shift();
      } else {
        mapIndex++;
      }
      loop++;
    }
    if (currItem) {
      items.push(currItem);
    }
    items = sortAsc([...nextItems, ...items]);
    nextItems = [];
  }
  return sortAsc(items)[0];
}
