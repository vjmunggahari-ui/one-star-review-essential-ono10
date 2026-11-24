import { writeFileSync, readFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

// One-star review of batteries (88 characters, limit 160).
const LINE =
  "One star. Batteries are full when nothing needs them and dead the second something does.";

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR ?? join(process.cwd(), "output");
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");

writeFileSync(outPath, LINE, "utf8");

// Read-back self-check: the file must hold exactly the line we wrote,
// on one line, with no trailing newline, inside the 160-character gate.
const back = readFileSync(outPath, "utf8");
if (back !== LINE) throw new Error("entry.txt mismatch after write");
if (back.length > 160) throw new Error("entry exceeds 160 characters");
if (back.endsWith("\n")) throw new Error("entry must not end with a newline");
if (back.includes("\n")) throw new Error("entry must be a single line");
if (!back.startsWith("One star.")) throw new Error("entry must open with the rating");

console.log(`entry.txt written: ${back.length} characters`);
