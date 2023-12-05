import { splitOnEmpty } from "../../utils";
import { readInputFromFile } from "../../utils/io";

export interface Range {
  start: number;
  end: number;
}
export interface RangeWithConversion extends Range {
  sourceToDest: number;
}
export function part2(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);
  const sortByStart = (a: Range, b: Range) => a.start - b.start;
  let seeds: number[] = lines[0].match(/\d+/g)?.map((x) => +x) ?? [];
  let items: Range[] = [];
  for (let i = 0; i < seeds.length; i += 2) {
    items.push({ start: seeds[i], end: seeds[i] + seeds[i + 1] - 1 });
  }

  let nextItems = [];
  const maps = splitOnEmpty(lines.slice(2)).map((map) =>
    map
      .slice(1)
      .map((nums): RangeWithConversion => {
        const [destStart, sourceStart, range]: number[] = nums
          .match(/\d+/g)
          ?.map((x) => +x) ?? [0, 0, 0];
        return {
          start: sourceStart,
          end: sourceStart + range - 1,
          sourceToDest: destStart - sourceStart,
        };
      })
      .sort(sortByStart),
  );

  for (let overallIndex = 0; overallIndex < maps.length; overallIndex++) {
    let currItem: Range | undefined = items.shift();
    let baseMap = maps[overallIndex];
    let mapLength = baseMap.length;
    let mapIndex = 0;
    let loop = 0;
    while (currItem && mapIndex < mapLength && loop < 1000) {
      let map = baseMap[mapIndex];
      let { start, end, sourceToDest } = map;
      if (currItem.end < start) {
        // no intersection, destination too high
        // - - - |----| - |~~~~~~~~|- - - -
        nextItems.push(currItem);
        currItem = items.shift();
        //
        // left overlap
        // - - - |-----|==|~~~~~~|- - - -
      } else if (
        currItem.start < start &&
        currItem.end >= start &&
        currItem.end <= end
      ) {
        const r1 = { start: currItem.start, end: start - 1 };
        const r2 = { start, end: currItem.end };
        r2.start += sourceToDest;
        r2.end += sourceToDest;
        nextItems.push(r1);
        nextItems.push(r2);
        currItem = items.shift();
      }
      //
      // right overlap
      // - - - |~~~~~|======|-------|- - - -
      else if (
        currItem.end > end &&
        currItem.start >= start &&
        currItem.start <= end
      ) {
        const r1 = { start: currItem.start, end };
        const r2 = { start: end + 1, end: currItem.end };
        r1.start += sourceToDest;
        r1.end += sourceToDest;
        nextItems.push(r1);
        items.push(r2);
        items.sort(sortByStart);
        currItem = items.shift();
        //
        // source overlaps destination
        // - - - |------|======|-----|- - - -
      } else if (currItem.start < start && currItem.end > end) {
        const r1 = { start: currItem.start, end: start - 1 };
        const r2 = { start, end };
        const r3 = { start: end + 1, end: currItem.end };
        r2.start += sourceToDest;
        r2.end += sourceToDest;
        nextItems.push(r1);
        nextItems.push(r2);
        items.push(r3);
        items.sort(sortByStart);
        currItem = items.shift();
        //
        // source overlaps destination overlaps source
        // - - - |------|======|-----|- - - -
      } else if (currItem.end <= end && currItem.start >= start) {
        currItem.start += sourceToDest;
        currItem.end += sourceToDest;
        nextItems.push(currItem);
        currItem = items.shift();
      } else {
        // no intersection, destination too small
        // - - - - |~~~~~~~~| - |----| - - -

        mapIndex++;
      }
      loop++;
    }
    // put the current item back if we still have one
    if (currItem) {
      items.push(currItem);
    }
    // sort the list for the next iteration
    items = [...nextItems, ...items].sort(sortByStart);
    nextItems = [];
  }
  return items[0].start;
}
