import { readInputFromFile } from "../../../utils/io";

export function part2(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);

  // used a " " instead of a "."
  // and a "█" instead of a "#"
  // here for readability
  const emptyChar = " ";
  const fillChar = "█";

  let spritePos = [0, 1, 2];
  let cursorPos = [0, 0];

  let display: string[][] = new Array(6)
    .fill(0)
    .map((_) => new Array(40).fill(0).map((x) => emptyChar));

  // can flatten the instructions here to a single array, as each "word" of instruction
  // takes up a whole cycle and since there's only one instruction with a number arg
  // can just assume it's an addX
  const flattened = lines.flatMap((line) => line.split(" "));

  flattened.forEach((line) => {
    // draw pixel
    if (spritePos.includes(cursorPos[1])) {
      display[cursorPos[0]][cursorPos[1]] = fillChar;
    }
    // increment the drawing cursor
    cursorPos[1] = cursorPos[1] + 1;

    // if end of row, reset the cursor to the next row
    if (cursorPos[1] >= 40) {
      cursorPos[0] = cursorPos[0] + 1;
      cursorPos[1] = 0;
    }

    // if we're at an addX to register, move the sprite
    if (!isNaN(+line)) {
      spritePos = spritePos.map((x) => x + +line);
    }
  });

  return (
    "\n║ \n" + display.map((row) => "║  " + row.join("")).join("\n") + "\n║"
  );
}
