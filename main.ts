import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE = "Moved my ocean without asking. Twice a day, no notice. One star.";

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR;
  if (!outDir) {
    console.error("MAKEFUN_OUTPUT_DIR is not set");
    process.exit(1);
  }
  if (LINE.length < 1 || LINE.length > 120) {
    console.error(`entry must be 1-120 characters, got ${LINE.length}`);
    process.exit(1);
  }
  if (LINE.trim().length === 0 || LINE.includes("\n")) {
    console.error("entry must be a single non-blank line");
    process.exit(1);
  }
  if (LINE.length !== 64) {
    console.error(`entry must be exactly 64 characters, got ${LINE.length}`);
    process.exit(1);
  }
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  writeFileSync(target, LINE, "utf8");
  // Read back: what the grader will see must be byte-identical to the line.
  if (readFileSync(target, "utf8") !== LINE) {
    console.error("read-back mismatch: entry.txt differs from the line");
    process.exit(1);
  }
}

main();
