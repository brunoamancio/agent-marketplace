const path = require('path');

/**
 * Validates output path to prevent path traversal attacks
 * @param {string} outputPath - User-provided output path
 * @param {string} allowedBaseDir - Base directory to restrict writes (default: cwd)
 * @returns {string} Validated absolute path
 * @throws {Error} If path traversal detected
 */
function validateOutputPath(outputPath, allowedBaseDir = process.cwd()) {
  const resolved = path.resolve(outputPath);
  const base = path.resolve(allowedBaseDir);

  if (!resolved.startsWith(base + path.sep) && resolved !== base) {
    throw new Error(`Security: Path traversal detected. Path must be within ${base}`);
  }

  return resolved;
}

/**
 * Sanitizes filename to prevent special characters
 * @param {string} filename - User-provided filename
 * @returns {string} Sanitized filename
 */
function sanitizeFilename(filename) {
  return filename.replace(/[^a-zA-Z0-9._-]/g, '_');
}

module.exports = { validateOutputPath, sanitizeFilename };
