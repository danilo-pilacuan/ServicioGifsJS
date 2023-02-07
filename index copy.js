const fs = require('fs');
const puppeteer = require('puppeteer');

const GIFEncoder = require('gifencoder');
const PNG = require('png-js');

function decode(png) {
  return new Promise(r => {png.decode(pixels => r(pixels))});
}

async function gifAddFrame(page, encoder) {
  const pngBuffer = await page.screenshot({ clip: { width: 1024, height: 768, x: 0, y: 0 } });
  const png = new PNG(pngBuffer);
  await decode(png).then(pixels => encoder.addFrame(pixels));
}

(async () => {
  const browser = await puppeteer.launch({
    headless: true, slowMo: 0,
  });
  const page = await browser.newPage();
  page.setViewport({width: 1024, height: 768});
  await page.goto('https://en.wikichip.org/wiki/WikiChip', {
    waitUntil: ['networkidle0']
  });

  // record gif
  var encoder = new GIFEncoder(1024, 768);
  encoder.createWriteStream()
    .pipe(fs.createWriteStream('test.gif'));

  // setting gif encoder  
  encoder.start();
  encoder.setRepeat(0);
  encoder.setDelay(150);
  encoder.setQuality(10); // default

  for (let i = 0; i < 10; i++) {
    await gifAddFrame(page, encoder);
  }
  
  // finish encoder, test.gif saved   
  encoder.finish();

  await browser.close();
})();