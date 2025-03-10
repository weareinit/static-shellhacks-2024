import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { glob } from "glob";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Function to rename a file
const renameFile = (oldPath) => {
  const dir = path.dirname(oldPath);
  const filename = path.basename(oldPath);
  const newFilename = filename.replace(/\s+/g, "-");
  const newPath = path.join(dir, newFilename);

  if (filename !== newFilename) {
    try {
      fs.renameSync(oldPath, newPath);
      console.log(`Renamed: ${filename} -> ${newFilename}`);
      return { oldPath, newPath };
    } catch (error) {
      console.error(`Error renaming ${filename}:`, error);
      return null;
    }
  }
  return null;
};

// Find all files in public/assets
const files = await glob("public/assets/**/*.*", {
  ignore: ["**/node_modules/**"],
});

// Keep track of renamed files
const renamedFiles = [];

// Rename all files with spaces
for (const file of files) {
  const result = renameFile(file);
  if (result) {
    renamedFiles.push(result);
  }
}

// Create a log of renamed files
if (renamedFiles.length > 0) {
  const logContent = renamedFiles.map(({ oldPath, newPath }) => `${oldPath} -> ${newPath}`).join("\n");

  fs.writeFileSync("scripts/renamed-files.log", logContent);
  console.log(`\nRenamed ${renamedFiles.length} files. See scripts/renamed-files.log for details.`);
} else {
  console.log("\nNo files needed renaming.");
}
