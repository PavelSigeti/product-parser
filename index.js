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