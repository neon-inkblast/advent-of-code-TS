import { readInputFromFile } from "../../utils/io";

export function part1(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);

  return lines
    .map((line) => {
      const pairs = line.split(",");
      const pair1 = {
        from: +pairs[0].split("-")[0],
        to: +pairs[0].split("-")[1],
      };
      const pair2 = {
        from: +pairs[1].split("-")[0],
        to: +pairs[1].split("-")[1],
      };
      return (
        //     [--------pair 1------]
        //         [----pair 2--]
        (pair1.from <= pair2.from && pair1.to >= pair2.to) ||
        //        [----pair 1----]
        //     [--------pair 2--------]
        (pair2.from <= pair1.from && pair2.to >= pair1.to)
      );
    })
    .filter((x) => !!x).length;
}
