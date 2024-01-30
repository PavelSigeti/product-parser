import * as cheerio from 'cheerio';
import {holodilnik} from './holodilnik.js';
import {stiralnye_mashiny} from './stiralnye-mashiny.js';
import {kuhonnye_plity} from './kuhonnye-plity.js';
import {televizory} from './televizory.js';
import {konditsionery} from './konditsionery.js';
import {varochnye_paneli} from './varochnye-paneli.js';
import {duhovye_shkafy} from './duhovye-shkafy.js';
import {morozilniki_i_lari} from './morozilniki-i-lari.js';
import {vytyazhki} from './vytyazhki.js';
import {vodonagrevateli} from './vodonagrevateli.js';
import {posudomoechnye_mashiny} from './posudomoechnye-mashiny.js';

// const mainParser = (val, num) => (num) ? +val.split(' ')[0] : val;
const mainParser = (val, num) => (num) ? +val.replace(/[^.\d]/g, '') : val;

export const yandex = (html, slug) => {
  const type = slug.replaceAll('-', '_');
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
    const val = $(`${eval(type).extra[item][0]} dd`).text();
    // if(val.length > 0) {
      extraAttr[item] = {
        name: eval(type).extra[item][1],
        value: val,
      };
    // }
    
  });

  return {
    result: true,
    attr,
    extra: extraAttr,
  }
}

