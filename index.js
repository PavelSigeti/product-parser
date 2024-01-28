import express from "express";
import bodyParser from "body-parser";
import * as cheerio from 'cheerio';
import {yandex} from './yandex/yandex.js';
import cors from 'cors';

const app = express();

app.use(bodyParser.json({ extended: false }));

app.use(cors());

const headers = {
    'Content-Type': 'application/json'
};

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

app.post('/product', async (req,resp) => {
    try {
        const html = await fetchHtml(req.body.link);
        resp.json(yandex(html, req.body.type));
    } catch (e) {
        return resp.json({
            result: false,
            msg: e.message,
        });
    }
});

app.post('/test', async (req, resp) => {
    try {
        const html = await fetchHtml(req.body.link);
        const $ = cheerio.load(html);

        resp.json($(`${eval(type).main[item][0]} dd`).text());
        // resp.json(yandex(html, req.body.type));
    } catch (e) {
        return resp.json({
            result: false,
            msg: e.message,
        });
    }
});

app.listen(7000);