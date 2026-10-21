const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");

const SEMVER_REGEX = /^\d+\.\d+\.\d+$/;

function validateSemver(v) {
  if (!v || typeof v !== "string" || !SEMVER_REGEX.test(v.trim())) {
    throw new Error(`Invalid version: "${v}". Expected semantic version in X.Y.Z format (e.g., 3.0.6).`);
  }
  return v.trim();
}

function computeTargetVersion(currentVersion, arg) {
  validateSemver(currentVersion);
  if (!arg || arg === "patch") {
    const parts = currentVersion.split(".").map(Number);
    parts[2] += 1;
    return parts.join(".");
  }
  if (arg === "minor") {
    const parts = currentVersion.split(".").map(Number);
    parts[1] += 1;
    parts[2] = 0;
    return parts.join(".");
  }
  if (arg === "major") {
    const parts = currentVersion.split(".").map(Number);
    parts[0] += 1;
    parts[1] = 0;
    parts[2] = 0;
    return parts.join(".");
  }
  const clean = String(arg).replace(/^v/, "").trim();
  validateSemver(clean);
  return clean;
}

function bumpVersion(options = {}) {
  const root = options.rootDir || rootDir;
  const pkgPath = path.join(root, "package.json");
  const manifestPath = path.join(root, "abi-inspector-enhancer", "manifest.json");

  if (!fs.existsSync(pkgPath)) {
    throw new Error(`package.json not found at ${pkgPath}`);
  }
  if (!fs.existsSync(manifestPath)) {
    throw new Error(`manifest.json not found at ${manifestPath}`);
  }

  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

  const currentVersion = pkg.version;
  if (!currentVersion) {
    throw new Error("package.json is missing 'version' field");
  }
  if (manifest.version !== currentVersion) {
    throw new Error(`Version synchronization error: package.json has v${currentVersion} but manifest.json has v${manifest.version}`);
  }

  const rawTarget = options.targetVersion !== undefined ? options.targetVersion : process.argv[2];
  const targetVersion = computeTargetVersion(currentVersion, rawTarget);

  if (targetVersion === currentVersion) {
    throw new Error(`Target version v${targetVersion} is identical to current version.`);
  }

  console.log(`Bumping version: v${currentVersion} -> v${targetVersion}`);

  function updateJsonFile(filePath, mutator) {
    const absPath = path.join(root, filePath);
    if (!fs.existsSync(absPath)) {
      throw new Error(`Expected JSON file missing: ${filePath}`);
    }
    const data = JSON.parse(fs.readFileSync(absPath, "utf8"));
    mutator(data);
    fs.writeFileSync(absPath, JSON.stringify(data, null, 2) + "\n", "utf8");
    console.log(`  Updated ${filePath}`);
  }

  function updateTextFile(filePath, replacements) {
    const absPath = path.join(root, filePath);
    if (!fs.existsSync(absPath)) {
      if (options.ignoreMissing) return;
      throw new Error(`Expected file missing: ${filePath}`);
    }
    let content = fs.readFileSync(absPath, "utf8");
    let changed = false;

    for (const { target, replacement } of replacements) {
      const isRegex = target instanceof RegExp;
      const count = isRegex
        ? (content.match(target) || []).length
        : content.split(target).length - 1;

      if (count === 0) {
        throw new Error(`Failed to update ${filePath}: expected pattern ${target} not found.`);
      }

      content = content.replace(target, replacement);
      changed = true;
    }

    if (changed) {
      fs.writeFileSync(absPath, content, "utf8");
      console.log(`  Updated ${filePath}`);
    }
  }

  const escapedCur = currentVersion.replace(/\./g, "\\.");

  // 1. package.json
  updateJsonFile("package.json", (json) => {
    json.version = targetVersion;
  });

  // 2. manifest.json
  updateJsonFile("abi-inspector-enhancer/manifest.json", (json) => {
    json.version = targetVersion;
  });

  // 3. popup.js
  updateTextFile("abi-inspector-enhancer/popup.js", [
    {
      target: new RegExp(`"${escapedCur}"`, "g"),
      replacement: `"${targetVersion}"`,
    },
  ]);

  // 4. settings.js
  updateTextFile("abi-inspector-enhancer/settings.js", [
    {
      target: new RegExp(`v${escapedCur}`, "g"),
      replacement: `v${targetVersion}`,
    },
  ]);

  // 5. site-ui.js
  updateTextFile("abi-inspector-enhancer/site-ui.js", [
    {
      target: new RegExp(`v${escapedCur}`, "g"),
      replacement: `v${targetVersion}`,
    },
    {
      target: new RegExp(`\\|\\| "${escapedCur}"`, "g"),
      replacement: `|| "${targetVersion}"`,
    },
    {
      target: new RegExp(`return "${escapedCur}";`, "g"),
      replacement: `return "${targetVersion}";`,
    },
  ]);

  // 6. README.md
  updateTextFile("README.md", [
    {
      target: new RegExp(`version-${escapedCur}-`, "g"),
      replacement: `version-${targetVersion}-`,
    },
    {
      target: new RegExp(`\\*\\*Version ${escapedCur}\\*\\*`, "g"),
      replacement: `**Version ${targetVersion}**`,
    },
  ]);

  // 7. Tests
  updateTextFile("tests/overview.test.cjs", [
    {
      target: new RegExp(`v${escapedCur}`, "g"),
      replacement: `v${targetVersion}`,
    },
  ]);

  updateTextFile("tests/settings.test.cjs", [
    {
      target: new RegExp(`version: "${escapedCur}"`, "g"),
      replacement: `version: "${targetVersion}"`,
    },
  ]);

  console.log(`Version bump to v${targetVersion} completed.`);
  return { previousVersion: currentVersion, currentVersion: targetVersion };
}

if (require.main === module) {
  try {
    bumpVersion();
  } catch (err) {
    console.error("\x1b[31m✖ Version bump failed:\x1b[0m", err.message);
    process.exit(1);
  }
}

module.exports = {
  validateSemver,
  computeTargetVersion,
  bumpVersion,
};
