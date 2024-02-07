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

    extra: {
        'Управление': ['tip-upravleniia', 'Тип управления'],
        'Материал рабочей поверхности': ['material-rabochei-poverkhnosti', 'Материал рабочей поверхности'],
        'Газ-контроль конфорок': ['gaz-kontrol', 'Газ-контроль'],
        'Очистка духовки': ['ochistka-dukhovki', 'Очистка духовки'],
        'Объем духовки': ['obem-dukhovki', 'Объем духовки'],
        'Конвекция в духовке': ['konvektsiia-v-dukhovke', 'Конвекция в духовке'],
        'Электроподжиг': ['elektropodzhig', 'Электроподжиг'],
        'Гриль': ['gril', 'Гриль'],
        'Вес': ['ves', 'Вес'],
        'Максимальный вес нагрузки': ['max-ves-nagruzki', 'Максимальный вес нагрузки'],
        'Присоединительная резьба газопровода': ['rezba-gazoprovoda', 'Присоединительная резьба газопровода'],
        'Освещение духовки': ['osveshenie-duhovki', 'Освещение духовки'],
    }
};

export const kuhonnye_plity = (attrData) => {
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
        const svg = attrData['Размеры (ШхВхГ)'].split(' ').map(val=>mainParser(val, true));
        attr['shirina'] = {name: 'Ширина', value: svg[0]};
        attr['vysota'] = {name: 'Высота', value: svg[2]};
        attr['glubina'] = {name: 'Глубина', value: svg[4]};
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