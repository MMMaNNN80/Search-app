const stat = [];
const ERROR = 21;
const NOT_RESULT = 20;

const initStat = () => {
    stat.length = 0;
    document.querySelector("table").hidden = true;
}

const updateStat = (item) => {
    let countResult = item.countResult;

    if (item.error) countResult = ERROR;
    if (item.error === "Не найден") countResult = NOT_RESULT;

    if (stat[countResult]) {
        stat[countResult] += 1;
    } else {
        stat[countResult] = 1;
    }

    updateUi();
}

const updateUi = () => {
    document.querySelector("table").hidden = false;
    const table = document.querySelector("tbody");
    table.innerHTML = "";

    stat.forEach((el, index) => {
        table.innerHTML += getTr({ count: el, index });
    })
}

const getTr = (item) => {
    let textCountResult = item.index;
    if (textCountResult === ERROR) textCountResult = "Ошибок";
    if (textCountResult === NOT_RESULT) textCountResult = "Не найдено";

    return `<tr>
            <td>${textCountResult}</td>
            <td>${item.count}</td>
        </tr>`
}