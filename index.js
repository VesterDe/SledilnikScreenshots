const chromium = require('chrome-aws-lambda');
const express = require('express')
const app = express()

export const handler = async () => {
  let result = 'result';
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
    await page.goto('https://covid-19.sledilnik.org/')
    const screenshot = await page.screenshot()
    return screenshot

    // all your puppeteer things
  } catch (error) {
    console.log(error);
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }
};

app.get('/', async function (req, res) {
  const screenshot = await handler()
  res.writeHead(200,{'content-type':'image/jpg'});
  res.write(screenshot);
  return res.end()
})

app.listen(80)