import { readInputFromFile } from "../../../utils/readInputFromFile";

export function part2(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);
  return lines[0];
}
