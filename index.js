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
    console.log("Is visible", screenshot.waitForSelector);

    await page.evaluate((pageY) => {
      window.scrollBy(0, pageY);
    }, screenshot.scrollY);
    const image = await page.screenshot({ type: "jpeg", quality: 100 });
    console.log("Made screenshot");

    const filename = `${chosenScreenshot}-${new Date().toISOString()}`

    result = {
      statusCode: 200,
      headers: {
        "Content-Type": "image/jpeg",
        'Content-Disposition': `attachment; filename="${filename}.jpeg"`,
      },
      body: image.toString("base64"),
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
