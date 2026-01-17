# Security

This document describes the security improvements implemented in this fork of claude-config tools.

## Overview

This fork has undergone comprehensive security hardening to address vulnerabilities identified in the original codebase. All critical and high-priority security issues have been resolved.

## Security Improvements

### 1. Command Injection Protection (CRITICAL)

**Location:** `tools/mermaid-renderer/md-to-pdf.js`

**Issue:** The original code used `execSync()` with string interpolation, allowing arbitrary command execution via malicious file paths.

**Fix:** Replaced `execSync()` with `execFileSync()` and argument arrays to prevent shell injection.

**Impact:** Eliminates Remote Code Execution (RCE) vulnerability.

```javascript
// Before (VULNERABLE):
execSync(`cd "${mdDir}" && pandoc "${mdPath}" -o "${htmlPath}"`)

// After (SECURE):
execFileSync('pandoc', [mdPath, '-o', htmlPath, ...], { cwd: mdDir })
```

### 2. Path Traversal Protection

**Locations:**
- `tools/dot-renderer/render-dot.js`
- `tools/mermaid-renderer/svg-to-png.js`
- `tools/mermaid-renderer/render-mermaid.js`
- `tools/mermaid-renderer/process-document.js`
- `tools/dot-renderer/process-document.js`

**Issue:** User-provided file paths were not validated, allowing writes to arbitrary filesystem locations (e.g., `../../etc/passwd`).

**Fix:** Added `validateOutputPath()` utility that validates all output paths stay within the current working directory.

**Impact:** Prevents arbitrary file write attacks and privilege escalation.

```javascript
// Validation applied to all file operations
const validatedPath = validateOutputPath(outputPath, process.cwd());
```

### 3. Resource Exhaustion Prevention

**Locations:**
- `tools/mermaid-renderer/render-mermaid.js`
- `tools/mermaid-renderer/svg-to-png.js`
- `tools/mermaid-renderer/md-to-pdf.js`

**Issue:** Puppeteer instances launched without timeouts or resource limits could be exploited for DoS attacks.

**Fix:** Implemented secure browser launcher with timeouts and resource limits.

**Impact:** Prevents system crashes and denial of service.

```javascript
// Secure browser with timeouts
const browser = await launchSecureBrowser({ timeout: 30000 });
const page = await createSecurePage(browser, {
  pageTimeout: 15000,
  navTimeout: 30000
});
```

### 4. CDN Dependency Elimination

**Location:** `tools/mermaid-renderer/render-mermaid.js`

**Issue:** Mermaid library loaded from CDN at runtime, creating supply chain attack risk.

**Fix:** Bundled Mermaid locally as npm dependency and inject code directly into pages.

**Impact:** Eliminates external dependency and ensures code integrity.

```javascript
// Local package instead of CDN
const mermaidPath = require.resolve('mermaid/dist/mermaid.min.js');
const mermaidJs = await fs.readFile(mermaidPath, 'utf-8');
```

## Security Utilities

### Path Validation (`tools/lib/security.js`)

```javascript
validateOutputPath(outputPath, allowedBaseDir)
```

Validates that output paths stay within safe boundaries. Throws error if path traversal is detected.

### Secure Puppeteer Helper (`tools/lib/puppeteer-helper.js`)

```javascript
launchSecureBrowser(options)  // Launch with timeouts and resource limits
createSecurePage(browser, options)  // Create page with security settings
renderWithTimeout(renderFn, timeoutMs)  // Wrap operations with timeout
```

## Dependency Audit

All npm dependencies have been audited:

- `tools/mermaid-renderer`: **0 vulnerabilities**
- `tools/dot-renderer`: **0 vulnerabilities**
- `tools/markdown-export`: **0 vulnerabilities**

Run `npm audit` in each tool directory to verify.

## Security Testing

### Testing for Path Traversal

```bash
# Should fail with security error:
./render-dot.js diagram.dot ../../etc/test.svg
./render-mermaid.js diagram.mmd ../../../tmp/test.svg
```

### Testing for Command Injection

```bash
# Should fail or sanitize (no command execution):
./md-to-pdf.js "test; rm -rf /" output.pdf
./md-to-pdf.js "$(whoami)" output.pdf
```

### Testing Resource Limits

```bash
# Should timeout gracefully with complex diagrams:
timeout 45s ./render-mermaid.js huge-diagram.mmd output.svg
```

## Remaining Considerations

### 1. GraphViz Dependency (Low Priority)

`tools/dot-renderer` uses `node-graphviz@0.1.1` (last updated 2016). Consider migrating to more actively maintained alternatives:

- `@aduh95/viz.js`
- `@hpcc-js/wasm`

### 2. Environment Sandboxing

For additional security when processing untrusted input, consider:

- Running tools in Docker containers
- Using restricted user accounts
- Implementing file system quotas

### 3. Input Validation

While path traversal is prevented, consider adding:

- Diagram size limits
- Code complexity analysis
- Content sanitization for user-provided diagram code

## Reporting Security Issues

If you discover a security vulnerability in this fork, please:

1. **DO NOT** open a public issue
2. Contact the repository maintainer directly
3. Provide detailed reproduction steps
4. Allow time for fix before public disclosure

## Security Audit History

- **2026-01-17**: Comprehensive security review and fixes applied
  - Fixed command injection vulnerability
  - Fixed path traversal vulnerabilities
  - Added resource exhaustion protection
  - Eliminated CDN dependencies
  - All npm packages audited (0 vulnerabilities)

## License

Security improvements in this fork are provided as-is under the same license as the original project (MIT).
