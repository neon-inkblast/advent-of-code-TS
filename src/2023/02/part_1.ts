import { readInputFromFile } from "../../utils/io";

export function part1(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);

  let sum = 0;
  const cubes = lines.map((line) =>
    line
      .split(":")[1]
      .split(/[;,]/g)
      .map((x) => x.trim().split(" ")),
  );

  const limits: Record<string, number> = {
    red: 12,
    green: 13,
    blue: 14,
  };

  cubes.forEach((cubeSet, index) => {
    if (
      cubeSet.every(([amount, colour]) => {
        return +amount <= limits[colour];
      })
    ) {
      sum += index + 1;
    }
  });
  return sum;
}
