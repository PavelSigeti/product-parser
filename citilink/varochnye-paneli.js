import { translit } from "../translit.js";

const mainParser = (val, num) => (num) ? +val.replace(/[^.\d]/g, '') : val;

const data = {
    main: {
        // 'tip-paneli': ['tip-paneli', false, 'Тип панели'],
        'Количество конфорок': ['kolichestvo-konforok', true, 'Количество конфорок', false, ['Общее количество конфорок', 'Количество конфорок']],
        // 'vysota': ['#vysota', true, 'Высота'],
        // 'shirina': ['#shirina', true, 'Ширина'],
        // 'glubina': ['#glubina', true, 'Глубина'],
        // 'shirina-dlia-vstraivaniia': ['shirina-dlia-vstraivaniia', true, 'Ширина для встраивания'],
        // 'glubina-dlia-vstraivaniia': ['glubina-dlia-vstraivaniia', true, 'Глубина для встраивания'],
    },

    extra: ['Гарантия2', 'Бренд', 'Модель', 'Гарантия', 'Особенности']
};

export const varochnye_paneli = (attrData) => {
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
        if(attrData['Размеры (ШхГ)']) {
            const svg = attrData['Размеры (ШхГ)'].split(' х ').map(val=>mainParser(val, true));
            attr['shirina'] = {name: 'Ширина', value: svg[0]};
            attr['glubina'] = {name: 'Глубина', value: svg[1]};
        } else {
            const svg = attrData['Размеры (ШхВхГ)'].split(' ').map(val=>mainParser(val, true));
            attr['shirina'] = {name: 'Ширина', value: +svg[0]};
            attr['glubina'] = {name: 'Глубина', value: +svg[4]};
        }
        if(attrData['Размеры (ШхГ)']) delete(attrData['Размеры (ШхГ)']);
    } catch (e) {
        console.log(e.message);
    }

    try {
        if(attrData['Размеры ниши для встраивания (ШхГ)']) {
            const svg2 = attrData['Размеры ниши для встраивания (ШхГ)'].split(' ').map(val=>mainParser(val, true));
            attr['shirina-dlia-vstraivaniia'] = {name: 'Ширина для встраивания', value: +svg2[0] / 10};
            attr['glubina-dlia-vstraivaniia'] = {name: 'Глубина для встраивания', value: +svg2[2] / 10};
        } else {
            const svg2 = attrData['Размеры ниши для встраивания (ШхВxГ)'].split(' ').map(val=>mainParser(val, true));
            attr['shirina-dlia-vstraivaniia'] = {name: 'Ширина для встраивания', value: +svg2[0] / 10};
            attr['glubina-dlia-vstraivaniia'] = {name: 'Глубина для встраивания', value: +svg2[2] / 10};
        }
        if(attrData['Размеры ниши для встраивания (ШхГ)']) delete(attrData['Размеры ниши для встраивания (ШхГ)']);
    } catch (e) {
        console.log(e.message);
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