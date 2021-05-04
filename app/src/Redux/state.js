import { readFile } from '../JS/workFile';
import { pererender } from '../index';
let listCompany = [];

const headertxt = ['Сервис группового поиска', 'Ксюша']


async function initInputData(file) {
  state.tblContent = []

  listCompany.length = 0;
  //  initStat();
  const inputData = await readFile(file);
  if (!inputData.error) {
    listCompany.push(...inputData.data)

    listCompany = listCompany.filter(el => el.id.length > 2)
    state.tblContent = listCompany.slice(0, 50);
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


const urlService = "http://10.42.108.144:8080/suggestions/api/4_1/rs/suggest/party";

const postRequest = async (query) => {
  const response = await fetch(urlService, {
      headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Accept-Encoding': 'gzip, deflate, br',
          'Content-Encoding': 'gzip, deflate, br'
      },
      method: 'POST',
      body: `{"query":"${query}", "count":10}`
  });

  if (response.status === 200) {
      return await response.json();
  }

  const resultError = await response.json();
  console.error(resultError);
  throw new Error(`${resultError.message}`);
}


const onClickAction = () => {


  state.countRecords > 0 ? getSuggestions(): alert('Нет данных для обработки /fbtnSeach')
 // startProgress() 
}



const getSuggestions = async (request) => {

  listCompany = state.tblContent;
   const listCompanyInfo = []; 
  try {
  for (const request of listCompany ){
  const sug = await postRequest(request.query.trim().replace('"', "") );


 if (sug.suggestions.length > 0) {
  for (const i of sug.suggestions) {
      listCompanyInfo.push({
          ...i,
          request,
          countResult: sug.suggestions.length
      });
  }
} else {
  listCompanyInfo.push( {
      request,
      error: "Не найден"
  });
}
  }

  } catch(error) {
      listCompanyInfo.push({
      request,
      error: `${error.message.replaceAll(";", " ").replaceAll("\n", " ")}`
  });

  }
  console.log(listCompanyInfo)
  return listCompanyInfo;
}
  
  




   
//   const  sug   = await getSugg(Item)

// }
// const  getSugg = async (request) =>{
//   const listCompanyInfo = [];



// } 
 
// }


const startProgress = (currCountRecords = 0) => {

  const countAllRecord = state.countRecords;
  state.search.procentValue = Math.floor((currCountRecords / countAllRecord) * 100) + '%'

  if (currCountRecords !== countAllRecord) {
    setIncrementCountRecords(currCountRecords)
    pererender()
  }
}

const setIncrementCountRecords = (currCountRecords) => {
  currCountRecords += 1;
  startProgress(currCountRecords)

}
let state =
{

  inpEvent: async (e) => {
    state.search.procentValue = '0%'
    await initInputData(e.currentTarget.files[0]);
    pererender()
  },
  mass_txt: headertxt[0],
  count_txt: '',
  countRecords: 0,
  tblContent: [],
  search: {
    onClickAction, 
    procentValue: '0%',
   
  }


}

export default state;

