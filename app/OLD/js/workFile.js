const readFile = async (file) => {
    if (isPlainTextFile(file)) {
        const data = await readFileAnyEncoding(file);
        if (!data.error) {
            return { data: convertStringToCompany(data.data), error: "" };
        }
        return data;
    }

    if (isExcelFile(file)) return await readExcel(file);

    return { data: [], error: "Type file not correctly" };
}

const readFileAnyEncoding = async (file) => {
    let result = await readFileUtfEncoding(file);

    if (result.error === "not correctly encoding") {
        result = await readFileOtherEncoding(file);
    }

    return result;
}

const readExcel = (file) => {
    return new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = function (e) {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                const d = XLSX.utils.sheet_to_json(worksheet);
                const list = [];
                d.forEach(el => list.push({ id: Object.values(el)[0], query: Object.values(el)[1] }));
                resolve({ data: list, error: null });
            } catch (e) {
                resolve({ data: [], error: e.message });
            }
        };
        reader.readAsArrayBuffer(file);
    });
}

const readFileUtfEncoding = (file) => {
    return new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                resolve({ data: decodeURIComponent(escape(event.target.result)), error: null });
            } catch (e) {
                if (e.message === "URI malformed") {
                    resolve({ data: [], error: "not correctly encoding" });
                } else {
                    resolve({ data: [], error: e.message });
                }
            }
        };
        reader.readAsBinaryString(file);
    });
}

const readFileOtherEncoding = (file) => {
    return new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                resolve({ data: e.target.result, error: null });
            } catch (e) {
                resolve({ data: [], error: e.message });
            }
        };
        reader.readAsText(file, "windows-1251");
    });
}

const isPlainTextFile = (file) => {
    return file && (file.type === "text/plain" || (file.type === "application/vnd.ms-excel" && file.name.includes(".csv")));
}

const isExcelFile = (file) => {
    return file && (file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" && file.name.includes(".xlsx"));
}

const createPlainTextFile = (list) => {
    let dataFile = "data:application/txt;charset=utf-8,%EF%BB%BF";
    dataFile += encodeURIComponent(list.join("\r\n"));
    return dataFile;
}

function createExcelFile(listCompanyInfo) {
    const allField = [];
    listCompanyInfo.forEach(el => {
        const d = el.data;
        const a = d?.address;
        const m = d?.management;
        const n = d?.name;

        allField.push({
            ...el.request,
            name_unr:el?.unrestricted_value,
            short_with_opf: n?.short_with_opf,
            full_with_opf: n?.full_with_opf,
            ogrn:d?.ogrn,
            inn:d?.inn,
            kpp:d?.kpp,
            address: a?.unrestricted_value,
            fias_code: a?.data?.fias_code,
            fias_id: a?.data?.fias_id,
            geo_lat:a?.data?.geo_lat,
            geo_lon:a?.data?.geo_lon,
            branch_type:d?.branch_type,
            mname: m?.name.toUpperCase(),
            post: m?.post.toUpperCase(),
            // ...m,
            hid:d?.hid,
            okved:d?.okved,
            countResult: el.countResult,
            error: el.error
        })

        // allField.push({
        //     ...el.request,
        //   //  value: el.value,
        //    // unrestrictedValue: el.unrestricted_value,
        //     ...d,
        //     ...a,
        //     ...m,
        //     ...n,
        //     countResult: el.countResult,
        //     error: el.error
        // })
    });

    const ws = XLSX.utils.json_to_sheet(allField, { sheet: "Данные" });
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws);
    XLSX.writeFile(wb, "Данные.xlsx");
}