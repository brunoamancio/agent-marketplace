# SVG to PNG Converter Skill

Convert SVG files to high-quality PNG images using headless browser rendering.

[![Security](https://img.shields.io/badge/security-hardened-brightgreen)](../../SECURITY.md)
[![Vulnerabilities](https://img.shields.io/badge/npm%20audit-0%20vulnerabilities-brightgreen)](../../SECURITY.md)

**Note:** For diagram workflows, Mermaid and Graphviz can now render directly to PNG. This skill is useful for converting existing SVG files or when you need additional control over PNG generation.

## Installation

### Via Marketplace (Recommended)

```bash
# Add the marketplace
/plugin marketplace add brunoamancio/agent-marketplace

# Install the svg-to-png skill
/plugin install svg-to-png@agent-marketplace

# Install dependencies
cd ~/.claude/skills/svg-to-png && npm install
```

### Manual Installation

```bash
# Copy skill to Claude Code skills directory
cp -r skills/svg-to-png ~/.claude/skills/

# Install dependencies
cd ~/.claude/skills/svg-to-png
npm install
```

## Features

- **High Resolution**: 2x device scale factor (Retina quality) for crisp images
- **Automatic Sizing**: Extracts dimensions from SVG viewBox
- **Security Hardened**: Path validation, timeouts, resource limits
- **Batch Processing**: Convert entire directories of SVG files
- **Dual Modes**: Single file or directory processing

## Usage

### Convert Single File

```bash
# Specify output filename
node ~/.claude/skills/svg-to-png/svg-to-png.js input.svg output.png

# Auto-generate output filename (replaces .svg with .png)
node ~/.claude/skills/svg-to-png/svg-to-png.js diagram.svg
```

### Convert Directory

```bash
# Convert all SVG files in directory
node ~/.claude/skills/svg-to-png/svg-to-png.js ./images/

# Converts:
# ./images/diagram1.svg -> ./images/diagram1.png
# ./images/diagram2.svg -> ./images/diagram2.png
```

## Common Workflows

### 1. Graphviz/DOT Diagram to PNG

Graphviz renders to SVG, so SVG-to-PNG conversion is needed:

```bash
# Step 1: Render DOT to SVG
node ~/.claude/skills/diagramming/dot/render-dot.js graph.dot graph.svg

# Step 2: Convert SVG to PNG
node ~/.claude/skills/svg-to-png/svg-to-png.js graph.svg graph.png

# Step 3: Clean up SVG
rm graph.svg
```

### 2. Markdown Documentation

Create PNG images for markdown files:

```bash
# Generate diagram as SVG
node ~/.claude/skills/diagramming/dot/render-dot.js architecture.dot temp.svg

# Convert to PNG in images directory
node ~/.claude/skills/svg-to-png/svg-to-png.js temp.svg ./images/architecture.png

# Clean up temporary SVG
rm temp.svg
```

Then reference in markdown:
```markdown
![System architecture diagram](./images/architecture.png)
```

### 3. Batch Convert Diagrams

Convert all diagrams in a project:

```bash
# Assume you have ./diagrams/ with multiple SVG files
node ~/.claude/skills/svg-to-png/svg-to-png.js ./diagrams/

# All SVG files are converted to PNG in same directory
ls ./diagrams/
# diagram1.svg  diagram1.png
# diagram2.svg  diagram2.png
# diagram3.svg  diagram3.png
```

## Technical Details

### How It Works

1. **Load SVG**: Reads SVG file contents from disk
2. **Extract Dimensions**: Parses viewBox attribute for width/height
3. **Launch Browser**: Starts headless Chrome with security timeouts
4. **Render HTML**: Embeds SVG in minimal HTML page
5. **Capture Screenshot**: Takes high-resolution screenshot (2x scale)
6. **Save PNG**: Writes PNG buffer to output file

### Output Quality

- **Resolution**: 2x device pixel ratio (Retina displays)
- **Color Depth**: 24-bit RGB with alpha channel
- **Accuracy**: Chrome's SVG rendering engine (pixel-perfect)
- **Padding**: Automatic 16px padding around SVG content

### Security Features

All inputs are validated to prevent security issues:

- **Path Validation**: Prevents directory traversal attacks
- **Browser Timeouts**: 30-second browser launch timeout
- **Page Timeouts**: 15-second page operations timeout
- **File Sanitization**: Strips directory components from filenames

### Performance

- **Single File**: ~1-2 seconds per conversion
- **Batch**: Processes files sequentially (not parallelized)
- **Memory**: Each conversion launches new browser instance
- **Chromium**: Downloaded once by Puppeteer (~170MB)

## API Reference

### Command Line

```bash
svg-to-png <input.svg> [output.png]
svg-to-png <directory>
```

### Programmatic

```javascript
const { convertSvgToPng } = require('./svg-to-png.js');

// Convert single file
await convertSvgToPng('input.svg', 'output.png');

// Auto-generate output filename
await convertSvgToPng('input.svg', 'input.png');
```

## Troubleshooting

### Puppeteer Installation Issues

**Problem**: Chromium download fails during `npm install`

**Solution**:
```bash
# Use environment variable to skip download during install
PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true npm install

# Then install Chromium manually
npx puppeteer browsers install chrome
```

### Permission Errors

**Problem**: "EACCES: permission denied"

**Solution**:
```bash
# Ensure output directory exists and is writable
mkdir -p ./images
chmod 755 ./images

# Or run with proper permissions
sudo node svg-to-png.js input.svg output.png  # Not recommended
```

### Large SVG Files

**Problem**: Browser timeout for complex SVGs

**Solution**: The tool has 30-second timeouts. For very complex SVGs, consider:
- Simplifying the SVG
- Using ImageMagick instead: `convert input.svg output.png`
- Increasing timeouts in `lib/puppeteer-helper.js`

### Output is Blank

**Problem**: PNG is generated but appears blank

**Solutions**:
1. Check if SVG has valid viewBox: `grep viewBox input.svg`
2. Verify SVG renders in browser: `open input.svg`
3. Check for external dependencies (fonts, images)
4. Ensure SVG is not corrupted

## Use Cases

### Documentation Sites

Generate PNG images for documentation that will be viewed on multiple platforms:

```bash
# Convert all architecture diagrams
node svg-to-png.js ./docs/diagrams/
```

### Presentations

Export diagrams as PNG for PowerPoint/Keynote:

```bash
node svg-to-png.js flowchart.svg presentation/slide-5.png
```

### GitHub Wikis

Some GitHub wikis don't render SVG well - use PNG instead:

```bash
node svg-to-png.js diagram.svg wiki/images/diagram.png
```

### Email Newsletters

Email clients often don't support SVG - convert to PNG:

```bash
node svg-to-png.js newsletter-diagram.svg assets/diagram.png
```

## Dependencies

This skill depends on:

**Required:**
- Node.js >= 16.0.0
- npm >= 8.0.0
- Puppeteer ^21.0.0 (installs Chromium)

**Included:**
- `lib/security.js` - Path validation helpers
- `lib/puppeteer-helper.js` - Secure browser launch

## Related Skills

- **[diagramming](../diagramming/README.md)** - Generate SVG diagrams (Mermaid, Graphviz)
- **[markdown-editor](../markdown-editor/README.md)** - Create markdown with diagram images

## Examples

### Example 1: Simple Conversion

```bash
echo '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="blue"/></svg>' > circle.svg
node svg-to-png.js circle.svg circle.png
```

### Example 2: Workflow Integration

```bash
#!/bin/bash
# generate-docs.sh - Convert all diagrams and build docs

# Step 1: Render DOT files to SVG
for dot in diagrams/*.dot; do
    node ~/.claude/skills/diagramming/dot/render-dot.js "$dot" "${dot%.dot}.svg"
done

# Step 2: Convert all SVG to PNG
node ~/.claude/skills/svg-to-png/svg-to-png.js diagrams/

# Step 3: Clean up SVG files
rm diagrams/*.svg

# Step 4: Build documentation
mkdocs build
```

### Example 3: Automated CI/CD

```yaml
# .github/workflows/docs.yml
- name: Convert diagrams
  run: |
    npm install -g puppeteer
    node ~/.claude/skills/svg-to-png/svg-to-png.js ./docs/images/
```

## License

MIT - Same as the agent-marketplace repository.
