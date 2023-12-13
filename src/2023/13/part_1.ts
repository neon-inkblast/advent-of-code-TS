import { splitOnEmpty, sum } from "../../utils";
import { readInputFromFile } from "../../utils/io";

export function part1(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);
  const patterns = splitOnEmpty(lines);

  const mappedPatterns = patterns.map((pattern, pIndex) => {
    let cols = new Array(pattern[0].length).fill("");
    const rows = pattern.map((row, index) => {
      row.split("").forEach((char, colIndex) => {
        cols[colIndex] += char;
      });
      return row;
    });
    return { rows, cols };
  });

  function findMirror(arr: any[], multi: number) {
    for (let i = 1; i < arr.length; i++) {
      let found = true;
      if (arr[i] === arr[i - 1]) {
        // move out from the initial match and test each pair
        for (let l = i - 1, r = i; l >= 0 && r < arr.length; l--, r++) {
          if (arr[l] !== arr[r]) {
            found = false;
          }
        }
        // record the result
        if (found) {
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
