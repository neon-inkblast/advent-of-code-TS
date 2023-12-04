import { clamp } from "../../utils";
import { readInputFromFile } from "../../utils/io";

export function part2(input?: string[]) {
  let lines = input ?? readInputFromFile(__dirname);

  // locate a whole part number from the fragement detected in a bounding box
  function getFullNumber(row: number, offset: number, string: string) {
    // store the found numbers, in case there are two
    // eg. 2 in top row, 12 and 234
    // . 1 2 . 2 3 4 .
    // . . . $ . . . .
    // . . . . . . . .
    //

    // collect all part number fragments in the bounding box
    const partNums = Array.from(string.matchAll(/\d+/g)).map((match) => {
      // set up left and right pointers, cursors and edge found flags
      // to move outward from the edges of the detected fragment
      // and find the full part number
      let leftIndex = match.index! + offset;
      let rightIndex = match.index! + match[0].length + offset - 1;
      let leftCur = lines[row].charAt(leftIndex);
      let rightCur = lines[row].charAt(rightIndex);
      let leftFinished = false;
      let rightFinished = false;

      // set the initial string to the matched part number fragment
      let num = match[0];

      // loop until both edges of the part number are found
      // pushing found characters into the number string
      while (!(leftFinished && rightFinished)) {
        if (!leftFinished) {
          leftIndex--;
          leftCur = lines[row].charAt(leftIndex);
          leftFinished = !Number.isInteger(+leftCur);
          if (!leftFinished) {
            num = leftCur + num;
          }
          if (leftIndex === 0) {
            leftFinished = true;
          }
        }
        if (!rightFinished) {
          rightIndex++;
          rightCur = lines[row].charAt(rightIndex);
          rightFinished = !Number.isInteger(+rightCur);
          if (!rightFinished) {
            num = num + rightCur;
          }
          if (rightIndex === lastXIndex) {
            rightFinished = true;
          }
        }
      }
      // add the full part number to the array of detected numbers
      return +num;
    });
    return partNums;
  }
  function getGearNumber(row: number, col: number, length: number) {
    function clampToRow(col: number) {
      return clamp(col, 0, lastXIndex + 1);
    }
    // what column to start the border box in
    const sliceLeft = clampToRow(col - 1);
    // what column to end the border box in
    const sliceRight = clampToRow(col + length + 1);

    // the slice indexes for the border box
    const coveringSlice = [sliceLeft, sliceRight];
    // the 3 slices that form the lookup rectangle, 1 from each row above, below, and current
    const sliceAbove = row === 0 ? "" : lines[row - 1].slice(...coveringSlice);
    const sliceIncluding = lines[row].slice(...coveringSlice);
    const sliceBelow =
      row === lastYIndex ? "" : lines[row + 1].slice(...coveringSlice);

    // combining them into a single string for matching numbers, '.' dividers to break up the rows
    const testString = sliceAbove + "." + sliceIncluding + "." + sliceBelow;
    // get all numbers in the bounding box
    const matches = testString.match(/\d+/g);
    // if we have exactly 2 numbers adjacent (within the bounding box)
    if (matches?.length === 2) {
      // locate the full "part number" from the number fragments detected in the bounding box
      const above =
        row === 0 ? [] : getFullNumber(row - 1, sliceLeft, sliceAbove);
      const including = getFullNumber(row, sliceLeft, sliceIncluding);
      const below =
        row === lastYIndex ? [] : getFullNumber(row + 1, sliceLeft, sliceBelow);

      // join up the arrays of matches, which should result in 2 whole part numbers
      const nums = [...above, ...below, ...including];

      // multiply them to add to the total
      return nums[0] * nums[1];
    }

    return 0;
  }
  let sum = 0;
  const lastYIndex = lines.length - 1;
  const lastXIndex = lines[0].length - 1;
  lines.forEach((line, row) => {
    const matches = line.matchAll(/[^.\d]/g);
    const matchArr = Array.from(matches);

    matchArr.forEach((number) => {
      const gearNum = getGearNumber(row, number.index!, number[0].length);
      sum += gearNum;
    });
  });
  return sum;
}
