const puppeteer = require('puppeteer');

async function run(id) {
    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    let url = 'https://www.chess.ca/en/ratings/p/?id='+id;
    await page.goto(url);
    await page.waitForSelector('.ws-bg-highlight',{timeout:6000});
    const title = await page.evaluate(() => document.querySelector('.ws-bg-highlight td:nth-child(5)').textContent);
    await browser.close();
    return title;
  }
  module.exports = run;