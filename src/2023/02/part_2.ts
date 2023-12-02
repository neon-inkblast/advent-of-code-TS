import { sum } from "../../utils/array";
import { readInputFromFile } from "../../utils/io";

export function part2(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);

  const cubes = lines.map((line) =>
    line
      .split(":")[1]
      .split(/[;,]/g)
      .map((x) => x.trim().split(" ")),
  );

  const powers = cubes.map((cubeSet, index) => {
    const limits: Record<string, number> = {
      red: 0,
      green: 0,
      blue: 0,
    };
    cubeSet.forEach(([amount, colour]) => {
      if (+amount > limits[colour]) {
        limits[colour] = +amount;
      }
    });
    return limits.red * limits.green * limits.blue;
  });
  return sum(powers);
}
