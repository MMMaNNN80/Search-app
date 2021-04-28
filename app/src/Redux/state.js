import {readFile} from '../JS/workFile';
import {pererender} from '../index';
let listCompany =[]


const headertxt =  ['Сервис группового поиска','Ксюша']


async function initInputData(file) {

    listCompany.length = 0;
//  initStat();
  const inputData = await readFile(file);
  if (!inputData.error) {
    listCompany.push(...inputData.data)


    // document.querySelector("#countRecord").textContent = `Всего записей: ${listCompany.length}`;
    // initProgress(listCompany.length);
  } else {
    notificationError(inputData.error);
  }

 state.count_txt = state.count_txt + listCompany.length

  pererender()
    state.count_txt = 'Всего записей: '
}
function notificationError(error) {
  console.error(error);
  alert(error);
}





let state = 
{

    inpEvent: async (e) => {
    await initInputData(e.currentTarget.files[0]);
  },
  mass_txt:  headertxt[0],
  count_txt: 'Всего записей: 0'
}

export default state;

