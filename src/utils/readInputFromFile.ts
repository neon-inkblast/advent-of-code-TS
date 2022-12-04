import fs from "fs";
import path from "path";

export function readFromFile(
  filename: string,
  dir: string = __dirname,
  log: boolean = false
): string[] {
  const data = fs.readFileSync(path.join(dir, filename), "utf8");
  const lines = data.split(/\n/);
  if (log) {
    console.log(lines);
  }
  return lines;
}

export function readInputFromFile(dir: string, log: boolean = false): string[] {
  return readFromFile("_input.txt", dir, log);
}
