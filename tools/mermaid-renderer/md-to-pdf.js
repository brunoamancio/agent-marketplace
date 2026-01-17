#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { validateOutputPath } = require('../lib/security');
const { launchSecureBrowser, createSecurePage } = require('../lib/puppeteer-helper');

async function mdToPdf(mdPath, pdfPath) {
  try {
    // Validate input and output paths to prevent path traversal
    const validatedMdPath = validateOutputPath(mdPath, process.cwd());
    const validatedPdfPath = validateOutputPath(pdfPath, process.cwd());

    const mdDir = path.dirname(validatedMdPath);
    const htmlPath = path.join('/tmp', `temp-doc-${Date.now()}.html`);

    // Convert markdown to HTML using pandoc (using execFileSync to prevent command injection)
    // execFileSync doesn't use a shell, so no command injection is possible
    try {
      execFileSync('pandoc', [
        validatedMdPath,
        '-o', htmlPath,
        '--standalone',
        '--embed-resources'
      ], {
        encoding: 'utf-8',
        cwd: mdDir,
        timeout: 60000, // 60 second timeout
        maxBuffer: 10 * 1024 * 1024 // 10MB buffer
      });
    } catch (error) {
      throw new Error(`Pandoc conversion failed: ${error.message}`);
    }

    // Launch secure browser with timeouts and resource limits
    const browser = await launchSecureBrowser({ timeout: 30000 });
    const page = await createSecurePage(browser, {
      pageTimeout: 15000,
      navTimeout: 30000
    });

    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    await page.pdf({
      path: validatedPdfPath,
      format: 'A4',
      margin: { top: '1cm', right: '1cm', bottom: '1cm', left: '1cm' },
      printBackground: true
    });

    await browser.close();

    // Clean up temporary HTML file
    try {
      fs.unlinkSync(htmlPath);
    } catch (error) {
      // Ignore cleanup errors
    }

    console.log(`PDF generated: ${validatedPdfPath}`);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

mdToPdf(process.argv[2], process.argv[3]);
