import { Point } from "../../utils";

export type WorkflowRule = Rule | AcceptReject;
export interface Rule extends AcceptReject {
  target: PartKey;
  comparison: string;
  amount: number;
}
export interface AcceptReject {
  outcome: string;
}
export function isWorkflowRule(tested: WorkflowRule): tested is Rule {
  return (tested as Rule).target != null;
}

export type PartKey = "x" | "m" | "a" | "s";
export type PartRanges = Record<PartKey, Point>;
