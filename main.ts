// One-Star Review of Something Essential.
//
// This program writes exactly one deadpan one-star review to
// /output/entry.txt. The review is the winner of a five-way local race
// (V1–V5, judged pairwise on the published brief): one essential, one
// genuine grievance, deadpan throughout, and the sting lands in the last
// few words.
//
// Winner V2 — gravity, 4-0 in the local round-robin: the sharpest, most
// universal daily grievance (things fall where hands cannot reach), fully
// deadpan, with a visual, specific twist at the end.
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const REVIEW =
  "Gravity has no off switch, no days off, and drops everything I own into the one place my hands cannot reach.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.txt");
writeFileSync(target, REVIEW, "utf8");

// Read the file back and enforce the competition gate before exiting:
// UTF-8 text of 1 to 160 characters, a single line, not only whitespace.
// Fail loudly here rather than handing the grader an invalid entry.
const back = readFileSync(target, "utf8");
const chars = [...back].length;
if (
  chars < 1 ||
  chars > 160 ||
  back.trim().length === 0 ||
  back.includes("\n")
) {
  throw new Error(`gate failed: entry.txt holds ${chars} characters`);
}
