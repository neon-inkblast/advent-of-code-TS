import { toNumbers, sum } from "../../utils";
import { readInputFromFile } from "../../utils/io";

export function part1(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);
  const predictions = lines.map((line) => {
    return getNextForSequence(toNumbers(line.trim().split(" ")));
  });
  // return the sum of all predicted values
  return sum(predictions);

  function getNextForSequence(nums: number[]) {
    let allZeros = false;
    let placeholders = [];
    let currentLine = nums.slice();
    while (!allZeros) {
      allZeros = true;
      // store the end value from each row
      placeholders.unshift(currentLine[currentLine.length - 1]);
      // calculate next row
      currentLine = currentLine.slice(1).map((num, idx) => {
        const diff = num - currentLine[idx];
        // set all zeros flag false if a non-zero found
        if (diff !== 0) {
          allZeros = false;
        }
        return diff;
      });
    }
    // return the sum of end rows to populate the predicted value
    return sum(placeholders);
  }
}
