import { readInputFromFile } from "../../../utils/io";

export function part1(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);
  const signals = lines[0].split("");

  for (let i = 4; i < signals.length; i++) {
    const set = new Set(signals.slice(i - 4, i));
    if (set.size === 4) {
      return i;
    }
  }
}
