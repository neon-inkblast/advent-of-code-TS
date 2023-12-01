import { readInputFromFile } from "../../utils/io";

export function part2(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);
  const signals = lines[0].split("");

  for (let i = 14; i < signals.length; i++) {
    const set = new Set(signals.slice(i - 14, i));
    if (set.size === 14) {
      return i;
    }
  }
}
