import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read backup file list
const backupFiles = JSON.parse(fs.readFileSync("scripts/backup-files.json", "utf8"));

// Restore original files
for (const file of backupFiles) {
  const backupFile = `${file}.bak`;

  if (fs.existsSync(backupFile)) {
    // Restore from backup
    fs.copyFileSync(backupFile, file);
    // Remove backup
    fs.unlinkSync(backupFile);
    console.log(`Restored ${file}`);
  } else {
    console.warn(`Backup file not found for ${file}`);
  }
}

console.log("Server actions restored");
