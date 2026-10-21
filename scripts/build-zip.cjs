const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const rootDir = path.resolve(__dirname, "..");
const pkgPath = path.join(rootDir, "package.json");

function collectFiles(dir, baseDir = dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    // Ignore OS junk and hidden files
    if (entry.name.startsWith(".") || entry.name === "Thumbs.db") continue;
    if (entry.isDirectory()) {
      files.push(...collectFiles(fullPath, baseDir));
    } else if (entry.isFile()) {
      const relPath = path.relative(baseDir, fullPath).replace(/\\/g, "/");
      files.push({
        name: relPath,
        fullPath,
        content: fs.readFileSync(fullPath),
        mtime: fs.statSync(fullPath).mtime,
      });
    }
  }
  return files;
}

function createZipBuffer(files) {
  const localHeaders = [];
  const centralHeaders = [];
  let offset = 0;

  for (const file of files) {
    const nameBuf = Buffer.from(file.name.replace(/\\/g, "/"), "utf8");
    const content = Buffer.isBuffer(file.content) ? file.content : Buffer.from(file.content, "utf8");
    const uncompressedSize = content.length;
    const crc = zlib.crc32(content);
    const compressed = zlib.deflateRawSync(content);
    const compressedSize = compressed.length;

    // Convert Date to MS-DOS date/time
    const date = file.mtime || new Date();
    const dosTime =
      ((date.getHours() & 0x1f) << 11) |
      ((date.getMinutes() & 0x3f) << 5) |
      ((Math.floor(date.getSeconds() / 2)) & 0x1f);
    const dosDate =
      (((date.getFullYear() - 1980) & 0x7f) << 9) |
      (((date.getMonth() + 1) & 0x0f) << 5) |
      (date.getDate() & 0x1f);

    // Local Header (30 bytes + name)
    const localHeader = Buffer.alloc(30 + nameBuf.length);
    localHeader.writeUInt32LE(0x04034b50, 0); // signature
    localHeader.writeUInt16LE(20, 4); // version needed
    localHeader.writeUInt16LE(0x0800, 6); // general flag (bit 11 = UTF-8)
    localHeader.writeUInt16LE(8, 8); // compression method (deflate)
    localHeader.writeUInt16LE(dosTime, 10);
    localHeader.writeUInt16LE(dosDate, 12);
    localHeader.writeUInt32LE(crc, 14);
    localHeader.writeUInt32LE(compressedSize, 18);
    localHeader.writeUInt32LE(uncompressedSize, 22);
    localHeader.writeUInt16LE(nameBuf.length, 26);
    localHeader.writeUInt16LE(0, 28); // extra field length
    nameBuf.copy(localHeader, 30);

    localHeaders.push(localHeader, compressed);

    // Central Directory Header (46 bytes + name)
    const centralHeader = Buffer.alloc(46 + nameBuf.length);
    centralHeader.writeUInt32LE(0x02014b50, 0); // signature
    centralHeader.writeUInt16LE(20, 4); // version made by
    centralHeader.writeUInt16LE(20, 6); // version needed
    centralHeader.writeUInt16LE(0x0800, 8); // general flag (bit 11 = UTF-8)
    centralHeader.writeUInt16LE(8, 10); // compression method (deflate)
    centralHeader.writeUInt16LE(dosTime, 12);
    centralHeader.writeUInt16LE(dosDate, 14);
    centralHeader.writeUInt32LE(crc, 16);
    centralHeader.writeUInt32LE(compressedSize, 20);
    centralHeader.writeUInt32LE(uncompressedSize, 24);
    centralHeader.writeUInt16LE(nameBuf.length, 28);
    centralHeader.writeUInt16LE(0, 30); // extra field length
    centralHeader.writeUInt16LE(0, 32); // comment length
    centralHeader.writeUInt16LE(0, 34); // disk number start
    centralHeader.writeUInt16LE(0, 36); // internal file attributes
    centralHeader.writeUInt32LE((0o100644 << 16) >>> 0, 38); // external file attributes
    centralHeader.writeUInt32LE(offset, 42); // relative offset of local header
    nameBuf.copy(centralHeader, 46);

    centralHeaders.push(centralHeader);

    offset += localHeader.length + compressed.length;
  }

  const centralDirOffset = offset;
  let centralDirSize = 0;
  for (const ch of centralHeaders) centralDirSize += ch.length;

  const eocd = Buffer.alloc(22);
  eocd.writeUInt32LE(0x06054b50, 0); // signature
  eocd.writeUInt16LE(0, 4); // disk number
  eocd.writeUInt16LE(0, 6); // disk where CD starts
  eocd.writeUInt16LE(files.length, 8); // entries on disk
  eocd.writeUInt16LE(files.length, 10); // total entries
  eocd.writeUInt32LE(centralDirSize, 12);
  eocd.writeUInt32LE(centralDirOffset, 16);
  eocd.writeUInt16LE(0, 20); // comment length

  return Buffer.concat([...localHeaders, ...centralHeaders, eocd]);
}

function validateArchive(files, manifestContent) {
  const fileNames = new Set(files.map((f) => f.name.replace(/\\/g, "/")));

  // Must contain manifest.json at root
  if (!fileNames.has("manifest.json")) {
    throw new Error("Validation failed: Archive is missing manifest.json at root");
  }

  let manifest;
  try {
    manifest = typeof manifestContent === "string" ? JSON.parse(manifestContent) : JSON.parse(manifestContent.toString("utf8"));
  } catch (err) {
    throw new Error("Validation failed: manifest.json is not valid JSON: " + err.message);
  }

  const requiredAssets = [];

  // 1. Icons
  if (manifest.icons && typeof manifest.icons === "object") {
    for (const iconPath of Object.values(manifest.icons)) {
      requiredAssets.push(iconPath);
    }
  }

  // 2. Action default_icon & default_popup
  if (manifest.action) {
    if (manifest.action.default_popup) {
      requiredAssets.push(manifest.action.default_popup);
    }
    if (manifest.action.default_icon) {
      if (typeof manifest.action.default_icon === "string") {
        requiredAssets.push(manifest.action.default_icon);
      } else if (typeof manifest.action.default_icon === "object") {
        for (const iconPath of Object.values(manifest.action.default_icon)) {
          requiredAssets.push(iconPath);
        }
      }
    }
  }

  // 3. Content scripts
  if (Array.isArray(manifest.content_scripts)) {
    for (const cs of manifest.content_scripts) {
      if (Array.isArray(cs.js)) requiredAssets.push(...cs.js);
      if (Array.isArray(cs.css)) requiredAssets.push(...cs.css);
    }
  }

  const missing = [];
  for (const asset of requiredAssets) {
    const normalized = asset.replace(/\\/g, "/").replace(/^\.\//, "");
    if (!fileNames.has(normalized)) {
      missing.push(normalized);
    }
  }

  if (missing.length > 0) {
    throw new Error(`Validation failed: Archive is missing manifest-referenced assets:\n  ${missing.join("\n  ")}`);
  }

  return true;
}

function buildArchive(options = {}) {
  const root = options.rootDir || rootDir;
  const pkg = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
  const version = pkg.version;

  const sourceDir = options.sourceDir || path.join(root, "abi-inspector-enhancer");
  const distDir = options.distDir || path.join(root, "dist");
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  const zipPath = path.join(distDir, `ABI-Inspector-Extended-v${version}.zip`);
  if (fs.existsSync(zipPath)) {
    fs.unlinkSync(zipPath);
  }

  console.log(`Building release archive for v${version}...`);

  const files = collectFiles(sourceDir);
  if (files.length === 0) {
    throw new Error(`No files found in ${sourceDir}`);
  }

  const manifestFile = files.find((f) => f.name === "manifest.json");
  if (!manifestFile) {
    throw new Error("manifest.json was not found in source directory");
  }

  validateArchive(files, manifestFile.content);

  const zipBuffer = createZipBuffer(files);
  fs.writeFileSync(zipPath, zipBuffer);

  const stats = fs.statSync(zipPath);
  if (stats.size === 0) {
    throw new Error("Generated zip file is empty");
  }

  console.log(`\x1b[32m✔ Release archive created successfully:\x1b[0m ${zipPath} (${(stats.size / 1024).toFixed(1)} KB, ${files.length} files)`);
  return { zipPath, size: stats.size, filesCount: files.length };
}

if (require.main === module) {
  try {
    buildArchive();
  } catch (err) {
    console.error("\x1b[31m✖ Failed to build zip archive:\x1b[0m", err.message);
    process.exit(1);
  }
}

module.exports = {
  collectFiles,
  createZipBuffer,
  validateArchive,
  buildArchive,
};
