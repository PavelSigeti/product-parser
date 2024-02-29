import { translit } from "../translit.js";

const mainParser = (val, num) => (num) ? +val.replace(/[^.\d]/g, '') : val;

const data = {
    main: {
        'Тип плиты': ['tip-varochnoi-paneli', false, 'Тип варочной панели', false, ['Тип настольной плиты']],
        'Тип духовки': ['tip-dukhovki', false, 'Тип духовки'],
        'Количество газовых конфорок': ['obshchee-kolichestvo-konforok', true, 'Количество конфорок', false, ['Количество электрических конфорок', 'Количество газовых конфорок']],
        // 'vysota': ['#vysota', true, 'Высота'],
        // 'shirina': ['#shirina', true, 'Ширина'],
        // 'glubina': ['#glubina', true, 'Глубина'],
    },

    extra: ['Гарантия2', 'Бренд', 'Модель', 'Гарантия', 'Особенности']
};

export const kuhonnye_plity = (attrData) => {
    const attr = {};
    const extraAttr = {};

    Object.keys(data.main).forEach((item) => {
        try {
            if(data.main[item][3]) {
                attr[data.main[item][0]] = {
                    name: data.main[item][2],
                    value: data.main[item][3][attrData[item]].toLowerCase(),
                };
            } else if(data.main[item][4]) {
                data.main[item][4].forEach((key) =>{
                    if(attrData[key]) {
                        attr[data.main[item][0]] = {
                            name: data.main[item][2],
                            value: mainParser(attrData[key], data.main[item][1]),
                        };  
                    }
                });
            } else {
                attr[data.main[item][0]] = {
                    name: data.main[item][2],
                    value: mainParser(attrData[item], data.main[item][1]),
                };
            }
        } catch (e) {
            attr[data.main[item][0]] = {
                name: data.main[item][2],
            };
            console.log(item);
        }
        if(attrData[item]) delete attrData[item];
    });

    try {
        const svg = attrData['Размеры (ШхВхГ)'].split(' ').map(val=>mainParser(val, true));
        attr['shirina'] = {name: 'Ширина', value: svg[0]};
        attr['vysota'] = {name: 'Высота', value: svg[2]};
        attr['glubina'] = {name: 'Глубина', value: svg[4]};

        if(attrData['Размеры (ШхВхГ)']) delete(attrData['Размеры (ШхВхГ)']);
    } catch (e) {
        console.log('ШхВхГ');
    }
    
    Object.keys(attrData).forEach((item) => {
        if(!data.extra.includes(item)) {
            extraAttr[translit(item)] = {
                name: item,
                value: attrData[item],
            };
        }
    });

    return {"result": true, attr: attr, extra: extraAttr};
};