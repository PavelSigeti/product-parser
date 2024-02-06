const mainParser = (val, num) => (num) ? +val.replace(/[^.\d]/g, '') : val;

const data = {
    main: {
        'Обслуживаемая площадь': ['ploshchad-pomeshcheniia', true, 'Площадь помещения'],
        // 'moshchnost-konditsionera': ['moshchnost-konditsionera', true, 'Мощность кондиционера'],
        'Инвертор': ['invertornyi', false, 'Инверторный', {'есть': 'да', 'нет':'нет'}],
        // 'tip-konditsionera': ['tip-konditsionera', false, 'Тип кондиционера'],
    },

    extra: {
        'Пульт ДУ': ['pult', 'Пульт ДУ'],
        'Тип установки внутреннего блока': ['tip-vnutrennego-bloka', 'Тип внутреннего блока'],
        'Режимы работы': ['rezhim-raboty', 'Режим работы'],
        'Класс энергопотребления, охлаждение': ['klass-energopotrebleniia', 'Класс энергопотребления'],
        'Размеры внутреннего блока (ШхВхГ)': ['razmeri', 'Размеры внутреннего блока (ШхВхГ)'],
        'Автоочистка': ['avtootchistka', 'Автоочистка'],
    }
};

export const konditsionery = () => {
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