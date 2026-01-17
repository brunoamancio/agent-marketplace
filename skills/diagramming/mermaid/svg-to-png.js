const fs = require('fs');
const path = require('path');
const { validateOutputPath } = require('../lib/security');
const { launchSecureBrowser, createSecurePage } = require('../lib/puppeteer-helper');

async function convertSvgToPng(svgPath, pngPath) {
  // Validate paths to prevent path traversal attacks
  const validatedSvgPath = validateOutputPath(svgPath, process.cwd());
  const validatedPngPath = validateOutputPath(pngPath, process.cwd());

  const svgContent = fs.readFileSync(validatedSvgPath, 'utf-8');

  // Extract viewBox dimensions
  const viewBoxMatch = svgContent.match(/viewBox="([^"]+)"/);
  let width = 1200, height = 800;
  if (viewBoxMatch) {
    const parts = viewBoxMatch[1].split(/\s+/).map(Number);
    width = parts[2] + 16;
    height = parts[3] + 16;
  }

  // Launch secure browser with timeouts and resource limits
  const browser = await launchSecureBrowser({ timeout: 30000 });
  const page = await createSecurePage(browser, {
    pageTimeout: 15000,
    navTimeout: 30000
  });

  await page.setViewport({ width: Math.ceil(width), height: Math.ceil(height), deviceScaleFactor: 2 });

  const html = '<!DOCTYPE html><html><head><style>body { margin: 0; padding: 0; background: white; }</style></head><body>' + svgContent + '</body></html>';

  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.screenshot({ path: validatedPngPath, fullPage: true });
  await browser.close();

  console.log('Converted: ' + path.basename(validatedSvgPath) + ' -> ' + path.basename(validatedPngPath));
}

async function main() {
  const arg1 = process.argv[2];
  const arg2 = process.argv[3];

  if (!arg1) {
    console.error('Usage:');
    console.error('  svg-to-png.js <input.svg> <output.png>    # Convert single file');
    console.error('  svg-to-png.js <directory>                 # Convert all SVG files in directory');
    process.exit(1);
  }

  // Validate input path
  const validatedPath = validateOutputPath(arg1, process.cwd());

  // Check if it's a directory or file
  const stats = fs.statSync(validatedPath);

  if (stats.isDirectory()) {
    // Directory mode: convert all SVG files
    const files = fs.readdirSync(validatedPath).filter(f => f.endsWith('.svg'));

    for (const file of files) {
      // Sanitize filename to prevent directory traversal in filenames
      const sanitizedFile = path.basename(file);
      const svgPath = path.join(validatedPath, sanitizedFile);
      const pngPath = path.join(validatedPath, sanitizedFile.replace('.svg', '.png'));

      try {
        await convertSvgToPng(svgPath, pngPath);
      } catch (error) {
        console.error(`Error converting ${sanitizedFile}:`, error.message);
      }
    }
  } else {
    // File mode: convert single file
    const svgPath = validatedPath;
    const pngPath = arg2 ? validateOutputPath(arg2, process.cwd()) : svgPath.replace('.svg', '.png');

    try {
      await convertSvgToPng(svgPath, pngPath);
    } catch (error) {
      console.error(`Error converting ${path.basename(svgPath)}:`, error.message);
      process.exit(1);
    }
  }
}

if (require.main === module) {
  main().catch(error => {
    console.error('Error:', error.message);
    process.exit(1);
  });
}

module.exports = { convertSvgToPng };
