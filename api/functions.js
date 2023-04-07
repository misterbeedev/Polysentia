const puppeteer = require('puppeteer-core');

const TOKENS = ['b58a22ee-438c-4427-b96b-d5e456bdf47e'];

async function scrape(prompt) {
  const token = TOKENS[Math.floor(Math.random() * TOKENS.length)];
  const url = `https://gptgo.ai/?q=${prompt}`;

  const browser = await puppeteer.connect({
    browserWSEndpoint: `wss://chrome.browserless.io?token=${token}`,
  });
  const page = await browser.newPage();

  await page.goto(url);
  await page.waitForFunction(
    () => document.querySelector('#ai-result').textContent.trim().length > 0
  );

  const result = await page.$eval('#ai-result', (element) =>
    element.innerHTML.trim()
  );

  await browser.close();

  const data = { prompt: prompt, result: result };
  return JSON.stringify(data);
}

module.exports = { scrape };
