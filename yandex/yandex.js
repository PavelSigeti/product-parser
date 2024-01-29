import * as cheerio from 'cheerio';
import {holodilnik} from './holodilnik.js';
import {stiralnye_mashiny} from './stiralnye-mashiny.js';
import {kuhonnye_plity} from './kuhonnye-plity.js';
import {televizory} from './televizory.js';

// const mainParser = (val, num) => (num) ? +val.split(' ')[0] : val;
const mainParser = (val, num) => (num) ? +val.replace(/[^+\d]/g, '') : val;

export const yandex = (html, slug) => {
  const type = slug.replace('-', '_');
  const $ = cheerio.load(html);

  const attr = {};
  const extraAttr = {};

  Object.keys(eval(type).main).forEach((item) => {
    attr[item] = {
      name: eval(type).main[item][2],
      value: mainParser($(`${eval(type).main[item][0]} dd`).text(), eval(type).main[item][1]),
    };
  });
  Object.keys(eval(type).extra).forEach((item) => {
    extraAttr[item] = {
      name: eval(type).extra[item][1],
      value: $(`${eval(type).extra[item][0]} dd`).text(),
    };
  });

  return {
    result: true,
    attr,
    extra: extraAttr,
  }
}

