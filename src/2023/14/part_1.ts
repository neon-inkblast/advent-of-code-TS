import { readInputFromFile } from "../../utils/io";

export function part1(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);
  const grid = lines.map((line) => line.split(""));
  let sum = 0;
  function rollNorth(grid: string[][]) {
    grid.forEach((row, ri) => {
      if (ri === 0) {
        row.forEach((v) => (sum += v === "O" ? grid.length : 0));
        return;
      }
      row.forEach((val, ci) => {
        if (val === "O") {
          sum += grid.length - ri;
          let above = ri - 1;
          let move = grid[above][ci] === ".";
          while (above >= 0 && move === true) {
            if (grid[above][ci] === ".") {
              grid[above][ci] = "O";
              grid[above + 1][ci] = ".";
              sum++;
            } else {
              move = false;
            }
            above--;
          }
        }
      });
    });
  }

  rollNorth(grid);

  return sum;
}
