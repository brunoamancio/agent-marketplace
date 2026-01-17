---
name: svg-to-png
description: Convert SVG files to high-quality PNG images using headless browser rendering. Provides security-hardened conversion with path validation and resource limits.
---

# SVG to PNG Converter Skill

Convert SVG files to PNG images with high-resolution output.

**Note:** Both Mermaid and Graphviz support direct PNG rendering. Use this skill primarily for converting existing SVG files or SVG from other tools.

## Usage

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

- Convert existing SVG files to PNG
- Generate PNG images for markdown compatibility
- Create images for platforms that don't support SVG
- Export diagrams for presentations, PDFs, or documentation

**For new diagrams**, use direct PNG rendering:
```bash
# Mermaid: render directly to PNG
node ~/.claude/skills/diagramming/mermaid/render-mermaid.js diagram.mmd diagram.png

# Graphviz: render directly to PNG
node ~/.claude/skills/diagramming/dot/render-dot.js graph.dot graph.png
```

## Output Quality

- **Resolution**: 2x device pixel ratio (Retina quality)
- **Format**: PNG with transparency support
- **Dimensions**: Auto-calculated from SVG viewBox with 16px padding

## Common Use Cases

### Converting Existing SVG Files

```bash
node ~/.claude/skills/svg-to-png/svg-to-png.js existing-diagram.svg ./images/diagram.png
```

### Batch Conversion

```bash
# Convert all diagrams in ./diagrams/ folder
node ~/.claude/skills/svg-to-png/svg-to-png.js ./diagrams/

# Creates PNG for each SVG:
# ./diagrams/diagram1.svg -> ./diagrams/diagram1.png
# ./diagrams/diagram2.svg -> ./diagrams/diagram2.png
```

### Presentation Materials

```bash
node ~/.claude/skills/svg-to-png/svg-to-png.js flowchart.svg presentation/flowchart.png
```

## See Also

- **diagramming** skill - Generate SVG/PNG diagrams
- **markdown-editor** skill - Create markdown with PNG images
