import { readInputFromFile } from "../../../utils/io";

export function part1(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);
  const grid = lines.map((line) => line.split("").map((x) => +x));

  const horzLength = grid[0].length;
  const vertLength = grid.length;

  let count = 0;

  for (let y = 0; y < horzLength; y++) {
    for (let x = 0; x < vertLength; x++) {
      let blocked = [false, false, false, false];
      for (let up = x + 1; up < vertLength; up++) {
        const curr = grid[y][x];
        const cmp = grid[y][up];
        if (cmp >= curr) {
          blocked[0] = true;
          break;
        }
      }
      for (let down = x - 1; down >= 0; down--) {
        const curr = grid[y][x];
        const cmp = grid[y][down];
        if (cmp >= curr) {
          blocked[1] = true;
          break;
        }
      }
      for (let left = y - 1; left >= 0; left--) {
        const curr = grid[y][x];
        const cmp = grid[left][x];
        if (cmp >= curr) {
          blocked[2] = true;
          break;
        }
      }
      for (let right = y + 1; right < horzLength; right++) {
        const curr = grid[y][x];
        const cmp = grid[right][x];
        if (cmp >= curr) {
          blocked[3] = true;
          break;
        }
      }

      if (blocked.every((x) => x === true)) {
        count++;
      }
    }
  }

  return horzLength * vertLength - count;
}
