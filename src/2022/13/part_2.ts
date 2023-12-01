import { readInputFromFile } from "../../utils/io";
import { compareList } from "./common";

export function part2(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);

  // filter out empty lines
  let packets = lines.filter((line) => line !== "");

  // add the marker packets
  packets.push("[[2]]");
  packets.push("[[6]]");

  // sort the list in asending order
  packets.sort((ain, bin) => {
    const a = JSON.parse(ain!);
    const b = JSON.parse(bin!);
    // reverse the comparison order (b,a) to sort ascending (correct order)
    return compareList(b, a);
  });

  // find the indexes of the marker packets in the sorted list of packets
  // +1 to account for elf indexing
  const index1 = packets.indexOf("[[2]]") + 1;
  const index2 = packets.indexOf("[[6]]") + 1;

  // return the product of both marker packet indices
  return index1 * index2;
}
