import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');
  
  await new Promise(r => setTimeout(r, 4000));
  
  // Create a fake prayer if none exists
  await page.evaluate(() => {
     const feedContainer = document.getElementById('prayersFeed');
     feedContainer.innerHTML = `
        <div class="prayer-card-item">
          <div class="prayer-card-header" style="margin-bottom: 0.4rem; display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center;">
              <span class="prayer-author">Test</span>
            </div>
            <button class="test-like-btn" style="background:none; border:none; cursor:pointer; display:flex; align-items:center; gap:0.3rem; color:red;">
              <svg id="test-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              <span id="test-span" style="font-size: 0.8rem; font-weight: 600;">0</span>
            </button>
          </div>
        </div>
     `;
  });

  const buttonStyle = await page.evaluate(() => {
    const btn = document.querySelector('.test-like-btn');
    const svg = document.querySelector('#test-svg');
    const span = document.querySelector('#test-span');
    return {
      btn: {
        display: getComputedStyle(btn).display,
        visibility: getComputedStyle(btn).visibility,
        opacity: getComputedStyle(btn).opacity
      },
      svg: {
        display: getComputedStyle(svg).display,
        visibility: getComputedStyle(svg).visibility,
        opacity: getComputedStyle(svg).opacity
      },
      span: {
        display: getComputedStyle(span).display,
        visibility: getComputedStyle(span).visibility,
        opacity: getComputedStyle(span).opacity
      }
    };
  });
  console.log('Styles:', JSON.stringify(buttonStyle, null, 2));

  await browser.close();
})();
