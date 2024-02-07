const mainParser = (val, num) => (num) ? +val.replace(/[^.\d]/g, '') : val;

const data = {
    main: {
        'Тип установки': ['tip-ustanovki', false, 'Тип установки', {'настольная': 'отдельно стоящая', 'напольная': 'отдельно стоящая', 'полностью': 'встраиваемая полностью', 'с открытой панелью': 'встраиваемая частично'}],
        'Загрузка, комплектов посуды': ['vmestimost', true, 'Вместимость'],
        // 'vysota': ['#vysota', true, 'Высота'],
        // 'shirina': ['#shirina', true, 'Ширина'],
        // 'glubina': ['#glubina', true, 'Глубина'],
    },

    extra: {
        'Вес упаковки (ед)': ['ves', 'Вес'],
        'Тип управления': ['upravlenie', 'Управление'],
        'Минимальный расход воды': ['raskhod-vody', 'Расход воды'],
        'Максимальный уровень шума': ['uroven-shuma-pri-rabote', 'Уровень шума при работе'],
        'Тип сушки': ['tip-sushki', 'Тип сушки'],
        'Класс энергопотребления': ['klass-energopotrebleniia', 'Класс энергопотребления'],
    }
};

export const posudomoechnye_mashiny = (attrData) => {
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
        const svg = attrData['Размеры (ШхВхГ)'].split('х').map(val=>mainParser(val, true));
        attr['shirina'] = {name: 'Ширина', value: svg[0]};
        attr['vysota'] = {name: 'Высота', value: svg[1]};
        attr['glubina'] = {name: 'Глубина', value: svg[2]};
    } catch (e) {
        console.log('ШхВхГ');
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