import { Point, splitOnEmpty } from "../../utils";
import { readInputFromFile } from "../../utils/io";
import { PartRanges, isWorkflowRule, WorkflowRule, PartKey } from "./helpers";

export function part2(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);
  const FIRST_WORKFLOW = "in";
  const workflows = parse(lines);
  const startRanges: PartRanges = {
    x: [1, 4000],
    m: [1, 4000],
    a: [1, 4000],
    s: [1, 4000],
  };

  const total = processWorkflow(startRanges, FIRST_WORKFLOW, workflows[FIRST_WORKFLOW]);

  return total;

  function processWorkflow(r: PartRanges, workflowId: string, ruleSet: WorkflowRule[]): number {
    let ranges: PartRanges | null = r;
    let total = 0;
    let trueSlice: PartRanges | null;
    let falseSlice: PartRanges | null;
    let trueRange: Point;
    let falseRange: Point;
    // if the ranges are null, then return early 0
    if (ranges === null) {
      return 0;
    }
    // copy the rule set as it'll be modified
    const rules = ruleSet.slice();
    // while there are rules in this workflow, process it
    while (rules.length > 0 && ranges != null) {
      let currentRule = rules.shift()!;
      const { outcome } = currentRule;
      // if this rule has a test (eg. x < 10)
      if (isWorkflowRule(currentRule)) {
        const { amount, comparison, target } = currentRule;

        // test the values and split the ranges
        if (comparison === ">") {
          trueRange = [amount + 1, ranges[target][1]];
          falseRange = [ranges[target][0], amount];
        } else if (comparison === "<") {
          trueRange = [ranges[target][0], amount - 1];
          falseRange = [amount, ranges[target][1]];
        }

        // then check to make sure the split range that passed makes sense
        if (trueRange![0] <= trueRange![1]) {
          // create a new ranges object with the [target] range replaced by the
          // range of values that passed the test
          trueSlice = { ...ranges, [target]: trueRange! };
          // then process this subset of the original ranges in the outcome
          const subTotal = processWorkflow(trueSlice, outcome, workflows[outcome]);
          // and add to the total for this workflow
          total += subTotal;
        }
        // then check to make sure the split range that didn't pass makes sense
        if (falseRange![0] <= falseRange![1]) {
          // create a new ranges object with the [target] range replaced by the
          // range of values that failed the test
          falseSlice = { ...ranges, [target]: falseRange! };
          // and replace the current set of ranges with it, so that they can
          // move on to the next rule in this workflow
          ranges = falseSlice!;
        } else {
          // if this false range didn't make sense, it means there isn't any numbers in that range
          // just set ranges to null
          ranges = null;
        }
      } else {
        // if the rule is just an outcome
        if (outcome === "A") {
          // either accept this set of ranges
          total += combineRanges(ranges);
        } else if (outcome !== "R") {
          // or process them into the next workflow
          total += processWorkflow(ranges!, outcome, workflows[outcome]);
        }
        // or reject them (do nothing)
      }
    }
    return total;
  }

  // to get total combinations from this set of ranges
  function combineRanges(ranges: PartRanges) {
    // if null, ranges invalid, return 0
    if (ranges == null) {
      return 0;
    }
    // for each range, subtract the [lower bound] from the [higher bound] and [add 1]
    // (as it is inclusive, eg. a range of 1..10 has 10 values)
    return (
      (ranges.x[1] - ranges.x[0] + 1) *
      (ranges.m[1] - ranges.m[0] + 1) *
      (ranges.a[1] - ranges.a[0] + 1) *
      (ranges.s[1] - ranges.s[0] + 1)
    );
  }

  function parse(lines: string[]) {
    const [rawWorkflows, rawParts] = splitOnEmpty(lines);
    const workflows: Record<string, WorkflowRule[]> = {};
    rawWorkflows.map((line) => {
      const [workflow, rawRules] = line.split("{");
      const rules = rawRules
        .slice(0, -1)
        .split(",")
        .map((ruleLine): WorkflowRule => {
          // rules will be either a>100:{workflow} or just {workflow}
          // where workflow is the id of another workflow or A | R
          const [ruleTokens, outcome] = ruleLine.split(":");
          if (!outcome) {
            return {
              outcome: ruleTokens,
            };
          }
          return {
            target: ruleTokens.slice(0, 1) as PartKey,
            comparison: ruleTokens.slice(1, 2),
            amount: +ruleTokens.slice(2),
            outcome,
          };
        });
      workflows[workflow] = rules;
    });

    workflows["A"] = [{ outcome: "A" }];
    workflows["R"] = [{ outcome: "R" }];
    return workflows;
  }
}
