import { splitOnEmpty, sum } from "../../utils";
import { readInputFromFile } from "../../utils/io";

export function part2(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);
  const patterns = splitOnEmpty(lines);

  const mappedPatterns = patterns.map((pattern) => {
    let cols = new Array(pattern[0].length).fill("");
    pattern.forEach((row) => {
      row.split("").forEach((char, colIndex) => {
        cols[colIndex] += char;
      });
    });
    return { rows: pattern, cols };
  });

  // count the number of changes required to make the strings match
  function countDiffs(a: any[], b: any[]) {
    let error = 0;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        error++;
      }
    }
    return error;
  }
  function findMirror(arr: any[], multi: number) {
    for (let i = 1; i < arr.length; i++) {
      let errs = 0;
      // if two adjacent rows/cols have at most 1 difference
      if (countDiffs(arr[i], arr[i - 1]) <= 1) {
        // move out from the initial match and count differences in each pair
        for (let l = i - 1, r = i; errs < 2 && l >= 0 && r < arr.length; l--, r++) {
          errs += countDiffs(arr[l], arr[r]);
        }
        // if we had exactly 1 difference (the smudge) then this is the right pair
        if (errs === 1) {
          return i * multi;
        }
      }
    }
    return 0;
  }
  const x = mappedPatterns.map((p) => {
    const { cols, rows } = p;
    // return rows or cols whichever is nonzero
    return findMirror(rows, 100) || findMirror(cols, 1);
  });
  return sum(x);
}
