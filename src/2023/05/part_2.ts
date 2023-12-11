import { ints, splitOnEmpty } from "../../utils";
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
  let seeds: number[] = ints(lines[0]);
  let items: Range[] = [];
  for (let i = 0; i < seeds.length; i += 2) {
    items.push({ start: seeds[i], end: seeds[i] + seeds[i + 1] - 1 });
  }

  let nextItems = [];
  const maps = splitOnEmpty(lines.slice(2)).map((map) =>
    map
      .slice(1)
      .map((nums): RangeWithConversion => {
        const [destStart, sourceStart, range]: number[] = ints(nums);
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
      // |»»»»»»»| source range
      // |«««««««| destination range
      // |███████| overlap between both
      if (currItem.end < start) {
        // no intersection, destination higher than source
        //····|»»»»»»»|····|«««««««|······
        nextItems.push(currItem);
        currItem = items.shift();
        //
        // left overlap
        // ······|»»»»»»»|██████████|«««««««|······
      } else if (currItem.start < start && currItem.end >= start && currItem.end <= end) {
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
      // ······|«««««««|██████████|»»»»»»»|······
      else if (currItem.end > end && currItem.start >= start && currItem.start <= end) {
        const r1 = { start: currItem.start, end };
        const r2 = { start: end + 1, end: currItem.end };
        r1.start += sourceToDest;
        r1.end += sourceToDest;
        nextItems.push(r1);
        items.push(r2);
        items.sort(sortByStart);
        currItem = items.shift();
        //
        // source covers destination
        // ······|»»»»»»»|██████████|»»»»»»»|······
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
        // destination covers source
        // ······|«««««««|██████████|«««««««|······
      } else if (currItem.end <= end && currItem.start >= start) {
        currItem.start += sourceToDest;
        currItem.end += sourceToDest;
        nextItems.push(currItem);
        currItem = items.shift();
      } else {
        // no intersection, destination lower than source
        // ······|«««««««|···|»»»»»»»|······

        mapIndex++;
      }
      loop++;
    }
    // put the current item back if we still have one
    if (currItem) {
      items.push(currItem);
    }
    // construct the sorted source list for the next mapping set
    items = [...nextItems, ...items].sort(sortByStart);
    nextItems = [];
  }
  return items[0].start;
}
