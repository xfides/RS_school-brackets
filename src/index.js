function check(str, bracketsConfig) {

    //----------------
    // initialization
    let myBrackets = {
        openElems: [],
        closeELems: []
    };

    bracketsConfig.forEach(function (oneConfig) {
        myBrackets.openElems.push(oneConfig[0]);
        myBrackets.closeELems.push(oneConfig[1]);
    });

    //-------------
    // calculation
    let stackSymbols = [];
    let strLength = str.length;

    // если нечет кол-во символов - сразу неправильно
    if (strLength % 2 !== 0) {
        return false;
    }

    // тяжелая логика проверки, основанная на стеке
    for (let iSymbol = 0; iSymbol < strLength; iSymbol++) {

        // встретили открывающий символ
        if ((myBrackets.openElems.indexOf(str[iSymbol]) !== -1)) {

            // открывающий символ == закрывающему символу
            if (myBrackets.closeELems.indexOf(str[iSymbol]) !== -1) {

                // этого символа еще нет в стеке
                if (stackSymbols.indexOf(str[iSymbol]) === -1) {
                    stackSymbols.push(str[iSymbol]);
                    continue;
                }

                //  открывающий символ != закрывающему символу
            } else {
                stackSymbols.push(str[iSymbol]);
                continue;
            }

        }

        // это закрывающий символ
        if (myBrackets.closeELems.indexOf(str[iSymbol]) !== -1) {

            // берем верхушку стека
            let topStackSymbol = stackSymbols[stackSymbols.length - 1];

            // ищем соответсвующий верхушке стека символу -
            // его парный закрывающий символ
            let iOpenTopStackSymbol =
                myBrackets.openElems.indexOf(topStackSymbol);
            let closePairTopStackSymbol =
                myBrackets.closeELems[iOpenTopStackSymbol];

            /*
             если текущий символ - это закрывающий символ,
             соответствующий символу (верхушке стека)
             значит - это правильный закрывающий символ.

             Тогда снимаем верхний элемент стека ( открывающий
             символ, который нашел свою пару )
             */
            if (str[iSymbol] !== closePairTopStackSymbol) {
                return false;
            } else {
                stackSymbols.pop();
            }
        }
    }

    // если стек после разбора пуст - значит парсинг пройден правильно
    return stackSymbols.length === 0;

}

module.exports = check;
