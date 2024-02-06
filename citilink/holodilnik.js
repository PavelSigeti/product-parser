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

    extra: {
        'Вес упаковки (ед)': ['ves', 'Вес'],
        'Тип управления': ['tip-upravleniia', 'Тип управления'],
        'Температура морозильной камеры min': ['minimalnaia-temperatura-v-morozilnoi-kamere', 'Минимальная температура в морозильной камере'],
        'Материал полок': ['material-polok', 'Материал полок'],
        'Количество полок': ['kolichestvo-polok', 'Количество полок'],

    }
};

export const holodilnik = async (attrData) => {
    const attr = {};
    const extraAttr = {};

    Object.keys(data.main).forEach((item) => {
        if(data.main[item][3]) {
            attr[data.main[item][0]] = {
                name: data.main[item][2],
                value: data.main[item][3][attrData[item]],
            };
        } else {
            attr[data.main[item][0]] = {
                name: data.main[item][2],
                value: mainParser(attrData[item], data.main[item][1]),
            };
        }
    });

    const svg = attrData['Размеры (ШхВхГ)'].split(' х ').map(val=>mainParser(val, true));
    attr['shirina'] = {name: 'Ширина', value: svg[0]};
    attr['vysota'] = {name: 'Высота', value: svg[1]};
    attr['glubina'] = {name: 'Глубина', value: svg[2]};

    Object.keys(data.extra).forEach((item) => {
        if(attrData[item]) {
            extraAttr[data.extra[item][0]] = {
                name: data.extra[item][1],
                value: attrData[item],
              };
        }
    });

    return {"result": true, attr: attr, extra: extraAttr};
}