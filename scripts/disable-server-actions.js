import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { glob } from "glob";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Find all files with server actions
const serverActionFiles = await glob("src/**/*.{ts,tsx,js,jsx}", {
  ignore: ["**/node_modules/**", "**/dist/**", "**/out/**", "**/.next/**"],
});

// Backup and modify files
const backupFiles = [];

for (const file of serverActionFiles) {
  const content = fs.readFileSync(file, "utf8");

  // Check if file contains server actions
  if (content.includes('"use server"') || content.includes("'use server'")) {
    console.log(`Found server action in ${file}`);

    // Create backup
    const backupFile = `${file}.bak`;
    fs.writeFileSync(backupFile, content);
    backupFiles.push(file);

    // Replace server action directive with comment
    const modifiedContent = content.replace(/(['"]use server['"])/g, "// $1 - temporarily disabled for static export");

    fs.writeFileSync(file, modifiedContent);
    console.log(`Modified ${file}`);
  }
}

// Write backup list to file for restoration
fs.writeFileSync("scripts/backup-files.json", JSON.stringify(backupFiles, null, 2));
console.log("Server actions temporarily disabled for static export");
