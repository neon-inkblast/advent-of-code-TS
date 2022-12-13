type MaybeString = string[] | string;

// comparator function for a list of items
export function compareList(a: MaybeString[], b: MaybeString[]): number {
  // find the shortest length between the two packets, a and b
  let minLength = Math.min(a.length, b.length);
  let i = 0;

  // while both packet lists have a common number of values
  while (i < minLength) {
    // compare parallel values in each list
    const result = compare(a[i], b[i]);

    // if the result wasn't equal, we have an answer
    // break loop and return result
    if (result !== 0) {
      return result;
    }

    i++;
  }

  // all values in lists a and b were equal
  // so just return the difference in lengths
  // as a comparison
  return b.length - a.length;
}

// comparator function for a pair of values
export function compare(a: MaybeString, b: MaybeString): number {
  // get flags marking if either input is an array
  let lhsArr = Array.isArray(a);
  let rhsArr = Array.isArray(b);

  // set up holding vars for inputs a and b
  // left hand side, and right hand side
  let lhs: MaybeString | MaybeString[] = a;
  let rhs: MaybeString | MaybeString[] = b;

  // if left hand side (a) was an array, and right hand side (b) was not,
  // wrap right hand side (b) in an array
  if (lhsArr && !rhsArr) {
    rhs = [b];
  }
  // if right hand side (b) was an array, and left hand side (a) was not,
  // wrap left hand side (a) in an array
  if (!lhsArr && rhsArr) {
    lhs = [a];
  }

  // if either was an array coming in, now both are, so compare as a list
  // and return the result
  if (lhsArr || rhsArr) {
    return compareList(lhs as MaybeString[], rhs as MaybeString[]);
  }

  // if we got here, we're only dealing with numbers
  // so do a simple subtraction to figure out which is bigger
  return +b - +a;
}
