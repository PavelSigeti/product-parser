const mainParser = (val, num) => (num) ? +val.replace(/[^.\d]/g, '') : val;

const data = {
    main: {
        // 'Диагональ': ['diagonal', true, 'Диагональ'],
        'Частота обновления': ['chastota-obnovleniia-ekrana', true, 'Частота обновления'],
        'Стандарт разрешения экрана': ['razreshenie-hd', false, 'Разрешение HD', {'4K Ultra HD': '4K UHD', '8K Ultra HD': '8K UHD', 'HD': '720p HD', 'FULL HD': 'Full HD',}],
    },

    extra: {
        'Тип панели': ['tekhnologiia-ekrana', 'Технология экрана'],
        'Операционная система': ['platforma-smart-tv', 'Платформа Smart TV'],
        'Углы обзора': ['ugol-obzora', 'Угол обзора'],
        'Разрешение': ['razreshenie', 'Разрешение'],
        'Размер VESA': ['standart-krepleniia-vesa', 'Стандарт крепления VESA'],
        'Размеры с подставкой (ШxВxГ)': ['razmery-s-podstavkoi-(shxvxg)', 'Размеры с подставкой (ШxВxГ)'],
        'Вес товара': ['ves-s-podstavkoi', 'Вес с подставкой'],
        'Размеры без подставки (ШxВxГ)': ['razmery-bez-podstavki-(shxvxg)', 'Размеры без подставки (ШxВxГ)'],
        'Вес без подставки': ['ves-bez-podstavki', 'Вес без подставки'],
    }
};

export const televizory = (attrData) => {
    const attr = {};
    const extraAttr = {};

    Object.keys(data.main).forEach((item) => {
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
    });

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