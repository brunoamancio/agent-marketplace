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

**Quick usage:**
```
"Create a flowchart showing the user authentication process"
"Draw a sequence diagram for the checkout API"
"Generate a system architecture diagram for microservices"
```

**Documentation:** [skills/diagramming/README.md](skills/diagramming/README.md)

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

---

**🛡️ Security-hardened • 🎨 Professional • 📚 Well-documented**
