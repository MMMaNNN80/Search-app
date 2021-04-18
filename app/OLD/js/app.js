const listCompany = [];

async function processing() {
    if (listCompany.length === 0) return; // если пусто, то вернуть ничто

    startProgress(); // в process.js 
    initStat(); // в process.js 
    
    document.querySelector("button").disabled = true; // кнопку делаем неактивной

    const listCompanyInfo = [];

    for (const item of listCompany) {
        const sug = await getSuggestions(item)
        //const sug = getSuggestionTest(item);
        listCompanyInfo.push(...sug);
        updateStat(sug[0]);
        stepProgress();
    }

    try {
        createExcelFile(listCompanyInfo);
        // если устроит ексель, то можно удалять
        // const outputData = convertCompanyInfoToString(listCompanyInfo);
        // const dataSave = createPlainTextFile(outputData);
        // loadData(dataSave);
    } catch (error) {
        notificationError(error.message);
    } finally {
        stopProgress();
        document.querySelector("button").disabled = false;
    }
}

async function initInputData(file) {
    listCompany.length = 0;
    initStat();
    const inputData = await readFile(file);
    if (!inputData.error) {
        listCompany.push(...inputData.data)
        document.querySelector("#countRecord").textContent = `Всего записей: ${listCompany.length}`;
        initProgress(listCompany.length);
    } else {
        notificationError(inputData.error);
    }
}

// function loadData(data) {
//     const a = document.createElement("a");
//     a.download = "data.csv";
//     a.href = data;
//     a.click();
// }

function notificationError(error) {
    console.error(error);
    alert(error);
}

document.querySelector("button").onclick = async () => processing();
document.querySelector("input").onchange = async (e) => await initInputData(e.currentTarget.files[0]);
document.querySelector("input").ondragover = (e) => {
    e.stopPropagation();
    e.preventDefault();
    e.target.classList.add("bg-secondary");
    e.target.parentElement.classList.add("bg-secondary");
};

document.querySelector("input").ondragleave = (e) => {
    e.stopPropagation();
    e.preventDefault();
    e.target.classList.remove("bg-secondary");
    e.target.parentElement.classList.remove("bg-secondary");
};
document.querySelector("input").ondrop = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    e.target.classList.remove("bg-secondary");
    e.target.parentElement.classList.remove("bg-secondary");
    e.currentTarget.files = e.dataTransfer.files;
    await initInputData(e.dataTransfer.files[0]);
};