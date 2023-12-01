import { readInputFromFile } from "../../utils/io";

export function part1(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);
  // a-z = 97-122
  // A-Z = 65-90
  const duplicates = lines.map((line) => {
    const compartmentLength = Math.round(line.length / 2);
    const compartment1 = line.slice(0, compartmentLength);
    const compartment2 = line.slice(compartmentLength);
    const found1: any = {};
    const found2: any = {};
    for (let i = 0; i < compartmentLength; i++) {
      const l1 = compartment1[i];
      const l2 = compartment2[i];
      if (found2[l1]) {
        return l1;
      } else if (found1[l2]) {
        return l2;
      } else if (l1 === l2) {
        return l1;
      }
      found1[l1] = true;
      found2[l2] = true;
    }
    return "";
  });

  const total = duplicates.reduce((acc: number, letter: string) => {
    let code = letter.charCodeAt(0);
    const lowerOffset = 96;
    const upperOffset = 38;
    // lowercase
    if (code >= 97) {
      code -= lowerOffset;
      // uppercase
    } else {
      code -= upperOffset;
    }
    return acc + code;
  }, 0);

  return total;
}
