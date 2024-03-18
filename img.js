import * as cheerio from 'cheerio';
import { mvideoImg } from './mvideo/mvideo-img.js';
import { citilinkImg } from './citilink/citilink-img.js';


export const img = async (link) => {

    if(link.includes('mvideo')) {
        const html = await mvideoImg(link);
        const $ = cheerio.load(html);

        const elementsData = [];
        $('.product-carousel__preview').each((index, element) => {
            elementsData.push('https:' + $(element).attr('src'));
        });
        
        return elementsData;
    }

    if (link.includes('citilink')) {
        // data-meta-name="PopupImageGallery__main"
        const html = await citilinkImg(link);
        // return html;
        const $ = cheerio.load(html);

        const elementsData = [];
        $('div[data-meta-name="PopupImageGallery"] img').each((index, element) => {
            elementsData.push($(element).attr('src'));
        });

        return elementsData;
    }

    throw new UserException("Данный сайт не поддерживается, или попробуйте еще раз");
};