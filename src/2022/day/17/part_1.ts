import { readInputFromFile } from "../../../utils/io";

type Rock = {
  height: number;
  shape: number[];
};
export function part1(input?: string) {
  const jets = input ?? readInputFromFile(__dirname)[0];

  // number of simulations to run
  const sims = 2022;

  // prettier-ignore
  // stored "upside down" so that 0-index is the bottom row
  const shapes = [
    //  -
    [ 
      0b0011110   // ⬜⬜⬜⬜
    ],
    // +
    [
      0b0001000,  //   ⬜
      0b0011100,  // ⬜⬜⬜
      0b0001000,  //   ⬜
    ],
    // J
    [
      0b0011100,  // ⬜⬜⬜
      0b0000100,  //     ⬜
      0b0000100,  //     ⬜
    ],

    [
      0b0010000,  // ⬜
      0b0010000,  // ⬜
      0b0010000,  // ⬜
      0b0010000,  // ⬜
    ],

    [
      0b0011000,  // ⬜⬜
      0b0011000,  // ⬜⬜
    ],
  ];

  // starting state of the simulation area
  // |.......|
  // |.......|
  // |.......|
  // |.......|
  // |#######|
  const tetrisBoard = [0b1111111, 0b0000000, 0b0000000, 0b0000000, 0b0000000];

  // number of rocks simulated
  let rockCount = 0;
  // height of tallest rock
  let towerHeight = 0;
  // current point in jet pattern
  let jetPointer = 0;

  // starting rock
  const rock: Rock = {
    // height of lowest row
    height: 4,
    // shape of this rock
    shape: shapes[rockCount % shapes.length],
  };

  // fell into first line of simulation
  let falling = true;

  // run rock sim 2022!
  while (rockCount < sims) {
    // invert falling flag so that sim switches between
    // jet movement and gravity movement each iteration
    falling = !falling;

    // if falling, do gravity logic
    if (falling) {
      dropIt(rock);
    }
    // else do jet propulsion logic
    else {
      jetPropulsion(rock);
    }
  }

  function dropIt(rock: Rock) {
    if (
      // none of the rows of rock will collide with wall or rock below the current height
      rock.shape.every((row, i) => !(row & tetrisBoard[rock.height - 1 + i]))
    ) {
      // then move down one space
      rock.height--;
    } else {
      // we have added a new rock
      rockCount++;
      // increase tower height if required
      towerHeight = Math.max(towerHeight, rock.height - 1 + rock.shape.length);
      // draw the rock that just landed into the game board, row by row
      rock.shape.forEach((row, i) => {
        const boardIndex = rock.height + i;
        tetrisBoard[boardIndex] |= row;
      });
      // if the tower height is near the top of the board, extend the board
      while (tetrisBoard.length - towerHeight < 5) {
        tetrisBoard.push(0);
      }
      // set a new rock
      // at 4 higher than current max height
      // and using the next shape in set
      rock.height = towerHeight + 4;
      rock.shape = shapes[rockCount % shapes.length];
    }
  }

  function jetPropulsion(rock: Rock) {
    // get current jet movement instruction
    const jet = jets.charAt(jetPointer % jets.length);
    jetPointer += 1;

    if (
      // jet is blasting rock to the right
      jet === ">" &&
      // every row of rock won't collide with wall or another rock to the right
      rock.shape.every(
        (row, i) =>
          (row & 0b0000001) === 0 &&
          !((row >> 1) & tetrisBoard[rock.height + i]),
      )
    ) {
      // shift this rock 1 space to the right
      rock.shape = rock.shape.map((row) => row >> 1);
    } else if (
      // jet is blasting rock to the left
      jet === "<" &&
      // every row of rock won't collide with wall or another rock to the left
      rock.shape.every(
        (row, i) =>
          (row & 0b1000000) === 0 &&
          !((row << 1) & tetrisBoard[rock.height + i]),
      )
    ) {
      // shift this rock 1 space to the left
      rock.shape = rock.shape.map((row) => row << 1);
    }
  }

  // function to print the board state
  function printBoard() {
    function leftPad(str = "") {
      const pad = "|0000000";
      return (pad.slice(0, 8 - str.length) + str + "|").replaceAll("0", " ");
    }

    const copy = tetrisBoard.slice();

    rock.shape.forEach((row, i) => {
      copy[rock.height + i] = row | copy[rock.height + i];
    });
    // pad out the
    const board = copy.map((r) => leftPad(r.toString(2)));
    board.reverse();
    console.log(board.join("\n"));
  }

  // printBoard();
  return towerHeight;
}
