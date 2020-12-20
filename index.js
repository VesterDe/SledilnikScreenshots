const chromium = require("chrome-aws-lambda");
const screenshots = require("./screenshots");

const handler = async (event, context, callback) => {
  if (!event.queryStringParameters) {
    return callback(undefined, "No target");
  }

  const chosenScreenshot = event.queryStringParameters.screen;

  if (!Object.keys(screenshots).includes(chosenScreenshot)) {
    return callback(undefined, "No such target");
  }
  console.log("Chosen target is", chosenScreenshot);
  let result, browser;

  const screenshot = screenshots[chosenScreenshot];
  try {
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });
    console.log("Made browser");
    const page = await browser.newPage();
    console.log("Made Page");
    await page.setViewport({
      width: screenshot.pageWidth,
      height: screenshot.pageHeight,
    });
    console.log("Set viewport");
    await page.goto(screenshot.url);
    console.log("Went to ", screenshot.url);
    await page.waitUntilVisible(screenshot.waitForSelector, 5000);
    await page.evaluate((pageY) => {
      window.scrollBy(0, pageY);
    }, screenshot.scrollY);
    console.log("Is visible", screenshot.waitForSelector);
    const image = await page.screenshot({ type: "jpeg" });
    console.log("Made screenshot");
    result = {
      statusCode: 200,
      headers: {
        "Content-Type": "image/jpeg",
      },
      body: image.toString("base64"),
      isBase64Encoded: true,
    };
  } catch (error) {
    console.log("ERROR", error);
    return callback(error);
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }

  console.log("Result", result);

  return callback(null, result);
};

module.exports = { handler };
