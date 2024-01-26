import express from "express";
import bodyParser from "body-parser";
import * as cheerio from 'cheerio';
import {yandex} from './yandex/yandex.js';

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

const fetchHtml = async (url) => {
    const response = await fetch(url);
    if(url.includes('google')) {
        const buffer = await response.arrayBuffer();
        const decoder = new TextDecoder('windows-1251');
        const html = decoder.decode(buffer);
        return html;
    } else {
        const html = await response.text();
        return html;
    }
}

const html = await fetchHtml('https://webcache.googleusercontent.com/search?q=cache:cuUUYS8sQfMJ:https://market.yandex.ru/product--kholodilnik-indesit-its-4180/824253123/spec%3Fsku%3D101701653802&hl=ru&gl=ru');


yandex(html);