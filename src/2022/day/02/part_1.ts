import { readInputFromFile } from "../../../utils/io";

export function part1(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);
  const rounds = lines.map(mapLineToScore);
  return rounds.reduce((acc, score) => acc + score);

  function mapLineToScore(line: string) {
    // A - Rock     // X - Rock
    // B - Paper    // Y - Paper
    // C - Scissors // Z - Scissors

    const [opponent, me] = line.split(" ");
    const choicePoints: Record<string, number> = {
      X: 1,
      Y: 2,
      Z: 3
    };

    const gamePoints: Record<string, Record<string, number>> = {
      A: { X: 3, Y: 6, Z: 0 },
      B: { X: 0, Y: 3, Z: 6 },
      C: { X: 6, Y: 0, Z: 3 }
    };

    const game = gamePoints[opponent][me];
    const choice = choicePoints[me];

    return game + choice;
  }
}
