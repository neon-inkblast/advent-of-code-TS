import { ints, sum, toNumbers } from "../../utils";
import { readInputFromFile } from "../../utils/io";

export function part2(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);
  const predictions = lines.map((line) => {
    return getNextForSequence(toNumbers(line.trim().split(" ")));
  });
  // return sum of all historical predictions
  return sum(predictions);

  function getNextForSequence(nums: number[]) {
    let allZeros = false;
    let placeholders = [];
    let currentLine = nums.slice();
    while (!allZeros) {
      allZeros = true;
      // store the first value from each row
      placeholders.unshift(currentLine[0]);
      // calculate the derivative of the row
      currentLine = currentLine.slice(1).map((num, idx) => {
        const diff = num - currentLine[idx];
        if (diff !== 0) {
          allZeros = false;
        }
        return diff;
      });
    }
    // reduce down to a single historical value by adding the values from the start of
    // each calculated row of derived values
    const historicalExtrapolation = placeholders.reduce((acc, el) => el - acc, 0);
    // return the historical value for this row
    return historicalExtrapolation;
  }
}
