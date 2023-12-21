import { PRETTY, print, printYearHeader } from "../utils";
import { day_01 } from "./01";
import { day_02 } from "./02";
import { day_03 } from "./03";
import { day_04 } from "./04";
import { day_05 } from "./05";
import { day_06 } from "./06";
import { day_07 } from "./07";
import { day_08 } from "./08";
import { day_09 } from "./09";
import { day_10 } from "./10";
import { day_11 } from "./11";
import { day_12 } from "./12";
import { day_13 } from "./13";
import { day_14 } from "./14";
import { day_15 } from "./15";
import { day_16 } from "./16";
import { day_17 } from "./17";
import { day_18 } from "./18";
import { day_19 } from "./19";
import { day_20 } from "./20";
import { day_21 } from "./21";
import { day_22 } from "./22";
import { day_23 } from "./23";
import { day_24 } from "./24";
import { day_25 } from "./25";

export function run2023() {
  const run = [
    day_01,
    day_02,
    day_03,
    day_04,
    day_05,
    day_06,
    day_07,
    day_08,
    day_09,
    day_10,
    day_11,
    day_12,
    day_13,
    day_14,
    day_15,
    day_16,
    day_17,
    day_18,
    day_19,
    day_20,
    // day_21,
    // day_22,
    // day_23,
    // day_24,
    // day_25,
  ];

  printYearHeader("2023");
  print(PRETTY.EMPTY);
  print(PRETTY.XMAS);
  print(PRETTY.EMPTY);

  const start = performance.now();
  run.forEach((day, index) => {
    if (index === 0) {
      print(PRETTY.BORDER_TOP);
      print(PRETTY.EMPTY);
    }

    day();

    if (index !== run.length - 1) {
      print(PRETTY.EMPTY);
      print(PRETTY.BORDER_MID);
      print(PRETTY.EMPTY);
    } else {
      print(PRETTY.EMPTY);
      print(PRETTY.BORDER_BTM);
    }
  });
  const end = performance.now();

  print(PRETTY.EMPTY);
  print(PRETTY.XMAS);
  print(PRETTY.EMPTY);
  print(`2023 runtime: ${end - start}ms`);
}
