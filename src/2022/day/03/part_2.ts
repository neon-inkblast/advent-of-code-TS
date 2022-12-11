import { readInputFromFile } from "../../../utils/io";

export function part2(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);
  const duplicates = [];
  for (let i = 0; i < lines.length; i += 3) {
    const line1 = lines[i].split("");
    const line2 = lines[i + 1].split("");
    const line3 = lines[i + 2].split("");
    const common = line1
      .filter((char) => line2.includes(char))
      .filter((char) => line3.includes(char))[0];
    duplicates.push(common);
  }

  const total = duplicates.reduce((acc, letter) => {
    // a-z = 97-122
    // A-Z = 65-90
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
