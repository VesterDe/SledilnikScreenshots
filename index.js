const chromium = require("chrome-aws-lambda");
const screenshots = require('./screenshots')

const handler = async (event, context, callback) => {
  let result = "result";
  let browser;
  const screenshot = screenshots.home
  try {
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });
    const page = await browser.newPage();
    page.setViewport({ width: screenshot.pageWidth, height: screenshot.pageHeight })
    await page.goto(screenshot.url);
    await page.waitUntilVisible(screenshot.waitforSelector, 5000)
    const image = await page.screenshot({ type: 'jpeg' });
    result = screenshot.createResponse(image);

    // all your puppeteer things
  } catch (error) {
    return callback(error);
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }

  return callback(null, result);
};

module.exports = { handler };
