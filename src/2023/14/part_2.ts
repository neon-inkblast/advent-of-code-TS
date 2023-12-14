import { readInputFromFile } from "../../utils/io";

export function part2(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);
  const grid = lines.map((line) => line.split(""));

  // roll
  function rollNorth(grid: string[][]) {
    grid.forEach((row, ri) => {
      if (ri === 0) {
        return;
      }
      row.forEach((val, ci) => {
        if (val === "O") {
          let above = ri - 1;
          let move = grid[above][ci] === ".";
          while (above >= 0 && move === true) {
            if (grid[above][ci] === ".") {
              grid[above][ci] = "O";
              grid[above + 1][ci] = ".";
            } else {
              move = false;
            }
            above--;
          }
        }
      });
    });
  }
  function rollSouth(grid: string[][]) {
    for (let row = grid.length - 2; row >= 0; row--) {
      for (let col = 0; col < grid[0].length; col++) {
        const val = grid[row][col];
        if (val === "O") {
          let below = row + 1;
          let move = grid[below]?.[col] === ".";
          while (below < grid.length && move === true) {
            if (grid[below][col] === ".") {
              grid[below][col] = "O";
              grid[below - 1][col] = ".";
            } else {
              move = false;
            }
            below++;
          }
        }
      }
    }
  }

  function rollEast(grid: string[][]) {
    for (let col = grid[0].length - 2; col >= 0; col--) {
      for (let row = 0; row < grid.length; row++) {
        const val = grid[row][col];
        if (val === "O") {
          let east = col + 1;
          let move = grid[row][east] === ".";
          while (east < grid[0].length && move === true) {
            if (grid[row][east] === ".") {
              grid[row][east] = "O";
              grid[row][east - 1] = ".";
            } else {
              move = false;
            }
            east++;
          }
        }
      }
    }
  }
  function rollWest(grid: string[][]) {
    for (let col = 0; col < grid[0].length; col++) {
      for (let row = 0; row < grid.length; row++) {
        const val = grid[row][col];
        if (val === "O") {
          let east = col - 1;
          let move = grid[row][east] === ".";
          while (east >= 0 && move === true) {
            if (grid[row][east] === ".") {
              grid[row][east] = "O";
              grid[row][east + 1] = ".";
            } else {
              move = false;
            }
            east--;
          }
        }
      }
    }
  }

  const cycleTarget = 1000000000;

  const history: string[] = [];
  let startIdx = 0;
  let currIdx = 0;
  let endIdx = 0;
  let i = 0;
  let loop = 0;
  while (!loop) {
    cycle(grid);
    const out = grid.map((row) => row.join("")).join("");
    if (!startIdx) {
      for (let i = 0; i < history.length; i++) {
        if (history[i] === out) {
          startIdx = i;
          currIdx = i;
          endIdx = history.length;
        }
      }
    } else if (out === history[startIdx]) {
      loop = endIdx - startIdx;
    } else if (out !== history[++currIdx]) {
      startIdx = 0;
      currIdx = 0;
    }
    history.push(out);
    i++;
  }

  const targetLoopIndex = (cycleTarget - startIdx) % loop;
  // adjust i for the non-looping start of the chain
  i -= startIdx;

  // recycle the grid to match the state at the end
  while (i % loop !== targetLoopIndex) {
    i++;
    cycle(grid);
  }

  // run a full cycle
  function cycle(grid: string[][]) {
    rollNorth(grid);
    rollWest(grid);
    rollSouth(grid);
    rollEast(grid);
  }

  // sum up rocks
  let sum = 0;
  grid.forEach((row, ri) => {
    row.forEach((v) => (sum += v === "O" ? grid.length - ri : 0));
  });
  return sum;
}
