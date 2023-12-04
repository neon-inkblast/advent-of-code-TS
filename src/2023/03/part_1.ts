import { clamp } from "../../utils";
import { readInputFromFile } from "../../utils/io";

export function part1(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);
  function hasSymbolAdjacent(row: number, col: number, length: number) {
    function clampToRow(col: number) {
      return clamp(col, 0, lastXIndex + 1);
    }
    const coveringSlice = [clampToRow(col - 1), clampToRow(col + length + 1)];
    const sliceIncluding = lines[row].slice(...coveringSlice);
    const sliceAbove = row === 0 ? "" : lines[row - 1].slice(...coveringSlice);
    const sliceBelow =
      row === lastYIndex ? "" : lines[row + 1].slice(...coveringSlice);

    const testString = sliceAbove + sliceIncluding + sliceBelow;
    const matches = testString.match(/[^.\d]/g);

    return (matches?.length ?? 0) > 0;
  }
  let sum = 0;
  const lastYIndex = lines.length - 1;
  const lastXIndex = lines[0].length - 1;
  lines.forEach((line, row) => {
    const matches = line.matchAll(/\d+/g);
    const matchArr = Array.from(matches);

    matchArr.forEach((number) => {
      if (hasSymbolAdjacent(row, number.index!, number[0].length)) {
        sum += +number[0];
      }
    });
  });
  return sum;
}
