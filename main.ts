import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: a deadpan one-star review of sleep, the everyday essential.
const LINE =
  "One star. I give sleep eight hours every night and it still wakes me up tired, like I owe it something.";

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR || join(process.cwd(), "output");
mkdirSync(outDir, { recursive: true });
const out = join(outDir, "entry.txt");
writeFileSync(out, LINE);

// Self-check: read back and verify byte-identical, no trailing newline,
// within the 1-160 character gate, deadpan (no exclamation marks), and the
// turn lands in the last few words.
const back = readFileSync(out, "utf8");
if (back !== LINE) throw new Error("read-back mismatch");
if (back.length < 1 || back.length > 160)
  throw new Error("length out of gate range");
if (back.endsWith("\n")) throw new Error("trailing newline");
if (back.includes("!")) throw new Error("exclamation mark breaks the deadpan");
if (!back.endsWith("like I owe it something."))
  throw new Error("turn not at end");
console.log(`wrote entry.txt (${back.length} chars)`);
