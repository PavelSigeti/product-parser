import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer';

export const mvideoImg = async (link) => {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0');
    await page.setViewport({ width: 1920, height: 1080 });

    page.setDefaultNavigationTimeout(0);

    await page.goto(link, { waitUntil: 'networkidle0' });

    const selector = '.product-carousel__preview'; 
    await page.waitForSelector(selector, { visible: true });

    const html = await page.content();

    await browser.close();

    return html;
};