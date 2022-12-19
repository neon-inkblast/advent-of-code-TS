import { readInputFromFile } from "../../../utils/io";

type Node = {
  label: string;
  rate: number;
  connections: string[];
};
type SearchNode = {
  label: string;
  connections: string[];
  visited: boolean;
  weight: number;
};
export function part1(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);

  const pathWeights: Record<string, Record<string, number>> = {};
  const nodes: Record<string, Node> = {};
  // collection of valves that have flow rates > 0, plus starting node "AA"
  let usefulValves: string[] = ["AA"];

  lines.forEach((line) => {
    const [label, ...connections] = [...line.matchAll(/([A-Z]{2})/g)].map(
      (x) => x[1],
    );
    const rate = +[...line.matchAll(/(\d+)/g)][0][1];

    if (rate > 0) {
      usefulValves.push(label);
    }
    nodes[label] = {
      label,
      rate,
      connections,
    };
  });

  // init all the valve to valve path weight maps
  usefulValves.forEach((from) => {
    pathWeights[from] = {};
  });

  // for each valve, find the best/shortest path to each other valve
  // compress the graph down to just valves with >0 flow rate
  // and convert intermediate nodes to edge weights
  usefulValves.forEach((from) => {
    usefulValves.forEach((to) => {
      if (from !== to) {
        findPathBetweenValves(from, to);
      }
    });
  });

  // a BF search to find the shortest path from valve a to valve b
  function findPathBetweenValves(from: string, to: string) {
    // check prev calcs, if already found, skip search
    if (pathWeights[from][to]) {
      return;
    }

    // create a list of search nodes from the list of all valves
    const searchNodes = Object.fromEntries(
      Object.entries(nodes).map(([k, n]) => [
        k,
        {
          label: n.label,
          connections: n.connections,
          visited: false,
          weight: 0,
        },
      ]),
    );

    let weight = 0;
    const queue = [searchNodes[from]];
    let found = false;
    // find shortest path
    while (!found) {
      let curr = queue.shift()!;
      curr.visited = true;
      weight = curr.weight;
      // found the target node
      if (curr.label === to) {
        found = true;
      } else {
        // found a node worth tracking
        if (
          from !== curr.label &&
          usefulValves.includes(curr.label) &&
          pathWeights[from][curr.label] === undefined
        ) {
          pathWeights[from][curr.label] = weight;
        }
        const neighbours: SearchNode[] = [];
        curr.connections.forEach((con) => {
          // if not visited or already in queue, add node to search
          if (
            searchNodes[con].visited === false &&
            queue.indexOf(searchNodes[con]) === -1
          ) {
            // set a weight for this node and add it to valid neighbours set
            searchNodes[con].weight = weight + 1;
            neighbours.push(searchNodes[con]);
          }
        });
        // add all valid neighbours to search queue
        queue.push(...neighbours);
      }
    }

    // if target found set the edge weight between a & b
    // to the path length discovered in the search
    if (found) {
      pathWeights[from][to] = weight;
      pathWeights[to][from] = weight;
    }
  }

  // a DF search to find the optimal path, maximising flow rate
  function scorePaths(
    destinations: string[],
    opened: string[],
    from: string,
    time: number,
    score: number,
  ): number {
    // if we've run out of time, end this branch and return score
    if (time <= 0) {
      return score;
    }

    // add the from node to the opened set
    const nOpened = [...opened, from];
    // collect all potential next destinations, filtering out
    // any we've visited, or that we don't have time to visit
    const nDestinations = destinations.filter(
      (dest) => !nOpened.includes(dest) && pathWeights[from][dest] < time - 1,
    );

    // if we have some potential destinations
    if (nDestinations.length > 0) {
      // find the best flow rate in destinations, recursively
      return Math.max(
        // for each destination, calculate time taken to move there
        // and the amount of flow it would generate
        // pass values recursively into search to continue on this subbranch
        // map to subbranch pressure release score
        ...nDestinations.map((to: string) => {
          const nTime = Math.max(0, time - 1 - pathWeights[from][to]);
          const nScore = score + nTime * nodes[to].rate;
          return scorePaths(nDestinations, nOpened, to, nTime, nScore);
        }),
      );
    }

    // otherwise just return the score, this is the end of the line
    return score;
  }

  // find the optimal pressure release
  const bestRelease = scorePaths(usefulValves, [], "AA", 30, 0);
  return bestRelease;
}
