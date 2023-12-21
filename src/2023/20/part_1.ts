import { readInputFromFile } from "../../utils/io";

export function part1(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);
  let FLIP_FLOP = "$" as const;
  let CONJUNCTION = "&" as const;
  let BROADCASTER = "broadcaster" as const;

  type ModuleType = typeof FLIP_FLOP | typeof CONJUNCTION | typeof BROADCASTER;

  interface Module {
    outputs: string[];
    inputs?: [string, boolean][];
    state: boolean;
    type: ModuleType;
  }

  // pulse queue of the form [to, from, pulse]
  type QueuedPulse = [string, string, boolean];

  const modules = parse(lines);

  let highs = 0;
  let lows = 0;

  for (let i = 0; i < 1000; i++) {
    pushButton();
  }

  return lows * highs;

  function pushButton() {
    // add the initial low from the button push, and the
    // replicated lows from the broadcaster to the first modules
    lows += modules[BROADCASTER].outputs.length + 1;

    // set up a queue of pulses to process, initially with the outputs of the broadcaster
    // pulse queue of the form [to, from, pulse]
    let queue: QueuedPulse[] = modules[BROADCASTER].outputs.map((id) => [id, BROADCASTER, false]);

    // while there are still pulses to propagate
    while (queue.length > 0) {
      // get the next pulse
      const [currentId, fromId, isHigh] = queue.shift()!;
      const currentModule = modules[currentId];
      // some modules won't be typed, these are "test modules"
      if (currentModule == null) {
        // they can be ignored, move to next pulse
        continue;
      }
      // set a flag for the output from this node
      let outputIsHigh = false;
      // NAND gate
      if (currentModule.type === CONJUNCTION) {
        // set the incoming pulse (input) to the value of the incoming pulse
        currentModule.inputs!.find(([id]) => id === fromId)![1] = isHigh;
        // NAND =>
        // if all inputs are high
        //  output -> low
        // else output -> high
        outputIsHigh = !currentModule.inputs!.every(([, x]) => x === true);

        // add the outgoing pulses from this module to the pulse queue
        // [to, from, pulse]
        queue.push(
          ...currentModule.outputs.map(
            (outputId): QueuedPulse => [outputId, currentId, outputIsHigh],
          ),
        );

        // count the highs/lows
        addPulses(outputIsHigh, currentModule.outputs.length);
      } else {
        // flip flop
        // only act if pulse is low
        if (!isHigh) {
          // set the on/off state of the flipflop
          currentModule.state = !currentModule.state;
          // output matches the on/off state
          outputIsHigh = !!currentModule.state;
          // add the outgoing pulses from this module to the pulse queue
          // [to, from, pulse]
          queue.push(
            ...currentModule.outputs.map(
              (output): QueuedPulse => [output, currentId, outputIsHigh],
            ),
          );
          // count the highs/lows
          addPulses(outputIsHigh, currentModule.outputs.length);
        }
      }
    }
  }

  function addPulses(pulse: boolean, amount: number) {
    // add pulses to relevant counters
    if (pulse) {
      highs += amount;
    } else {
      lows += amount;
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
