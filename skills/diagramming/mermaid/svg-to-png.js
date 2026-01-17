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
  const dir = process.argv[2];

  if (!dir) {
    console.error('Usage: svg-to-png.js <directory>');
    process.exit(1);
  }

  // Validate directory path
  const validatedDir = validateOutputPath(dir, process.cwd());

  const files = fs.readdirSync(validatedDir).filter(f => f.endsWith('.svg'));

  for (const file of files) {
    // Sanitize filename to prevent directory traversal in filenames
    const sanitizedFile = path.basename(file);
    const svgPath = path.join(validatedDir, sanitizedFile);
    const pngPath = path.join(validatedDir, sanitizedFile.replace('.svg', '.png'));

    try {
      await convertSvgToPng(svgPath, pngPath);
    } catch (error) {
      console.error(`Error converting ${sanitizedFile}:`, error.message);
    }
  }
}

main().catch(error => {
  console.error('Error:', error.message);
  process.exit(1);
});
