import { multi } from "../../../utils/array";
import { readInputFromFile } from "../../../utils/io";
import { Blueprint, parseBlueprints, playWithRobots } from "./common";

export function part2(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);
  const TIME_START = 32;
  const blueprints: Blueprint[] = parseBlueprints(lines.slice(0, 3));

  const geodesCracked = blueprints.map((bp, i) => {
    const geodes = playWithRobots(bp, TIME_START, 12);
    // console.debug("║ Blueprint", i + 1, ":", geodes);
    return geodes;
  });

  return multi(geodesCracked);
}
