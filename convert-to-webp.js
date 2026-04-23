const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const DIRS = ["imgs", "."];
const QUALITY = 82;

async function convertDir(dir) {
  const files = fs
    .readdirSync(dir)
    .filter((f) => /\.(jpe?g|png)$/i.test(f));

  for (const file of files) {
    const input = path.join(dir, file);
    const output = path.join(dir, file.replace(/\.(jpe?g|png)$/i, ".webp"));

    if (fs.existsSync(output)) {
      console.log(`skip   ${output}`);
      continue;
    }

    await sharp(input).webp({ quality: QUALITY }).toFile(output);

    const before = fs.statSync(input).size;
    const after = fs.statSync(output).size;
    const saved = Math.round(100 - (after / before) * 100);
    console.log(
      `wrote  ${output}  ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB  (-${saved}%)`
    );
  }
}

(async () => {
  for (const dir of DIRS) {
    if (fs.existsSync(dir)) await convertDir(dir);
  }
})();
