import express from "express";
import bodyParser from "body-parser";
import * as cheerio from 'cheerio';

// const app = express();

// app.use(bodyParser.json({ extended: false }));

// const headers = {
//     'Content-Type': 'application/json'
//   };

// app.post('/product', async (req,resp) => {
//     const response = await fetch(req.body.link);
//     const html = await response.text();
//     console.log(html);
//     const $ = cheerio.load(html);
//     console.log('cheerio', $('div.item').text());

//     resp.json(req.body.link);
// });

// app.listen(7000);


// (async () => {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto('https://webcache.googleusercontent.com/search?q=cache:70si0_zn7pgJ:https://price.ru/bytovye-holodilniki-morozilniki/indesit-itr-4180-w/harakteristiki/&hl=ru&gl=ru');

//     // Wait for SPA content to load (you may need to adjust this)
//     await page.waitForSelector('#morozilnoi');

//     const content = await page.evaluate(() => {
//         return document.querySelector('#morozilnoi').innerHTML;
//     });

//     console.log(content);

//     await browser.close();
// })();

const fetchHtml = async (url) => {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  const decoder = new TextDecoder('windows-1251'); // Используйте нужную кодировку
  const html = decoder.decode(buffer);
  return html;
}

const html = await fetchHtml('https://webcache.googleusercontent.com/search?q=cache:cuUUYS8sQfMJ:https://market.yandex.ru/product--kholodilnik-indesit-its-4180/824253123/spec%3Fsku%3D101701653802&hl=ru&gl=ru');

const idSelector = '#razmorazhivanie morozilnoi kamery'.replace(/\s/g, '\\ ');
const $ = cheerio.load(html);
console.log('cheerio', $(`${idSelector} dd`).text());

