import * as cheerio from 'cheerio';
import {holodilnik} from './holodilnik.js';

const main = {
  'razmorazhivanie-morozilnoi-kamery': ['#razmorazhivanie morozilnoi kamery'.replace(/\s/g, '\\ '), null],
  'razmorazhivanie-kholodilnoi-kamery': ['#razmorazhivanie kholodilnoi kamery'.replace(/\s/g, '\\ '), null],
  'kolichestvo-kompressorov': ['#kolichestvo kompressorov'.replace(/\s/g, '\\ '), 'num'],
  'vysota': ['#vysota', 'num'],
  'shirina': ['#shirina', 'num'],
  'glubina': ['#glubina', 'num'],
  'ves': '#ves',
  'obem-kholodilnoi-kamery': ['#obem kholodilnoi kamery'.replace(/\s/g, '\\ '), 'num'],
  'obem-morozilnoi-kamery': ['#obem morozilnoi kamery'.replace(/\s/g, '\\ '), 'num'],
  'morozilnaia-kamera': ['#morozilnaia kamera'.replace(/\s/g, '\\ '), null],
  'kolichestvo-dverei': ['#kolichestvo dverei'.replace(/\s/g, '\\ '), 'num'],
};

const extra = {
  'tip-upravleniia': '#tip upravleniia'.replace(/\s/g, '\\ '),
  'uroven-shuma': '#uroven shuma'.replace(/\s/g, '\\ '),
  'minimalnaia-temperatura-v-morozilnoi-kamere': '#minimalnaia temperatura v morozilnoi kamere'.replace(/\s/g, '\\ '),
  'material pokrytiia': '#material pokrytiia'.replace(/\s/g, '\\ '),
};

const fetchHtml = async (url) => {
  const response = await fetch(url);
  // const buffer = await response.arrayBuffer();
  // const decoder = new TextDecoder('windows-1251');
  // const html = decoder.decode(buffer);
  const html = await response.text();
  return html;
}


export const yandex = async () => {
  const html = await fetchHtml('https://yandexwebcache.net/yandbtm?fmode=inject&tm=1705824596&tld=ru&lang=ru&la=1705491328&text=https%3A//market.yandex.ru/product--kholodilnik-indesit-its-4180-w-belyi/824253123/spec&url=https%3A//market.yandex.ru/product--kholodilnik-indesit-its-4180-w/824253123/spec&l10n=ru&mime=html&sign=dbe581c4da545d6f66652b6cea47ed78&keyno=0');
  const $ = cheerio.load(html);

  // console.log(holodilnik);

  Object.keys(main).forEach((item) => {
    console.log(item, $(`${main[item][0]} dd`).text());
  });
  Object.keys(extra).forEach((item) => {
    console.log(item, $(`${extra[item]} dd`).text());
  });
}

