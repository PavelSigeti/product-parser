import { translit } from "../translit.js";

const mainParser = (val, num) => (num) ? +val.replace(/[^.\d]/g, '') : val;

const data = {
    main: {
        'Обслуживаемая площадь': ['ploshchad-pomeshcheniia', true, 'Площадь помещения'],
        // 'moshchnost-konditsionera': ['moshchnost-konditsionera', true, 'Мощность кондиционера'],
        'Инвертор': ['invertornyi', false, 'Инверторный', {'есть': 'да', 'нет':'нет'}],
        // 'tip-konditsionera': ['tip-konditsionera', false, 'Тип кондиционера'],
    },

    extra: ['Гарантия2', 'Бренд', 'Модель', 'Гарантия', 'Особенности']
};

export const konditsionery = (attrData) => {
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