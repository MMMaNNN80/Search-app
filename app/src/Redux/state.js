import {readFile} from '../JS/workFile';
import {pererender} from '../index';
let listCompany =[]

const headertxt =  ['Сервис группового поиска','Ксюша']


async function initInputData(file) {
   state.cont=[]

    listCompany.length = 0;
//  initStat();
  const inputData = await readFile(file);
  if (!inputData.error) {
    listCompany.push(...inputData.data)
     
   listCompany = listCompany.filter(el => el.id.length>2)   
   state.cont = listCompany.slice(0,50);
     //initProgress(listCompany.length);
  } else {
    notificationError(inputData.error);
  }
 state.count_txt = 'Всего записей: '

 state.count_txt = state.count_txt + listCompany.length
 state.countRecords = listCompany.length
 pererender()
    
}
function notificationError(error) {
  console.error(error);
  alert(error);
}


 

const fbtnSeach = () => { 
 state.countRecords > 0 ? startProgress():alert('Нет данных для обработки /fbtnSeach')
 }

const startProgress = (currCountRecords = 0) => { 
  
  const countAllRecord = state.countRecords;
  state.search.procentValue = Math.floor((currCountRecords / countAllRecord) * 100) + '%'
 
  if (currCountRecords !== countAllRecord) {
   setIncrementCountRecords(currCountRecords)
  // currCountRecords = setTimeout(setIncrementCountRecords(currCountRecords),10000)
  
   pererender()
}
}


const setIncrementCountRecords = (currCountRecords) =>
{
  currCountRecords +=1;
  startProgress(currCountRecords)
  
}

let state = 
{

      inpEvent: async (e) => { 
      state.search.procentValue='0%'
      await initInputData(e.currentTarget.files[0]);
      pererender()
  },
  mass_txt:  headertxt[0],
  count_txt: '',
  countRecords:0,
  cont: [],
  search: {
  fbtnSeach,
  procentValue: '0%',
  }


}

export default state;

