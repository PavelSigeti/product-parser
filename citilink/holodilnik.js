import { translit } from "../translit.js";

const mainParser = (val, num) => (num) ? +val.replace(/[^.\d]/g, '') : val;

const data = {
    main: {
        'Система размораживания2': ['razmorazhivanie-morozilnoi-kamery', false, 'Размораживание морозильной камеры'],
        'Система размораживания': ['razmorazhivanie-kholodilnoi-kamery', false, 'Размораживание холодильной камеры'],
        'Количество компрессоров': ['kolichestvo-kompressorov', false, 'Количество компрессоров', {'один': +1, 'два': +2}],
        // 'vysota': ['#vysota', true, 'Высота'],
        // 'shirina': ['#shirina', true, 'Ширина'],
        // 'glubina': ['#glubina', true, 'Глубина'],
        'Полезный объем холодильной камеры': ['obem-kholodilnoi-kamery', true, 'Объем холодильной камеры'],
        'Полезный объем морозильной камеры': ['obem-morozilnoi-kamery', true, 'Объем морозильной камеры'],
        'Расположение морозильной камеры': ['morozilnaia-kamera', false, 'Морозильная камера', {'сбоку': 'сбоку', 'сверху': 'сверху', 'снизу': 'снизу', 'слева': 'сбоку'}],
        'Количество дверей': ['kolichestvo-dverei', true, 'Количество дверей'],
    },

    extra: ['Гарантия2', 'Бренд', 'Модель', 'Гарантия', 'Особенности', 'Количество полок', 'Количество ящиков', 'Количество ящиков2']
};

export const holodilnik = async (attrData) => {
    const attr = {};
    const extraAttr = {};

    Object.keys(data.main).forEach((item) => {
        try {
            if(data.main[item][3]) {
                attr[data.main[item][0]] = {
                    name: data.main[item][2],
                    value: data.main[item][3][attrData[item]],
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

    const svg = attrData['Размеры (ШхВхГ)'].split(' х ').map(val=>mainParser(val, true));
    attr['shirina'] = {name: 'Ширина', value: svg[0]};
    attr['vysota'] = {name: 'Высота', value: svg[1]};
    attr['glubina'] = {name: 'Глубина', value: svg[2]};

    if(attrData['Размеры (ШхВхГ)']) delete(attrData['Размеры (ШхВхГ)']);

    Object.keys(attrData).forEach((item) => {
        if(!data.extra.includes(item)) {
            extraAttr[translit(item)] = {
                name: item,
                value: attrData[item],
            };
        }
    });

    return {"result": true, attr: attr, extra: extraAttr};
}