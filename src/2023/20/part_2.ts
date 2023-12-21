import { leastCommonMultiple } from "../../utils";
import { readInputFromFile } from "../../utils/io";

// nb. found out later this is actually 4x
// a 12-bit binary counter that are the inputs
// to the NAND gates that then are inputs to "&hj"
// which is the input to 'rx'
// turns out if you graph it, you could figure it out
// by hand :)
export function part2(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);
  let FLIP_FLOP = "$" as const;
  let CONJUNCTION = "&" as const;
  let BROADCASTER = "broadcaster" as const;
  type ModuleType = typeof FLIP_FLOP | typeof CONJUNCTION | typeof BROADCASTER;
  interface Module {
    outputs: string[];
    inputs?: [string, boolean][];
    state: boolean;
    last: boolean;
    type: ModuleType;
  }
  type QueuedPulse = [string, string, boolean];

  // get all the modules into a module dict
  const modules = parse(lines);

  // module "&hj" is the only input to "rx"
  // it needs all it's inputs to be high to send a low to "rx"
  // the inputs for "&hj" are "&zk","&qs","&jf","&ks"
  // specific to my puzzle input
  // using this dict to track the cycle time for a high pulse out of
  // each of these inputs to "&hj"
  const hjs: Record<string, number | null> = {
    zk: null,
    qs: null,
    jf: null,
    ks: null,
  };

  const targetInputs = Object.keys(hjs);

  // counter for number of times button was pressed
  let presses = 0;
  // while we haven't found the cycle time for all inputs of "&hj"
  while (Object.values(hjs).some((v) => v == null)) {
    // press the button
    presses++;
    pushButton();
  }

  // once all cycles have been found, simply return the least common multiple
  // across all cycle times of the inputs to "&hj" to discover when they'd all
  // align and cause "&hj" to output a [LOW] pulse
  return leastCommonMultiple(Object.values(hjs) as number[]);

  // ----
  // simulating pulses in the same manner as Part 1
  function pushButton() {
    let queue: QueuedPulse[] = modules[BROADCASTER].outputs.map((id) => [id, BROADCASTER, false]);

    while (queue.length > 0) {
      const [currentId, fromId, isHigh] = queue.shift()!;
      const currentModule = modules[currentId];
      if (currentModule == null) {
        continue;
      }
      let outputIsHigh = false;
      if (currentModule.type === CONJUNCTION) {
        currentModule.inputs!.find(([id]) => id === fromId)![1] = isHigh;
        outputIsHigh = !currentModule.inputs!.every(([id, x]) => x === true);
        // if
        // - this is an input for "&hj"
        // - AND the output pulse is HIGH
        // - AND we haven't already found the cycle time for this module
        if (targetInputs.includes(currentId) && outputIsHigh && hjs[currentId] == null) {
          // then track the current number of button presses
          // as the cycle time for this input
          hjs[currentId] = presses;
        }
        queue.push(
          ...currentModule.outputs.map((outputId): QueuedPulse => {
            return [outputId, currentId, outputIsHigh];
          }),
        );
      } else {
        if (!isHigh) {
          currentModule.state = !currentModule.state;
          outputIsHigh = !!currentModule.state;
          currentModule.last = outputIsHigh;
          queue.push(
            ...currentModule.outputs.map(
              (output): QueuedPulse => [output, currentId, outputIsHigh],
            ),
          );
        }
      }
    }
  }

  function parse(lines: string[]) {
    const modules: Record<string, Module> = {};
    lines.forEach((line) => {
      line = line.replace("%", FLIP_FLOP);
      const [moduleStr, targets] = line.split("->").map((s) => s.trim());
      const outputs = targets.split(",").map((s) => s.trim());

      if (moduleStr === BROADCASTER) {
        modules[BROADCASTER] = {
          type: BROADCASTER,
          state: false,
          last: false,
          outputs,
          inputs: [],
        };
      } else {
        const type = moduleStr.slice(0, 1) as ModuleType;
        const moduleId = moduleStr.slice(1);
        const module = { type, outputs, inputs: [], state: false, last: false };
        modules[moduleId] = module;
      }
    });
    Object.entries(modules).forEach(([id, module]) => {
      module.outputs.forEach((output) => {
        if (modules[output] && modules[output].type === CONJUNCTION) {
          modules[output].inputs?.push([id, false]);
        }
      });
    });
    return modules;
  }
}
