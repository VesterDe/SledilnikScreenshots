const chromium = require("chrome-aws-lambda");

const handler = async (event, context, callback) => {
  let result = "result";
  let browser;

  try {
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });
    const page = await browser.newPage();
    await page.goto("https://covid-19.sledilnik.org/");
    await page.waitUntilVisible('.card-number', 5000)
    const image = await page.screenshot();
    result = {
      statusCode: 200,
      headers: {
        "Content-Type": "image/png",
      },
      body: image.toString("base64"),
      isBase64Encoded: true,
    };

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
