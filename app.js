function firstTwoChar(text) {
    const str = text.toString();
    const char = str.substring(0, 2);
    return char.toUpperCase()
}

function lastTwoChar(text) {
    const str = text.toString();
    const char = str.substring(str.length - 2, str.length);
    return char
}

function currentYearLastTwoNumber() {
    const date = new Date();
    const year = date.getFullYear().toString();
    return year.substring(2, 4);
}

function generatePadding(serial) {
    const padding = ["", "00000", "0000", "000", "00", "0"]
    const slLength = serial.toString().length;
    return `${padding[slLength]}`;
}

function sortArrayByCardNumber(data) {
    return data.sort(function (a, b) {
        if (a.cardNumber < b.cardNumber) { return -1; }
        if (a.cardNumber > b.cardNumber) { return 1; }
        return 0;
    })
}

function sortByPriority(data) {
    const arrayOfData = [];
    data.forEach(item => {
        const arr = arrayOfData[item.priority] || [];
        arrayOfData[item.priority] = [...arr, item];
    });
    return arrayOfData.filter((element) => element !== undefined);
}

function addGift(index) {
    if (index % 2 === 0) {
        return "R";
    } else {
        return "W";
    }
}

function cardDistribution(data = []) {
    const cards = [];
    // const year = currentYearLastTwoNumber();

    data.forEach(({ birthYear, currentYear, district, postNo, priority }, userSL) => {
        const dis = firstTwoChar(district);
        const post = firstTwoChar(postNo);
        const padding = generatePadding(userSL + 1) || "";
        const yr = lastTwoChar(currentYear);
        const cardNumber = `${dis}${yr}${post}${birthYear}${padding}${userSL + 1}`;
        const gift = addGift(userSL + 1);
        cards.push({ cardNumber, gift, priority });
    });

    const priorityShort = sortByPriority(cards);
    let shortedList = [];
    priorityShort.forEach(element => {
        const e = sortArrayByCardNumber(element);
        shortedList = [...shortedList, ...e];
    });

    return shortedList;
}