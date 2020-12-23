const screenshots = require("./screenshots");
const puppeteer = require("puppeteer");
const fs = require('fs')

async function run() {

  const chosenScreenshot = 'homeTop5Cards'

  const browser = await puppeteer.launch({
    headless: true,
    ignoreHTTPSErrors: true,
  });

  const screenshot = screenshots[chosenScreenshot];

  const page = await browser.newPage();
  console.log("Made Page");

  await page.setViewport({
    width: screenshot.pageWidth,
    height: screenshot.pageHeight,
    deviceScaleFactor: 2
  });
  console.log("Set viewport");

  await page.goto(screenshot.url);
  console.log("Went to ", screenshot.url);

  await page.waitForSelector(screenshot.waitForSelector, 5000);
  console.log("Is visible", screenshot.waitForSelector);

  await page.evaluate((pageY) => {
    window.scrollBy(0, pageY);
  }, screenshot.scrollY);

  if(screenshot.beforeShot){
    await page.evaluate(screenshot.beforeShot)
    await page.waitForTimeout(3000)
  }
  const image = await page.screenshot({ type: "png" });
  console.log("Made screenshot");

  const filename = `${new Date().toISOString()}---${chosenScreenshot}.png`;
  console.log("Filename is ", filename);

  fs.writeFileSync(filename, image)
  return browser.close()
}
run();
