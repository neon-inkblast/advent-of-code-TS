import { sum } from "../../../utils/array";
import { readInputFromFile } from "../../../utils/io";
import { mod } from "../../../utils/math";

export function part1(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);
  // parse input signals into a list,
  // enhanced with flags to track whether or not
  // this element has already been mixed
  const signals = lines.map((n) => ({ signal: +n, mixed: false }));

  for (let i = 0; i < signals.length; ) {
    const current = signals[i];
    // if already mixed this signal, or it's 0
    // can skip this one
    if (current.mixed || current.signal === 0) {
      i++;
      continue;
    }
    current.mixed = true;
    // get the the absolute index distance
    // after move, relative to zero
    const distance = i + current.signal;
    // can get the new index using the modulo
    // note this is NOT the same as % operator
    // as that is a remainder
    const newIndex = mod(distance, signals.length - 1);
    // delete the old copy of this signal
    signals.splice(i, 1);
    // insert the new copy at the target index
    signals.splice(newIndex, 0, current);
  }

  // find the index of the 0 signal element
  const i0 = signals.findIndex((n) => n.signal === 0);

  // find the grove keys
  const groveKeys = [1000, 2000, 3000].map(
    (n) => signals[(n + i0) % signals.length].signal,
  );

  // sum the grove keys to find the elves grove
  return sum(groveKeys);
}
