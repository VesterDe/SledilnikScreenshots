const chromium = require("chrome-aws-lambda");
const screenshots = require("./screenshots");

const handler = async (event, context, callback) => {
  let result = "result";
  let browser;
  const screenshot = screenshots.home;
  try {
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });
    const page = await browser.newPage();
    await page.setViewport({
      width: screenshot.pageWidth,
      height: screenshot.pageHeight,
    });
    await page.goto(screenshot.url);
    await page.waitUntilVisible(screenshot.waitForSelector, 5000);
    const image = await page.screenshot({ type: "jpeg" });
    result = {
      statusCode: 200,
      headers: {
        "Content-Type": "image/jpeg",
      },
      body: image,
      isBase64Encoded: true,
    };
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
