const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const pkgPath = path.join(rootDir, "package.json");
const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
const currentVersion = pkg.version;

let targetVersion = process.argv[2];
if (!targetVersion || targetVersion === "patch") {
  const parts = currentVersion.split(".").map(Number);
  parts[2] += 1;
  targetVersion = parts.join(".");
} else if (targetVersion === "minor") {
  const parts = currentVersion.split(".").map(Number);
  parts[1] += 1;
  parts[2] = 0;
  targetVersion = parts.join(".");
} else if (targetVersion === "major") {
  const parts = currentVersion.split(".").map(Number);
  parts[0] += 1;
  parts[1] = 0;
  parts[2] = 0;
  targetVersion = parts.join(".");
}
targetVersion = targetVersion.replace(/^v/, "");

console.log(`Bumping version: v${currentVersion} -> v${targetVersion}`);

function replaceInFile(filePath, regex, replacement) {
  const absPath = path.join(rootDir, filePath);
  if (!fs.existsSync(absPath)) return;
  const content = fs.readFileSync(absPath, "utf8");
  const updated = content.replace(regex, replacement);
  if (content !== updated) {
    fs.writeFileSync(absPath, updated, "utf8");
    console.log(`  Updated ${filePath}`);
  }
}

// 1. package.json
replaceInFile("package.json", `"version": "${currentVersion}"`, `"version": "${targetVersion}"`);

// 2. manifest.json
replaceInFile("abi-inspector-enhancer/manifest.json", `"version": "${currentVersion}"`, `"version": "${targetVersion}"`);

// 3. popup.js
replaceInFile("abi-inspector-enhancer/popup.js", new RegExp(`"${currentVersion.replace(/\./g, "\\.")}"`, "g"), `"${targetVersion}"`);

// 4. settings.js
replaceInFile("abi-inspector-enhancer/settings.js", new RegExp(`v${currentVersion.replace(/\./g, "\\.")}`, "g"), `v${targetVersion}`);

// 5. site-ui.js
replaceInFile("abi-inspector-enhancer/site-ui.js", new RegExp(`v${currentVersion.replace(/\./g, "\\.")}`, "g"), `v${targetVersion}`);
replaceInFile("abi-inspector-enhancer/site-ui.js", new RegExp(`\\|\\| "${currentVersion.replace(/\./g, "\\.")}"`, "g"), `|| "${targetVersion}"`);
replaceInFile("abi-inspector-enhancer/site-ui.js", new RegExp(`return "${currentVersion.replace(/\./g, "\\.")}";`, "g"), `return "${targetVersion}";`);

// 6. README.md
replaceInFile("README.md", new RegExp(`version-${currentVersion.replace(/\./g, "\\.")}-`, "g"), `version-${targetVersion}-`);
replaceInFile("README.md", new RegExp(`\\*\\*Version ${currentVersion.replace(/\./g, "\\.")}\\*\\*`, "g"), `**Version ${targetVersion}**`);

// 7. Tests
replaceInFile("tests/overview.test.cjs", new RegExp(`v${currentVersion.replace(/\./g, "\\.")}`, "g"), `v${targetVersion}`);
replaceInFile("tests/settings.test.cjs", new RegExp(`version: "${currentVersion.replace(/\./g, "\\.")}"`, "g"), `version: "${targetVersion}"`);

console.log(`Version bump to v${targetVersion} completed.`);
