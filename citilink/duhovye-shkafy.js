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

    extra: {
        'Гриль': ['gril', 'Гриль'],
        'Конвекция': ['konvektsiia', 'Конвекция'],
        'Класс энергоэффективности': ['klass-energopotrebleniia', 'Класс энергопотребления'],
        'Количество программ духовки': ['chislo-avtomaticheskikh-programm', 'Число автоматических программ'],
        'Переключатели': ['perekliuchateli', 'Переключатели'],
        'Электроподжиг': ['elektropodzhig', 'Электроподжиг'],
        'Газ-контроль': ['gaz-kontrol', 'Газ-контроль'],
        'Таймер': ['timer', 'Таймер'],
        'Размеры ниши для встраивания (ШхГхВ)': ['nisha', 'Размеры ниши для встраивания (ШхГхВ)']
    }
};

export const duhovye_shkafy = (attrData) => {
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
                            value: attrData[key].toLowerCase(),
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
        const svg = attrData['Размеры (ШхГхВ)'].split(' ').map(val=>mainParser(val, true));
        attr['shirina'] = {name: 'Ширина', value: svg[0]};
        attr['vysota'] = {name: 'Высота', value: svg[4]};
        attr['glubina'] = {name: 'Глубина', value: svg[2]};
    } catch(e) {
        console.log('Размеры (ШхГхВ)');
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