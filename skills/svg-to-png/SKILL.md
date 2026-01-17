---
name: svg-to-png
description: Convert SVG files to high-quality PNG images using headless browser rendering. Provides security-hardened conversion with path validation and resource limits.
---

# SVG to PNG Converter Skill

Convert SVG files to PNG images with proper dimension handling and high-resolution output.

**Note:** Both Mermaid and Graphviz now support direct PNG rendering. This skill is primarily for converting existing SVG files or when working with SVG sources from other tools.

## Usage

This skill provides a conversion tool that can be invoked via Bash:

```bash
# Convert single file
node ~/.claude/skills/svg-to-png/svg-to-png.js input.svg output.png

# Convert all SVG files in a directory
node ~/.claude/skills/svg-to-png/svg-to-png.js ./images/

# Auto-detect output filename
node ~/.claude/skills/svg-to-png/svg-to-png.js diagram.svg
# Creates: diagram.png
```

## When to Use

Use this skill when you need to:
- Convert vector diagrams (SVG) to raster images (PNG)
- Generate PNG images from SVG for markdown compatibility
- Create images for platforms that don't support SVG
- Export diagrams for presentations, PDFs, or documentation

## Features

- **High Resolution**: 2x device scale factor for crisp images
- **Dimension Detection**: Automatically extracts SVG viewBox dimensions
- **Security Hardened**: Path validation prevents traversal attacks
- **Batch Processing**: Convert entire directories of SVG files
- **Puppeteer-Based**: Uses headless Chrome for accurate rendering

## Output Quality

- **Resolution**: 2x device pixel ratio (Retina quality)
- **Format**: PNG with transparency support
- **Accuracy**: Pixel-perfect rendering using Chrome's SVG engine
- **Dimensions**: Auto-calculated from SVG viewBox with 16px padding

## Common Use Cases

### 1. Converting Existing SVG Files

Convert pre-existing SVG files to PNG:

```bash
# Convert an existing SVG file
node ~/.claude/skills/svg-to-png/svg-to-png.js existing-diagram.svg ./images/diagram.png

# Reference in markdown
# ![Architecture diagram](./images/diagram.png)
```

**Note:** For new diagrams, use direct PNG rendering:
```bash
# Mermaid: render directly to PNG
node ~/.claude/skills/diagramming/mermaid/render-mermaid.js diagram.mmd diagram.png

# Graphviz: render directly to PNG
node ~/.claude/skills/diagramming/dot/render-dot.js graph.dot graph.png
```

### 2. Batch Conversion

Convert all SVG files in a directory:

```bash
# Convert all diagrams in ./diagrams/ folder
node ~/.claude/skills/svg-to-png/svg-to-png.js ./diagrams/

# Creates PNG for each SVG:
# ./diagrams/diagram1.svg -> ./diagrams/diagram1.png
# ./diagrams/diagram2.svg -> ./diagrams/diagram2.png
```

### 3. Presentation Materials

Export SVG diagrams as PNG for slides:

```bash
node ~/.claude/skills/svg-to-png/svg-to-png.js flowchart.svg presentation/flowchart.png
```

## Technical Details

### Rendering Process

1. **Load SVG**: Read SVG file contents
2. **Parse Dimensions**: Extract viewBox or width/height attributes
3. **Launch Browser**: Start headless Chrome with security limits
4. **Render**: Embed SVG in HTML page with white background
5. **Screenshot**: Capture full page at 2x resolution
6. **Save**: Write PNG file to specified output path

### Security Features

- Path validation to prevent directory traversal
- Timeouts on browser operations (30s browser, 15s page)
- Resource limits via secure Puppeteer helpers
- Input sanitization for file paths

### Dependencies

Requires Node.js packages:
- `puppeteer` - Headless Chrome automation
- Security helpers (included in `lib/`)

Install dependencies:
```bash
cd ~/.claude/skills/svg-to-png
npm install
```

## See Also

- **diagramming** skill - Generate SVG diagrams (depends on svg-to-png)
- **markdown-editor** skill - Create markdown with PNG images (depends on svg-to-png)

## API

Can be used programmatically:

```javascript
const { convertSvgToPng } = require('./svg-to-png.js');

await convertSvgToPng('input.svg', 'output.png');
```

## Limitations

- Requires Node.js and npm
- Uses Chromium (downloaded by Puppeteer)
- Not suitable for server-side bulk conversion (use ImageMagick/inkscape instead)
- Best for occasional conversions during documentation workflows
