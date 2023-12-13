import { ints, sum } from "../../utils";
import { memoize } from "../../utils/cache";
import { readInputFromFile } from "../../utils/io";

export function part1(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);

  const UNKNOWN = "?";
  const DAMAGED = "#";
  const GOOD = ".";

  const mappedLines = lines.map((line) => {
    const [springs, nums] = line.split(" ");
    const damagedSegments = ints(nums);
    return { springs, damagedSegments };
  });

  function checkCombinations(springString: string, damagedSegments: number[]): number {
    if (springString.length === 0) {
      // if there are no segments left to find, found a valid path - 1
      // else we're missing a segment and path invalid  - 0
      const hasSegments = damagedSegments.length > 0;
      return hasSegments ? 0 : 1;
    }

    let nextChar = springString[0];
    switch (nextChar) {
      // .
      case GOOD: {
        // found a "." and not within a "###" segment
        // remove runs of "." and reevaluate when we hit "#" or "?"
        let chars = 0;
        while (nextChar === GOOD) {
          nextChar = springString[++chars];
        }
        return cachedCheck(springString.slice(chars), damagedSegments);
      }
      // #
      case DAMAGED: {
        if (damagedSegments.length < 1) {
          return 0;
        }
        const [currentSegment, ...remainingSegments] = damagedSegments;
        for (let i = 0; i < currentSegment; i++) {
          if (springString[i] == null || springString[i] === GOOD) {
            // found a "." or reached end of string where there should be "#"
            // not a valid combination
            return 0;
          } else if (springString[currentSegment] === DAMAGED) {
            // must be at least one non-damaged spring between damaged segments
            // this segment in the string is too long for the one we need next
            return 0;
          }
        }
        // this chunk that is ${currentSegment} long (+ buffer spring) is good, continue checking rest of string
        return cachedCheck(springString.slice(currentSegment + 1), remainingSegments);
      }
      // ?
      case UNKNOWN:
      default: {
        // since we don't know what this one could be, need to try both options

        // return (
        //   cachedCheck(DAMAGED + springString.slice(1), damagedSegments) +
        //   cachedCheck(GOOD + springString.slice(1), damagedSegments)
        // );

        // NO IDEA WHY BUT THIS RUNS 2x FASTER THAN THE CACHED ONE...
        // Thoughts:
        // because this then immediately goes into one of the other 2 cases on the recursion,
        // which is a cached operation, caching isn't needed here
        return (
          checkCombinations(DAMAGED + springString.slice(1), damagedSegments) +
          checkCombinations(GOOD + springString.slice(1), damagedSegments)
        );
      }
    }
  }
  // memoize the checking function
  const cachedCheck = memoize<number>(checkCombinations);
  // map lines to their valid combo numbers
  const figured = mappedLines.map((line) => cachedCheck(line.springs, line.damagedSegments));
  // sum
  return sum(figured);
}
