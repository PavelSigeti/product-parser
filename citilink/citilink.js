import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer';
import {stiralnye_mashiny} from './stiralnye-mashiny.js';
import {holodilnik} from './holodilnik.js';
import {kuhonnye_plity} from './kuhonnye-plity.js';
import {televizory} from './televizory.js';
import {konditsionery} from './konditsionery.js';
import {varochnye_paneli} from './varochnye-paneli.js';
import {duhovye_shkafy} from './duhovye-shkafy.js'; 
import {morozilniki_i_lari} from './morozilniki-i-lari.js'; 
import {posudomoechnye_mashiny} from './posudomoechnye-mashiny.js'; 
import {vodonagrevateli} from './vodonagrevateli.js'; 


export const citilink = async (link, slug) => {
    const type = slug.replaceAll('-', '_');
    const browser = await puppeteer.launch({executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox', '--disable-setuid-sandbox']});
    // const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0');
    await page.setViewport({ width: 1920, height: 1080 });

    page.setDefaultNavigationTimeout(0);

    await page.goto(link, { waitUntil: 'networkidle0' });
    // await new Promise(resolve => setTimeout(resolve, 3000));

    const html = await page.content();
    await browser.close();

    const $ = cheerio.load(html);
    let ul;

    $("ul[class^='app-catalog-']").each((index, element) => {
        if($(element).html().includes("характеристики")) {
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
        if(!attrData.hasOwnProperty(key)) {
            attrData[key] = value;
        } else {
            attrData[`${key}2`] = value;
        }
    });

    return eval(type)(attrData);
};