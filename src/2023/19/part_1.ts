import { ints, splitOnEmpty, sum } from "../../utils";
import { readInputFromFile } from "../../utils/io";
import { WorkflowRule, isWorkflowRule } from "./helpers";

export type Part = Record<PartKey, number>;
export type PartKey = "x" | "m" | "a" | "s";
export function part1(input?: string[]) {
  const lines = input ?? readInputFromFile(__dirname);
  const FIRST_WORKFLOW = "in";
  const { parts, workflows } = parse(lines);
  const accepted: Part[] = [];

  parts.forEach((part) => {
    if (processPart(part)) {
      accepted.push(part);
    }
  });

  const answer = sum(accepted.map((p) => sum(Object.values(p))));
  return answer;

  function processPart(part: Part) {
    // get the rules for this workflow
    let ruleSet = [...workflows[FIRST_WORKFLOW]];
    // while there are still rules to process
    while (ruleSet.length > 0) {
      // get the next rule
      let rule = ruleSet.shift()!;
      const { outcome } = rule;
      // if the rule has a test (eg x < 10)
      // then test the part values
      if (isWorkflowRule(rule)) {
        const { amount, comparison, target } = rule;
        if (comparison === ">") {
          if (part[target as PartKey] <= amount!) {
            // failed the test, continue to next rule
            continue;
          }
        } else if (comparison === "<") {
          if (part[target as PartKey] >= amount!) {
            // failed the test, continue to next rule
            continue;
          }
        }
      }
      // passed the test, or there was no test
      if (outcome === "A") {
        // either Accept the part
        return true;
      } else if (outcome === "R") {
        // or Reject the part
        return false;
      } else {
        // or load a new set of rules from another workflow
        ruleSet = [...workflows[rule?.outcome ?? ""]];
      }
    }
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
    const parts = rawParts.map((line): Part => {
      const [x, m, a, s] = ints(line);
      return {
        x,
        m,
        a,
        s,
      };
    });
    return { parts, workflows };
  }
}
