import { readInputFromFile } from "../../../utils/io";

export function part1(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);
  const snafuRadix = 5;

  function decimalToSnafu(dec: number) {
    let rem = dec;
    let snafu: number[] = [];

    while (rem > 0) {
      // +2 and -2 to adjust for the range of the snafu digits
      const diff = ((rem + 2) % 5) - 2;
      // add to the string
      snafu.unshift(diff);
      rem = (rem - diff) / 5;
    }

    // map the -1 and -2 to - and =
    return snafu
      .map((num) => {
        switch (num) {
          case -2: {
            return "=";
          }
          case -1: {
            return "-";
          }
          default: {
            return num.toString();
          }
        }
      })
      .join("");
  }

  function snafuToDecimal(snafu: string) {
    const mappu = snafu
      .split("")
      .map((char) => {
        // map the = and - to -2 and -1
        switch (char) {
          case "=": {
            return -2;
          }
          case "-": {
            return -1;
          }
          default: {
            return +char;
          }
        }
      })
      // reverse the order for multiplying lsd first
      .reverse();
    return (
      mappu
        .map((num, idx) => Math.pow(snafuRadix, idx) * num)
        // sum up multiplied digits
        .reduce((a, b) => a + b)
    );
  }

  // map lines to decimal, sum up and convert back to snafu
  return decimalToSnafu(
    lines.map((line) => snafuToDecimal(line)).reduce((a, b) => a + b),
  );
}
