import chalk from "chalk";

export const print = console.log;
export const hsvX = (hue: number, message: string, multi = 10) => {
  return chalk.hsv(hue * multi, 100, 100)(message);
};

export type PrettyStrings = Record<PRETTY_TYPE, string>;
export type BORDER_TYPE =
  | "BORDER_TOP"
  | "BORDER_BTM"
  | "BORDER_MID"
  | "BORDER_DIV"
  | "BORDER_SIDES";
export type PRETTY_TYPE = "XMAS" | "EMPTY" | "HEADER" | BORDER_TYPE;

export const EMPTY = "";
export const BORDER_TOP = "╔═══════════════════════════════════════════════════════════╗";
export const BORDER_MID = "╠═══════════════════════════════════════════════════════════╣";
export const BORDER_SIDES = "║                                                           ║";
export const BORDER_BTM = "╚═══════════════════════════════════════════════════════════╝";
export const BORDER_DIV = "═════════════════════════════════════════════════════════════";
export const XMAS = "🎄🎅🎄🎅🎄🎅🎄🎅🎄🎅🎄🎅🎄🎅🎄🎅🎄🎅🎄🎅🎄🎅🎄🎅🎄🎅🎄🎅🎄🎅🎄";
const title = `${chalk.greenBright("Advent")} of ${chalk.redBright("Code")}`;
const osBar = chalk.cyanBright("Elf OS");
const HEADER = `
╔═[ ${osBar} ]════════════════════════════════════════════════╗
║                 🎄 ${title} 🎄                 ║
╚═══════════════════════════════════════════════════════════╝`;

export const PRETTY: PrettyStrings = {
  XMAS,
  HEADER,
  EMPTY,
  BORDER_TOP,
  BORDER_BTM,
  BORDER_DIV,
  BORDER_MID,
  BORDER_SIDES,
};

export function printYearHeader(year: string) {
  const title = `${chalk.greenBright("Advent")} of ${chalk.redBright("Code")} ${year}`;
  const osBar = chalk.cyanBright("Elf OS");
  const header = `
╔═[ ${osBar} ]════════════════════════════════════════════════╗
║                 🎄 ${title} 🎄                 ║
╚═══════════════════════════════════════════════════════════╝`;
  console.log(header);
}
