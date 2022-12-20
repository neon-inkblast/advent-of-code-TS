import { sum } from "../../../utils/array";
import { readInputFromFile } from "../../../utils/io";
import { Blueprint, parseBlueprints, playWithRobots } from "./common";

export function part1(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);
  const TIME_START = 24;
  const blueprints: Blueprint[] = parseBlueprints(lines);

  const bpQuality = blueprints.map((bp, i) => {
    const id = i + 1;
    const geodes = playWithRobots(bp, TIME_START, 5);
    // console.debug("║ Blueprint", id, ":", geodes);
    return id * geodes;
  });

  return sum(bpQuality);
}
