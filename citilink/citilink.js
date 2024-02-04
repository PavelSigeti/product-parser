import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer';
import {stiralnye_mashiny} from './stiralnye-mashiny.js';

export const citilink = async (link, slug) => {
    const type = slug.replaceAll('-', '_');
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36');
    await page.setViewport({ width: 1920, height: 1080 });

    await page.goto(link, { waitUntil: 'networkidle0' });
    await new Promise(resolve => setTimeout(resolve, 3000));

    const html = await page.content();
    await browser.close();

    const $ = cheerio.load(html);
    let ul;

    $("ul[class^='app-catalog-']").each((index, element) => {
        if($(element).html().includes("Основные характеристики")) {
            ul = $(element).html();
        }
    });
    const $2 = cheerio.load(ul);

    const divClass = $2('div').first().attr('class').split(' ')[0];

    const attrData = {};

    $2(`div.${divClass}`).each((idx, el) => {
        const $ = cheerio.load(el);
        const key = $('div > span').first().text().trim();
        const value = $('span').last().text().trim();

        attrData[key] = value;
    });

    return eval(type)(attrData);
};