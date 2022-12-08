import { readInputFromFile } from "../../../utils/readInputFromFile";

export function part2(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);
  let grid = lines.map((line) => line.split("").map((x) => +x));

  const horzLength = grid[0].length;
  const vertLength = grid.length;

  let outGrid: number[][] = [];
  for (let i = 0; i < vertLength; i++) {
    outGrid.push([]);
    for (let j = 0; j < horzLength; j++) {
      outGrid[i].push(0);
    }
  }

  for (let x = 0; x < horzLength; x++) {
    for (let y = 0; y < vertLength; y++) {
      let counts = [0, 0, 0, 0];
      for (let down = y + 1; down < vertLength; down++) {
        const curr = grid[y][x];
        const cmp = grid[down][x];
        counts[0]++;
        if (cmp >= curr) {
          break;
        }
      }

      for (let up = y - 1; up >= 0; up--) {
        const curr = grid[y][x];
        const cmp = grid[up][x];
        counts[1]++;
        if (cmp >= curr) {
          break;
        }
      }

      for (let left = x - 1; left >= 0; left--) {
        const curr = grid[y][x];
        const cmp = grid[y][left];
        counts[2]++;
        if (cmp >= curr) {
          break;
        }
      }

      for (let right = x + 1; right < horzLength; right++) {
        const curr = grid[y][x];
        const cmp = grid[y][right];
        counts[3]++;
        if (cmp >= curr) {
          break;
        }
      }
      outGrid[y][x] = counts.reduce((a, b) => a * b);
    }
  }

  return outGrid.reduce((acc, row) => {
    return Math.max(...[...row, acc]);
  }, 0);
}
