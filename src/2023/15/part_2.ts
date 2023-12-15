import { createArrayOf, sum } from "../../utils";
import { readInputFromFile } from "../../utils/io";

type LabelledLens = {
  focal: number;
  label: string;
};
export function part2(input?: string[]) {
  // create 256 boxes to hold the labelled lenses
  let boxes: LabelledLens[][] = createArrayOf(256, () => []);
  const lines = input ?? readInputFromFile(__dirname);
  // hash function
  const holidayAsciiStringHelper = (str: string): number => {
    let current = 0;
    for (let s of str) {
      current += s.charCodeAt(0);
      current *= 17;
      current = current % 256;
    }
    return current;
  };
  // split the input on ',' and for each input
  // perform the necessary hashmap to put a labelled lens in a box
  lines[0].split(",").forEach((str) => {
    const [label, lens] = str.split(/\=|\-/g);
    const box = holidayAsciiStringHelper(label);
    // if there's a lens defined then the input was an `=` line
    if (lens && lens !== "") {
      // see if there's any lens with this label in the box already
      const exist = boxes[box].find((x: any) => x.label === label);
      // if there was a lens in the box, change it's focal length
      if (exist != null) {
        exist.focal = +lens;
      } else {
        // add a new lens to the box
        boxes[box].push({ label, focal: +lens });
      }
    }
    // need to remove a lens
    else {
      // find the lens in the box
      const exist = boxes[box].findIndex((x: any) => x.label === label);
      // if the lens exists
      if (exist !== -1) {
        // remove it
        boxes[box].splice(exist, 1);
      }
    }
  });

  // sum up the mulitplied value of each box
  return sum(
    boxes.map((box, idx) => {
      const boxId = idx + 1;
      const lensVals = box.map((b, slot) => b.focal * boxId * (slot + 1));
      return sum(lensVals);
    }),
  );
}
