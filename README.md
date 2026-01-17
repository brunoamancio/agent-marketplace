# Agent Marketplace

Professional skills and tools for Claude Code agents.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## About

This marketplace provides high-quality, production-ready skills for Claude Code. All skills are security-hardened, well-documented, and designed for professional use.

## Quick Start

### Install the Marketplace

```bash
# Add this marketplace to Claude Code
/plugin marketplace add brunoamancio/agent-marketplace

# List available skills
/plugin list
```

## Available Skills

### Diagramming

Professional diagram generation with Mermaid and DOT/Graphviz support.

[![Security](https://img.shields.io/badge/security-hardened-brightgreen)](SECURITY.md)
[![Vulnerabilities](https://img.shields.io/badge/npm%20audit-0%20vulnerabilities-brightgreen)](SECURITY.md)

**Features:**
- 20+ diagram types (flowcharts, sequence, class, ER, state, Gantt, architecture)
- DOT/Graphviz for network graphs and semantic webs
- Security-hardened rendering tools (0 vulnerabilities)
- Semantic color palette (WCAG AA accessible)
- PNG/SVG export with document processing

**Installation:**
```bash
/plugin install diagramming@agent-marketplace
```

*Also installs: `svg-to-png`*

**Quick usage:**
```
"Create a flowchart showing the user authentication process"
"Draw a sequence diagram for the checkout API"
"Generate a system architecture diagram for microservices"
```

**Documentation:** [skills/diagramming/README.md](skills/diagramming/README.md)

---

### SVG to PNG

Convert SVG files to high-quality PNG images using headless browser rendering.

**Features:**
- High-resolution output (2x device scale factor)
- Automatic dimension detection from SVG viewBox
- Security-hardened conversion with path validation
- Batch processing for entire directories

**Installation:**
```bash
/plugin install svg-to-png@agent-marketplace
cd ~/.claude/skills/svg-to-png && npm install
```

**Quick usage:**
```bash
# Convert single file
node ~/.claude/skills/svg-to-png/svg-to-png.js input.svg output.png

# Convert all SVG files in directory
node ~/.claude/skills/svg-to-png/svg-to-png.js ./images/
```

**Use cases:**
- Convert Graphviz/DOT diagrams to PNG
- Generate PNG images for markdown compatibility
- Export diagrams for presentations and documentation
- Create images for platforms that don't support SVG

**Documentation:** [skills/svg-to-png/README.md](skills/svg-to-png/README.md)

---

### Markdown Editor

Professional markdown editing with automatic diagram-to-image conversion.

**Features:**
- Diagram-to-PNG conversion for maximum compatibility
- Automatic markdown formatting enforcement
- ASCII art replacement with proper diagrams
- Hybrid approach: support both live diagrams and static images

**Installation:**
```bash
/plugin install markdown-editor@agent-marketplace
```

*Also installs: `diagramming`, `svg-to-png`*

**Quick usage:**
```
"Convert this markdown file's Mermaid diagrams to PNG images"
"Fix markdown formatting and ensure proper blank lines"
"Replace ASCII art diagrams with Mermaid equivalents"
```

**Use cases:**
- Generate PNG images from diagrams for wikis and documentation
- Export-ready markdown (PDF, presentations)
- Maximum compatibility across all markdown renderers
- Accessibility improvements with proper alt text

**Documentation:** [skills/markdown-editor/README.md](skills/markdown-editor/README.md)

---

## Manual Installation

If you prefer to install skills manually:

```bash
# Clone the repository
git clone https://github.com/brunoamancio/agent-marketplace.git

# Copy a skill to Claude Code
cp -r agent-marketplace/skills/diagramming ~/.claude/skills/

# Install dependencies (if required by the skill)
cd ~/.claude/skills/diagramming/mermaid && npm install
cd ~/.claude/skills/diagramming/dot && npm install
```

## Requirements

- **Node.js:** >= 16.0.0 (for diagramming skill)
- **npm:** >= 8.0.0 (for diagramming skill)
- **Claude Code:** Latest version

## Credits

**Diagramming skill** inspired by **Kurt Cagle's** approach to data visualization and semantic graphs:
- [The Ontologist (Substack)](https://ontologist.substack.com/)
- [RDF, Graphs and Mermaid Diagrams](https://www.linkedin.com/pulse/rdf-graphs-mermaid-diagrams-kurt-cagle-jqrac)

Based on [sparkling/claude-config](https://github.com/sparkling/claude-config) with security hardening and restructuring.

## License

MIT - See [LICENSE](LICENSE) file for details.

## Contributing

Issues and pull requests welcome! Whether you want to improve existing skills or contribute new ones.