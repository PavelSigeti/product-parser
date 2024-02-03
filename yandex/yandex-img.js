import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer';

export const yandexImg = async () => {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36');
    await page.setViewport({ width: 1920, height: 1080 });

    await page.goto('https://price.ru/stiralnye-mashiny/korting-kwm-42ls1267/', { waitUntil: 'networkidle0' });

    // const selector = '._34ccC'; 
    // await page.waitForSelector(selector, { visible: true });
    await new Promise(resolve => setTimeout(resolve, 30000));

    const html = await page.content();

    await browser.close();

    return html;
};