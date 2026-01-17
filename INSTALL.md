# Installation Guide

Complete installation instructions for the Diagramming Skills plugin.

## Method 1: Claude Code Marketplace (Recommended)

The easiest way to install is through Claude Code's plugin marketplace system.

### Step 1: Add the Marketplace

In Claude Code, run:
```
/plugin marketplace add brunoamancio/agent-marketplace
```

Or if you have the repo locally:
```
/plugin marketplace add /path/to/agent-marketplace
```

### Step 2: List Available Plugins

```
/plugin list
```

You should see `diagramming@agent-marketplace` in the list.

### Step 3: Install the Plugin

```
/plugin install diagramming@agent-marketplace
```

### Step 4: Install Node Dependencies

The rendering tools require Node.js dependencies:

```bash
# Navigate to the installed plugin location
cd ~/.claude/plugins/diagramming-*/skills/diagramming/mermaid
npm install

cd ../dot
npm install
```

### Step 5: Verify Installation

Ask Claude to create a diagram:
```
Create a simple flowchart showing A -> B -> C
```

If the skill loads successfully, you're ready to go! 🎉

---

## Method 2: Manual Installation

If you prefer manual installation or want to develop/customize the skill:

### Step 1: Clone the Repository

```bash
git clone https://github.com/brunoamancio/agent-marketplace.git
cd agent-marketplace
```

### Step 2: Copy Skill to Claude Code

```bash
# Copy the diagramming skill
cp -r skills/diagramming ~/.claude/skills/

# Or create a symlink for development
ln -s $(pwd)/skills/diagramming ~/.claude/skills/diagramming
```

### Step 3: Install Dependencies

```bash
# Install Mermaid renderer dependencies
cd ~/.claude/skills/diagramming/mermaid
npm install

# Install DOT renderer dependencies
cd ~/.claude/skills/diagramming/dot
npm install
```

### Step 4: Verify Installation

Start Claude Code and ask it to create a diagram. The skill should be automatically discovered and loaded.

---

## Method 3: Team/Organization Deployment

For teams, you can configure Claude Code to automatically install the skill for all members.

### Step 1: Create Shared Configuration

In your team's shared `.claude/settings.json`:

```json
{
  "extraKnownMarketplaces": {
    "agent-marketplace": {
      "source": {
        "source": "github",
        "repo": "brunoamancio/agent-marketplace"
      }
    }
  },
  "enabledPlugins": {
    "diagramming@agent-marketplace": true
  }
}
```

### Step 2: Distribute Configuration

Team members will be prompted to install the marketplace and plugin when they start Claude Code.

---

## Requirements

### System Requirements
- **Node.js:** >= 16.0.0
- **npm:** >= 8.0.0
- **Claude Code:** Latest version

### Optional (for DOT/Graphviz rendering)
- **Graphviz:** System installation (handled by npm package `node-graphviz`)

---

## Post-Installation Setup

### Configure Export Tools (Optional)

If you plan to export diagrams to PNG/SVG:

1. The tools are located in:
   - `~/.claude/skills/diagramming/mermaid/` (Mermaid → PNG)
   - `~/.claude/skills/diagramming/dot/` (DOT → SVG)

2. You can create shell aliases for convenience:
   ```bash
   # Add to ~/.bashrc or ~/.zshrc
   alias mermaid-export="node ~/.claude/skills/diagramming/mermaid/process-document.js"
   alias dot-export="node ~/.claude/skills/diagramming/dot/process-document.js"
   ```

3. Usage examples:
   ```bash
   # Export Mermaid diagrams
   mermaid-export README.md --verbose

   # Export DOT diagrams
   dot-export architecture.md --layout=neato
   ```

---

## Troubleshooting

### Skill Not Loading

**Problem:** Claude doesn't recognize diagram requests.

**Solutions:**
1. Verify skill is in the correct location:
   ```bash
   ls -la ~/.claude/skills/diagramming/SKILL.md
   ```
2. Restart Claude Code
3. Check Claude Code logs for errors

### Puppeteer/Chrome Issues

**Problem:** "Could not find Chrome" when exporting diagrams.

**Solutions:**
1. Ensure dependencies are installed:
   ```bash
   cd ~/.claude/skills/diagramming/mermaid
   npm install
   ```
2. Puppeteer will download Chromium automatically
3. If issues persist, install Chromium manually:
   ```bash
   npm install -g puppeteer
   ```

### Permission Errors

**Problem:** Permission denied when running export tools.

**Solutions:**
1. Make scripts executable:
   ```bash
   chmod +x ~/.claude/skills/diagramming/mermaid/*.js
   chmod +x ~/.claude/skills/diagramming/dot/*.js
   ```
2. Or always run with `node`:
   ```bash
   node ~/.claude/skills/diagramming/mermaid/render-mermaid.js ...
   ```

### npm audit Warnings

**Problem:** npm shows vulnerabilities during installation.

**Solution:** This fork has been security-hardened with 0 vulnerabilities. If you see warnings:
1. Make sure you're using the latest version from this repository
2. Run `npm audit fix` if needed
3. See [SECURITY.md](SECURITY.md) for security details

---

## Updating

### Via Marketplace

```bash
/plugin marketplace update
/plugin update diagramming@agent-marketplace
```

### Manual Update

```bash
cd agent-marketplace
git pull origin main

# Re-copy or re-link
cp -r skills/diagramming ~/.claude/skills/
# Re-install dependencies if needed
```

---

## Uninstallation

### Via Marketplace

```
/plugin uninstall diagramming@agent-marketplace
```

### Manual Removal

```bash
rm -rf ~/.claude/skills/diagramming
```

---

## Next Steps

- Read the [README.md](README.md) for feature overview
- Check out [SECURITY.md](SECURITY.md) for security improvements
- Review diagram type guides in `skills/diagramming/`
- Explore SKILL.md files in each skill directory for detailed documentation

**Ready to create diagrams!** 🎨
