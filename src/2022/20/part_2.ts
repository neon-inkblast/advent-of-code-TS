import { sum } from "../../utils/array";
import { readInputFromFile } from "../../utils/io";
import { mod } from "../../utils/math";

export function part2(
  input?: string[],
  multiplier = 811589153,
  numberOfMixes = 10,
) {
  const lines = input ?? readInputFromFile(__dirname);
  let signals = lines.map((n, idx) => ({
    // multiply signals as they're parsed
    signal: +n * multiplier,
    // store the original index alongside
    original: idx,
  }));

  // mix 10 times
  for (let mixes = 1; mixes <= numberOfMixes; mixes++) {
    for (let i = 0; i < signals.length; i++) {
      // find index in the current set of nums
      const sigIndex = signals.findIndex((x) => x.original === i);
      // retrieve the target signal
      const current = signals[sigIndex];
      if (current.signal !== 0) {
        // get the the absolute index distance
        // after move, relative to zero
        const distance = sigIndex + current.signal;
        // can get the new index using the modulo
        // note this is NOT the same as % operator
        // as that is a remainder
        const newIndex = mod(distance, signals.length - 1);
        // delete the old copy of this signal
        signals.splice(sigIndex, 1);
        // insert the new copy at the target index
        signals.splice(newIndex, 0, current);
      }
    }
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
