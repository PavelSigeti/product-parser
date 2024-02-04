import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer';

export const citilinkImg = async (link) => {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36');
    await page.setViewport({ width: 1920, height: 1080 });

    await page.goto(link, { waitUntil: 'networkidle0' });


    const selector = '[data-meta-name="ImageGallery__main"]'; 
    await page.waitForSelector(selector, { visible: true });

    await page.click('[data-meta-name="ImageGallery__main"]');

    const html = await page.content();

    await browser.close();

    return html;
};