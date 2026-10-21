const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const rootDir = path.resolve(__dirname, "..");
const pkg = JSON.parse(fs.readFileSync(path.join(rootDir, "package.json"), "utf8"));
const version = pkg.version;

const distDir = path.join(rootDir, "dist");
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

const zipPath = path.join(distDir, `ABI-Inspector-Extended-v${version}.zip`);
if (fs.existsSync(zipPath)) {
  fs.unlinkSync(zipPath);
}

console.log(`Building release archive for v${version}...`);

try {
  // Use PowerShell Compress-Archive
  const cmd = `Compress-Archive -Path "abi-inspector-enhancer\\*" -DestinationPath "dist\\ABI-Inspector-Extended-v${version}.zip" -Force`;
  execSync(cmd, { cwd: rootDir, stdio: "inherit", shell: "powershell.exe" });
  
  const stats = fs.statSync(zipPath);
  console.log(`\x1b[32m✔ Release archive created successfully:\x1b[0m ${zipPath} (${(stats.size / 1024).toFixed(1)} KB)`);
} catch (err) {
  console.error("Failed to build zip archive:", err);
  process.exit(1);
}
