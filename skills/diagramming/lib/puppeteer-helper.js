const puppeteer = require('puppeteer');

/**
 * Launches Puppeteer with security and resource limits
 */
async function launchSecureBrowser(options = {}) {
  return await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage', // Overcome limited resource problems
      '--disable-gpu'
    ],
    timeout: options.timeout || 30000,
    ...options
  });
}

/**
 * Creates page with security settings and timeouts
 */
async function createSecurePage(browser, options = {}) {
  const page = await browser.newPage();
  await page.setDefaultTimeout(options.pageTimeout || 15000);
  await page.setDefaultNavigationTimeout(options.navTimeout || 30000);

  // Disable unnecessary features
  await page.setJavaScriptEnabled(options.enableJS !== false);

  return page;
}

/**
 * Wraps render function with timeout
 */
async function renderWithTimeout(renderFn, timeoutMs = 30000) {
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error(`Render timeout after ${timeoutMs}ms`)), timeoutMs)
  );

  try {
    return await Promise.race([renderFn(), timeoutPromise]);
  } catch (error) {
    throw new Error(`Render failed: ${error.message}`);
  }
}

module.exports = { launchSecureBrowser, createSecurePage, renderWithTimeout };
