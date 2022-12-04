import { readInputFromFile } from "../../../utils/readInputFromFile";

export function part1(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);
  return lines[0];
}
