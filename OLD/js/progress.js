let countAllRecord = 0;
let countProcessedRecord = 0;



const startProgress = () => {
    document.querySelector("#processing").hidden = false; // делаем видимой    <div  id="processing">, где все контроллы скачивания
    setProgressBarValue(); // 
}

const setProgressBarValue = () => {
    let pr = 0;
    if (countAllRecord > 0) pr = Math.floor((countProcessedRecord / countAllRecord) * 100);

    const p = document.querySelector("div.progress-bar");
    const par = document.querySelector("#pr-text");
    p.style = `width:${pr}%;
    
                    height: 55px;
                    z-index: -1;
                    border:none;
                    position: absolute; 
                    margin-bottom: 2%;  
                    border: 1px solid whitesmoke;
    
    `;
    par.textContent = `${pr}%`

    document.querySelector("div.stat").textContent = `${countProcessedRecord} / ${countAllRecord}`;
}




const initProgress = (cr) => {
    countAllRecord = cr;
    countProcessedRecord = 0;
    setProgressBarValue();
}



const stopProgress = () => {
    document.querySelector("#processing").hidden = true;
    setProgressBarValue();
}

const stepProgress = () => {
    countProcessedRecord += 1;
    setProgressBarValue();
}

