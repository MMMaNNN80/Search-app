import XLSX from 'xlsx';

export const writeExcelFile  = (info) =>
{

    if (info.query) {} else {
        const workSheetColumnNames = ['ID','QUERY', 'ИНН', 'КПП', 'ОГРН', 'Название'
            , 'Адрес', 'countResult']
        const workSheetName = 'DATA';


        const data = info.filter(el=>el.data).map(el => {

                    return [
                        (el.data) ? el.request.id : '1'
                        , (el.data) ? el.request.query : ''
                        , (el.data) ? el.data.inn  : ''
                        , (el.data) ? el.data.kpp : ''
                        , (el.data) ? el.data.ogrn  : ''
                        , (el.data) ? el.value : ''
                        , (el.data) ? el.data.address.unrestricted_value  : ''
                        , (el.data) ? el.countResult : '0'

                    ];


            }
        )

        const workSheetData = [workSheetColumnNames, ...data]

        const workBook = XLSX.utils.book_new();
        const workSheet = XLSX.utils.aoa_to_sheet(workSheetData);

        const filePath = './xxx.xls'

        XLSX.utils.book_append_sheet(workBook, workSheet, workSheetName);
        XLSX.writeFile(workBook, filePath)

        // console.log(workSheetColumnNames);
        console.log(info);
    }
}

export default writeExcelFile;