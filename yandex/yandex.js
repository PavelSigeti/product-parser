import * as cheerio from 'cheerio';
import {holodilnik} from './holodilnik.js';

const mainParser = (val, num) => (num) ? +val.split(' ')[0] : val;

export const yandex = (html, type) => {
  const $ = cheerio.load(html);

  const attr = {};
  const extraAttr = {};

  Object.keys(eval(type).main).forEach((item) => {
    attr[item] = mainParser($(`${eval(type).main[item][0]} dd`).text(), eval(type).main[item][1]);
  });
  Object.keys(eval(type).extra).forEach((item) => {
    extraAttr[item] = $(`${eval(type).extra[item]} dd`).text();
  });

  return {
    result: true,
    attr,
    extra: extraAttr,
  }
}

