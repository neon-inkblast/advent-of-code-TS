import { day_01 } from "./01/day_01";
import { day_02 } from "./02/day_02";
import { day_03 } from "./03/day_03";
import { day_04 } from "./04/day_04";
import { day_05 } from "./05/day_05";
import { day_06 } from "./06/day_06";
import { day_07 } from "./07/day_07";
import { day_08 } from "./08/day_08";
import { day_09 } from "./09/day_09";
import { day_10 } from "./10/day_10";
import { day_11 } from "./11/day_11";
import { day_12 } from "./12/day_12";
import { day_13 } from "./13/day_13";
import { day_14 } from "./14/day_14";
import { day_15 } from "./15/day_15";
import { day_16 } from "./16/day_16";
import { day_17 } from "./17/day_17";
import { day_18 } from "./18/day_18";
import { day_19 } from "./19/day_19";
import { day_20 } from "./20/day_20";
import { day_21 } from "./21/day_21";
import { day_22 } from "./22/day_22";
import { day_23 } from "./23/day_23";
import { day_24 } from "./24/day_24";
import { day_25 } from "./25/day_25";

export function run2022() {
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
    day_21,
    day_22,
    day_23,
    day_24,
    day_25,
  ];

  console.log("");
  run.slice(0, -1).forEach((day) => {
    day();
    console.log(
      `╠═══════════════════════════════════════════════════════════╣`,
    );
  });

  run[run.length - 1]();
  console.log("╚═══════════════════════════════════════════════════════════╝");
  printXmas();
}

function printXmas() {
  console.log("");
  console.log("🎄🎅🎄🎅🎄🎅🎄🎅🎄🎅🎄🎅🎄🎅🎄🎅🎄🎅🎄🎅🎄🎅🎄🎅🎄🎅🎄🎅🎄🎅🎄");
  console.log("");
}
