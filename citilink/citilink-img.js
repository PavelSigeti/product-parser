import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer';

export const citilinkImg = async (link) => {
    // const browser = await puppeteer.launch();
    const browser = await puppeteer.launch({executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox', '--disable-setuid-sandbox']});

    const page = await browser.newPage();

    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36');
    await page.setViewport({ width: 1920, height: 1080 });

    page.setDefaultNavigationTimeout(0);

    await page.goto(link, { waitUntil: 'networkidle0' });

    const selector = '[data-meta-name="ImageGallery__main"]'; 
    await page.waitForSelector(selector, { visible: true });

    await page.click('[data-meta-id="GallerySlide_0"]');

    const selector2 = '[data-meta-name="PopupImageGallery"]'; 
    await page.waitForSelector(selector2, { visible: true });

    const html = await page.content();

    await browser.close();

    return html;
};