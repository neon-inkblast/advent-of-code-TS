import { readInputFromFile } from "../../utils/io";

export function part2(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);
  const [time, record] = lines.map(
    (line) => +(line.match(/\d+/g) ?? []).join(""),
  );
  const half = Math.floor(time / 2);
  let winners = 0;
  let left = true;
  let right = true;
  for (let i = half, j = half + 1; i >= 0 && j <= time; i--, j++) {
    if (left) {
      const score = i * (time - i);
      if (score > record) {
        winners++;
      } else {
        left = false;
      }
    }
    if (right) {
      const score = j * (time - j);
      if (score > record) {
        winners++;
      } else {
        right = false;
      }
    }
  }
  return winners;
}
