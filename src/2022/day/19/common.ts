import { addArrays, createArrayOf } from "../../../utils/array";

export type Vec4<T = number> = [T, T, T, T];
export type Bot = {
  cost: Vec4;
  generates: Vec4;
};
export type Blueprint = {
  maxOre: number;
  maxClay: number;
  bots: Vec4<Bot>;
};
export type GameState = {
  bots: Vec4;
  resources: Vec4;
  time: number;
};
export const ORE: Vec4 = [1, 0, 0, 0];
export const CLAY: Vec4 = [0, 1, 0, 0];
export const OBSIDIAN: Vec4 = [0, 0, 1, 0];
export const GEODE: Vec4 = [0, 0, 0, 1];

export function parseBlueprints(lines: string[]): Blueprint[] {
  return lines.map((line) => {
    const [orBot, cBot, obBot1, obBot2, gBot1, gBot2] = [
      ...line.matchAll(/(\d+)/g),
    ]
      .slice(1)
      .map((n) => +n[1]);
    return {
      bots: [
        {
          cost: [-orBot, 0, 0, 0],
          generates: ORE,
        },
        {
          cost: [-cBot, 0, 0, 0],
          generates: CLAY,
        },
        {
          cost: [-obBot1, -obBot2, 0, 0],
          generates: OBSIDIAN,
        },
        {
          cost: [-gBot1, 0, -gBot2, 0],
          generates: GEODE,
        },
      ],
      maxOre: Math.max(orBot, cBot, obBot1, gBot1),
      maxClay: obBot2,
    };
  });
}

export function playWithRobots(
  blueprint: Blueprint,
  startTime: number,
  skipTime: number,
) {
  // pre-game setup, 1 ore bot
  const startState: GameState = {
    bots: [1, 0, 0, 0],
    resources: [0, 0, 0, 0],
    time: startTime,
  };
  // tracking game states so we don't dupe in the queue
  let queuedStates = createArrayOf(startTime + 1, () => new Set());
  // tracking counter for highest number of geodes cracked so far
  let bestGeodes = 0;
  let queue = [startState];

  while (queue.length > 0) {
    // get oldest node off the list
    const { bots, resources, time } = queue.shift()!;

    // track and break out if this path hasn't found as many
    // geodes as another one already discovered
    if (resources[3] < bestGeodes) {
      continue;
    } else if (resources[3] > bestGeodes) {
      bestGeodes = resources[3];
    }

    // early exit this path as out of time
    if (time <= 0) {
      continue;
    }

    const nextStates: GameState[] = [];
    const newState =
      // buy nothing, just generate resources
      { bots, resources: addArrays(resources, bots) as Vec4, time: time - 1 };
    const key = newState.bots.concat(newState.resources).join(",");
    if (!queuedStates[time].has(key)) {
      queuedStates[time].add(key);
      nextStates.push(newState);
    }

    const affordable = blueprint.bots.map((botBp, i) => {
      // if you don't have any bots that cost more ore than you're generating per turn
      // don't make any more ore bots
      // then... some more agressive branch removal here
      // if time is running low (< 8), just don't build them at all
      if (i === 0 && (bots[0] >= blueprint.maxOre || time < skipTime)) {
        return false;
      }
      // same branch filtering as above, except with clay instead of ore
      if (i === 1 && (bots[1] >= blueprint.maxClay || time < skipTime)) {
        return false;
      }
      // add the cost (a negative vector) to the current resources
      // to determine affordability of this bot
      return addArrays(resources, botBp.cost).every(
        (remaining) => remaining >= 0,
      );
    });
    // if you can build a geode cracker, just build a geode cracker, don't explore other options
    if (affordable[3]) {
      // clear out the 'build nothing' option
      nextStates.pop();
      // create the build geode cracker option
      const newState = {
        bots: addArrays(bots, blueprint.bots[3].generates) as Vec4,
        resources: addArrays(bots, resources, blueprint.bots[3].cost) as Vec4,
        time: time - 1,
      };
      // make sure it's not already in queue, add to queue if new
      const key = newState.bots.concat(newState.resources).join(",");
      if (!queuedStates[time].has(key)) {
        queuedStates[time].add(key);
        nextStates.push(newState);
      }
    }
    // likewise, if you can build an obsidian harvester,
    // and not a geode cracker, just build an obsidian harvester
    else if (affordable[2]) {
      nextStates.pop();
      const newState = {
        bots: addArrays(bots, blueprint.bots[2].generates) as Vec4,
        resources: addArrays(bots, resources, blueprint.bots[2].cost) as Vec4,
        time: time - 1,
      };
      const key = newState.bots.concat(newState.resources).join(",");
      if (!queuedStates[time].has(key)) {
        queuedStates[time].add(key);
        nextStates.push(newState);
      }
    }
    // did try another rule forcing
    // build a clay bot if we didn't have any (get that clay goin!)
    // but it was a bad rule when ore costs were higher

    // so otherwise, explore building ore and clay bots
    else {
      affordable.forEach((botAffordable, i) => {
        if (botAffordable) {
          const newState = {
            bots: addArrays(bots, blueprint.bots[i].generates) as Vec4,
            resources: addArrays(
              bots,
              resources,
              blueprint.bots[i].cost,
            ) as Vec4,
            time: time - 1,
          };
          const key = newState.bots.concat(newState.resources).join(",");
          if (!queuedStates[time].has(key)) {
            queuedStates[time].add(key);
            nextStates.push(newState);
          }
        }
      });
    }

    queue.push(...nextStates);
  }
  //return the highest number of geodes found
  return bestGeodes;
}
