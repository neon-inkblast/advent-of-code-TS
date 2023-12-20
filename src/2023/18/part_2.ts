import { Point, addPoints } from "../../utils";
import { readInputFromFile } from "../../utils/io";

// different approach than part 1, uses shoelace formula and picks theorem
export function part2(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);
  const instrMap = ["R", "D", "L", "U"];
  // parse colour codes into dig instructions
  const instructions = lines.map((line) => {
    const [, , colours] = line.split(" ");
    // get the hex value of the first 5 characters as the length to dig
    const amount = parseInt(colours.slice(2, -2), 16);
    // get the direction from the last character
    const dir = instrMap[+colours.slice(-2, -1)];
    return { dir, amount, colours };
  });

  // start at 0,0
  let current: Point = [0, 0];
  let totalArea = 0;
  let trenchLength = 0;

  // for each instruction
  for (let i = 0; i < instructions.length; i++) {
    const { dir, amount } = instructions[i];

    // calculate the offset from the current point
    const hm = dir === "L" ? -1 : 1;
    const vm = dir === "U" ? -1 : 1;
    const plusX = dir === "L" || dir === "R";
    const plusY = dir === "U" || dir === "D";

    // to make a new point after moving 'amount' steps in the 'dir' direction
    const newPoint = addPoints(current, [plusX ? amount * hm : 0, plusY ? amount * vm : 0]);

    // cross multiply the xy of the points in shoelace fashion
    const add = lace(current, newPoint);
    // and add it to the total
    totalArea += add;
    // also trach the perimeter trench length, as this will need to be added to the area
    trenchLength += amount;
    // set current to the new point and repeat until finished
    current = newPoint;
  }
  // add the perimeter length to the total area from shoelace
  totalArea += trenchLength;

  // helper function for shoelace cross multiplication
  function lace(a: Point, b: Point) {
    return a[0] * b[1] - a[1] * b[0];
  }

  // from Picks theorem
  // return ((Area + Perimeter) / 2) + 1
  return totalArea / 2 + 1;
}
