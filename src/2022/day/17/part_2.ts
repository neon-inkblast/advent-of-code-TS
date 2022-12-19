import { readInputFromFile } from "../../../utils/io";
import { Point } from "../../../utils/point";

type Rock = {
  height: number;
  shape: number[];
};
export function part2(input?: string) {
  const jets = input ?? readInputFromFile(__dirname)[0];

  // number of simulations to run
  const sims = 1000000000000;

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
  let repetitionHeight = 0;

  // starting rock
  const rock: Rock = {
    // height of lowest row
    height: 4,
    // shape of this rock
    shape: shapes[rockCount % shapes.length],
  };

  // fell into first line of simulation
  let falling = true;

  // track tower height and bottom row position
  // of each previously stopped rock
  let prevRocks: Point[] = [];
  // flag to see if we've found a pattern in the positions
  let patternFound = false;

  // rock sim ~2022~ 1000000000000
  while (rockCount < sims) {
    falling = !falling;

    if (falling) {
      dropIt(rock);
    } else {
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

      // while looking for a pattern in the way the rocks fall
      if (!patternFound) {
        // track each stopped rocks bottom row position
        // and the height of the tower at this time
        prevRocks.push([towerHeight, rock.shape[0]]);
      }

      // if haven't yet found a repetitive pattern in the rock fall positions
      if (!patternFound && rockCount > 0 && rockCount % shapes.length === 0) {
        // index of the last dropped rock in the recorded data
        const lastDropped = prevRocks.length - 1;
        // number of consecutive position matches
        let match = 0;
        // number of rocks in the pattern that matched
        // will be a multiple of shapes.length
        let rocksMatched = 0;
        // tower height gained per repetition of pattern
        let heightMatched = 0;

        // go 2 x shape.length back
        const patternSize = 2 * shapes.length;
        for (
          let i = prevRocks.length - patternSize - 1;
          i > patternSize;
          i -= patternSize
        ) {
          // if the rock i shape.lengths ago was the same
          // check the previous rock pairs to see if they all match
          if (prevRocks[lastDropped][1] === prevRocks[i][1]) {
            match = 1;
            for (let j = 1; j < patternSize; j++) {
              if (prevRocks[lastDropped - j][1] === prevRocks[i - j][1]) {
                // another match, keep going back and comparing
                match++;
              } else {
                // no match, stop looking
                break;
              }
            }

            // found enough matches to consider a repetitive pattern found
            if (match >= patternSize) {
              // use this to calculate the number of rocks simulated per repetition
              rocksMatched = lastDropped - i;
              // and how much higher the tower gets each repeat
              heightMatched = prevRocks[lastDropped][0] - prevRocks[i][0];
              // how many repetitions would fit in the remaining space?
              let fit = Math.floor((sims - rockCount) / rocksMatched);
              // increase the rockCount by that many
              rockCount = rockCount + fit * rocksMatched;
              // track the amount of height gained, will be added at the end
              repetitionHeight = fit * heightMatched;
              // set pattern found flag, can stop looking
              patternFound = true;
              break;
            }
          }
        }
      }

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
    // format the binary to a gameboard row
    const board = copy.map((r) => leftPad(r.toString(2)));
    board.reverse();
    console.log(board.join("\n"));
  }

  // printBoard();
  return towerHeight + repetitionHeight;
}
