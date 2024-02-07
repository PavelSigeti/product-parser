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

    extra: {
        'Тип переключателей': ['perekliuchateli', 'Переключатели'],
        'Электроподжиг': ['elektropodzhig', 'Электроподжиг'],
        'Газ-контроль': ['gaz-kontrol-konforok', 'Газ-контроль конфорок'],
        'Таймер': ['timer', 'Таймер'],
        'Управление': ['upravlenie', 'Управление'],
        'Материал поверхности': ['material-poverhnosi', 'Материал поверхности'],
        'Материал рабочей поверхности': ['material-poverhnosi', 'Материал поверхности'],
        'Материал решетки': ['material-reshetki', 'Материал решетки'],
        'Дисплей': ['display', 'Дисплей'],
        'Установка рабочей поверхности': ['ustanovka', 'Установка рабочей поверхности'],
    }
};

export const varochnye_paneli = (attrData) => {
    const attr = {};
    const extraAttr = {};

    // return attrData;

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
        if(attrData['Размеры (ШхГ)']) {
            const svg = attrData['Размеры (ШхГ)'].split(' х ').map(val=>mainParser(val, true));
            attr['shirina'] = {name: 'Ширина', value: svg[0]};
            attr['glubina'] = {name: 'Глубина', value: svg[1]};
        } else {
            const svg = attrData['Размеры (ШхВхГ)'].split(' ').map(val=>mainParser(val, true));
            attr['shirina'] = {name: 'Ширина', value: +svg[0]};
            attr['glubina'] = {name: 'Глубина', value: +svg[4]};
        }
        
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
        
    } catch (e) {
        console.log(e.message);
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