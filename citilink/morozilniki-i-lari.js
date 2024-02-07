const mainParser = (val, num) => (num) ? +val.replace(/[^.\d]/g, '') : val;

const data = {
    main: {
        'Тип морозильника': ['tip-morozilnika', false, 'Тип морозильника'],
        'Система размораживания': ['razmorazhivanie', false, 'Размораживание', {'ручная': 'ручное', 'No Frost': 'No Frost'}],
        'Количество ящиков': ['kolichestvo-iashchikov/polok', true, 'Количество ящиков/полок', false, ['Количество корзин', 'Количество ящиков']],
        'Общий объем': ['obshchii-obem', true, 'Общий объем', false, ['Общий объем', 'Общий объем морозильной камеры']],
        // 'vysota': ['#vysota', true, 'Высота'],
        // 'shirina': ['#shirina', true, 'Ширина'],
        // 'glubina': ['#glubina', true, 'Глубина'],
    },
    extra: {
        'Класс энергопотребления': ['klass-energopotrebleniia', 'Класс энергопотребления'],
        'Уровень шума': ['uroven-shuma', 'Уровень шума'],
        'Мощность замораживания': ['moshnost-zamorazhivania', 'Мощность замораживания'],
        'Количество компрессоров': ['kolichestvo-kompressorov', 'Количество компрессоров'],
    }
};

export const morozilniki_i_lari = (attrData) => {
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
        
    });
    try {
        const svg = attrData['Размеры (ШхВхГ)'].split(' ').map(val=>mainParser(val, true));
        attr['shirina'] = {name: 'Ширина', value: svg[0]};
        attr['vysota'] = {name: 'Высота', value: svg[2]};
        attr['glubina'] = {name: 'Глубина', value: svg[4]};
    } catch(e) {
        console.log('Размеры (ШхВхГ)');
    }
    

    Object.keys(data.extra).forEach((item) => {
        if(attrData[item]) {
            extraAttr[data.extra[item][0]] = {
                name: data.extra[item][1],
                value: attrData[item],
              };
        }
    });

    return {"result": true, attr: attr, extra: extraAttr};
};