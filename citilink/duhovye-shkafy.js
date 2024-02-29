import { translit } from "../translit.js";

const mainParser = (val, num) => (num) ? +val.replace(/[^.\d]/g, '') : val;

const data = {
    main: {
        'Тип духовки': ['tip-dukhovki', false, 'Тип духовки'],
        'Максимальная температура': ['maksimalnaia-temperatura', true, 'Максимальная температура'],
        'Объем духовки': ['obem-dukhovki', true, 'Объем духовки'],
        'Наличие СВЧ': ['funktsiia-svch', false, 'Функция СВЧ', {'есть': 'да', 'нет': 'нет',}],
        // 'vysota': ['#vysota', true, 'Высота'],
        // 'shirina': ['#shirina', true, 'Ширина'],
        // 'glubina': ['#glubina', true, 'Глубина'],
    },

    extra: ['Гарантия2', 'Бренд', 'Модель', 'Гарантия', 'Особенности']
};

export const duhovye_shkafy = (attrData) => {
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
        let svg;
        if(attrData['Размеры (ШхВхГ)']) {
            svg = attrData['Размеры (ШхВхГ)'].split(' ').map(val=>mainParser(val, true));
        } else {
            svg = attrData['Размеры (Ш х В х Г)'].split(' ').map(val=>mainParser(val, true));
        }
        attr['shirina'] = {name: 'Ширина', value: svg[0]};
        attr['vysota'] = {name: 'Высота', value: svg[2]};
        attr['glubina'] = {name: 'Глубина', value: svg[4]};

        if(attrData['Размеры (ШхВхГ)']) delete(attrData['Размеры (ШхВхГ)']);
        if(attrData['Размеры (Ш х В х Г)']) delete(attrData['Размеры (Ш х В х Г)']);
    } catch(e) {
        console.log('Размеры (ШхВхГ)');
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