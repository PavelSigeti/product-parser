import * as cheerio from 'cheerio';
import {holodilnik} from './holodilnik.js';

const main = {
  'razmorazhivanie-morozilnoi-kamery': ['#razmorazhivanie morozilnoi kamery'.replace(/\s/g, '\\ '), false],
  'razmorazhivanie-kholodilnoi-kamery': ['#razmorazhivanie kholodilnoi kamery'.replace(/\s/g, '\\ '), false],
  'kolichestvo-kompressorov': ['#kolichestvo kompressorov'.replace(/\s/g, '\\ '), true],
  'vysota': ['#vysota', true],
  'shirina': ['#shirina', true],
  'glubina': ['#glubina', true],
  'ves': ['#ves', true],
  'obem-kholodilnoi-kamery': ['#obem kholodilnoi kamery'.replace(/\s/g, '\\ '), true],
  'obem-morozilnoi-kamery': ['#obem morozilnoi kamery'.replace(/\s/g, '\\ '), true],
  'morozilnaia-kamera': ['#morozilnaia kamera'.replace(/\s/g, '\\ '), false],
  'kolichestvo-dverei': ['#kolichestvo dverei'.replace(/\s/g, '\\ '), true],
};

const extra = {
  'tip-upravleniia': '#tip upravleniia'.replace(/\s/g, '\\ '),
  'uroven-shuma': '#uroven shuma'.replace(/\s/g, '\\ '),
  'minimalnaia-temperatura-v-morozilnoi-kamere': '#minimalnaia temperatura v morozilnoi kamere'.replace(/\s/g, '\\ '),
  'material-pokrytiia': '#material pokrytiia'.replace(/\s/g, '\\ '),
};

const mainParser = (val, num) => (num) ? +val.split(' ')[0] : val;

export const yandex = (html) => {
  const $ = cheerio.load(html);

  const attr = {};
  const extraAttr = {};

  Object.keys(main).forEach((item) => {
    attr[item] = mainParser($(`${holodilnik.main[item][0]} dd`).text(), holodilnik.main[item][1]);
  });
  Object.keys(extra).forEach((item) => {
    extraAttr[item] = $(`${holodilnik.extra[item]} dd`).text();
  });

  console.log({
    attr,
    extra: extraAttr,
  });
}

