import express from "express";
import bodyParser from "body-parser";
import * as cheerio from 'cheerio';
import {yandex} from './yandex/yandex.js';
import {yandexImg} from './yandex/yandex-img.js';
import {img} from './img.js';
import cors from 'cors';
import { citilink } from "./citilink/citilink.js";

const app = express();

app.use(bodyParser.json({ extended: false }));

app.use(cors());

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

app.post('/yandex', async (req,resp) => {
    try {
        const html = await fetchHtml(req.body.link);
        resp.json(yandex(html, req.body.type));
    } catch (e) {
        return resp.json({
            result: false,
            type: 'yandex',
            msg: e.message,
        });
    }
});

app.post('/citilink', async (req, resp) => {
    try {
        const data = await citilink(req.body.link, req.body.type);
        resp.send(data);
    } catch (e) {
        return resp.json({
            result: false,
            type: 'citilink',
            msg: e.message,
        });
    }
});

app.post('/img', async (req, resp) => {
    try {
        const elementsData = await img(req.body.link);
        // resp.send(elementsData);
        resp.json({
            result: true,
            data: elementsData,
        });
    } catch (e) {
        return resp.json({
            result: false,
            msg: e.message,
        });
    }
});


app.listen(7000);