import { sum } from "../../utils";
import { readInputFromFile } from "../../utils/io";

export function part2(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);
  const amounts = new Array(lines.length).fill(1)
  const mapped = lines.map(line => line.split("|")
  .map((nums,idx) => {
    let matches = nums.match(/\d+/g) as string[] ?? []
    if (idx === 0) {
      matches = matches?.slice(1);
    }
    return matches;
  }))

  mapped.forEach(([winners, card], idx) => {
    let cardScore = 0;
    card.forEach(cardNum => {
      if (winners.find(x => x===cardNum))
      {
        cardScore++
      }
    })

    for(let windex = idx + 1; cardScore > 0 && windex < amounts.length; windex++,cardScore--) {
        amounts[windex] += amounts[idx];
    }
 })
  return sum(amounts);
}
