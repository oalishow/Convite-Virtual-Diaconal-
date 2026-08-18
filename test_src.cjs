const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 8000 });
  await page.goto('http://localhost:3000');
  
  await new Promise(r => setTimeout(r, 4000));
  
  const src = await page.evaluate(() => {
     let imgs = document.querySelectorAll('#pixKeyContainer img');
     let res = [];
     imgs.forEach(img => {
        if(img.alt.includes('QR')) {
           res.push(img.src.substring(0, 50));
        }
     });
     return res;
  });
  console.log("Sources:", src);

  await browser.close();
})();
