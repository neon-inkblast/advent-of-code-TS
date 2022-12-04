import { readInputFromFile } from "../../../utils/readInputFromFile";

export function part2(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);
  const rounds = lines.map(mapLineToScore);
  return rounds.reduce((acc: number, score: number) => acc + score);

  function mapLineToScore(line: string) {
    // A - Rock
    // B - Paper
    // C - Scissors

    // X - Rock
    // Y - Paper
    // Z - Scissors

    // X - lose
    // Y - draw
    // Z - win

    /// COULD JUST CHANGE THE POINTS!!!
    const [opponent, me] = line.split(" ");
    const choiceMap: Record<string, Record<string, string>> = {
      A: { X: "Z", Y: "X", Z: "Y" },
      B: { X: "X", Y: "Y", Z: "Z" },
      C: { X: "Y", Y: "Z", Z: "X" },
    };
    const myChoice = choiceMap[opponent][me];
    const choicePoints: Record<string, number> = {
      X: 1,
      Y: 2,
      Z: 3,
    };
    const gamePoints: Record<string, Record<string, number>> = {
      A: { X: 3, Y: 6, Z: 0 },
      B: { X: 0, Y: 3, Z: 6 },
      C: { X: 6, Y: 0, Z: 3 },
    };

    const game = gamePoints[opponent][myChoice];
    const choice = choicePoints[myChoice];

    return game + choice;
  }
}
