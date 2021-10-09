const convertStringToCompany = (data) => {
    const list = [];

    if (data) {
        const rows = data.split(/\r\n|\n/);

        for (const row of rows) {
            const col = row.split(";");
            list.push({ id: col[0], query: col[1]?.trim().replaceAll('"', "") });
        }
    }

    return list;
}

// теперь все в ексель складывается
// const convertCompanyInfoToString = (listCompanyInfo) => {
//     const data = ["id;query;value;inn;kpp;ogrn;address;countResult;error"];
//     listCompanyInfo.forEach(el => {
//         data.push(`${el.request.id};"${replaceQuote(el.request.query)}";"${replaceQuote(el.value)}";${el.data?.inn ?? ""};${el.data?.kpp ?? ""};${el.data?.ogrn ?? ""};${el.data?.address?.value ?? ""};${el.countResult ?? 0};${el.error ?? ""}`);
//     });

//     return data;
// }

// const replaceQuote = (str) => {
//     if (str) return str.replaceAll('"', "'");
//     return "";
// }

// Там есть такие поля:
// data:
    // address: { value: "г Москва, Сколковское шоссе, д 45", unrestricted_value: "121353, г Москва, Можайский р-н, Сколковское шоссе, д 45", data: { … } }
    // authorities: null
    // branch_count: 0
    // branch_type: "MAIN"
    // capital: null
    // documents: null
    // emails: null
    // employee_count: null
    // finance: null
    // founders: null
    // hid: "158680313"
    // inn: "7727016888"
    // kpp: "773101001"
    // licenses: null
    // management: { name: "Ениколопов Рубен Сергеевич", post: "РЕКТОР", disqualified: null }
    // managers: null
    // name: { full_with_opf: "НЕГОСУДАРСТВЕННОЕ ОБРАЗОВАТЕЛЬНОЕ УЧРЕЖДЕНИЕ ВЫСШЕ…ВАНИЯ "РОССИЙСКАЯ ЭКОНОМИЧЕСКАЯ ШКОЛА" (ИНСТИТУТ)", short_with_opf: "НОУ ВО РЭШ, РОССИЙСКАЯ ЭКОНОМИЧЕСКАЯ ШКОЛА, РЭШ", latin: null, full: "НЕГОСУДАРСТВЕННОЕ ОБРАЗОВАТЕЛЬНОЕ УЧРЕЖДЕНИЕ ВЫСШЕ…ЗОВАНИЯ РОССИЙСКАЯ ЭКОНОМИЧЕСКАЯ ШКОЛА (ИНСТИТУТ)", short: "НОУ ВО РЭШ, РОССИЙСКАЯ ЭКОНОМИЧЕСКАЯ ШКОЛА, РЭШ" }
    // ogrn: "1037739159424"
    // ogrn_date: 1043107200000
    // okpo: "17405221"
    // okved: "85.22"
    // okved_type: "2014"
    // okveds: null
    // opf: { type: "2014", code: "75500", full: "Частное учреждение", short: "ЧУ" }
    // phones: null
    // qc: null
    // source: null
    // state: { status: "ACTIVE", actuality_date: 1609459200000, registration_date: 705024000000, liquidation_date: null }
    // type: "LEGAL"
// request: "Школа"
// unrestricted_value: "НОУ ВО РЭШ, РОССИЙСКАЯ ЭКОНОМИЧЕСКАЯ ШКОЛА, РЭШ"
// value: "НОУ ВО РЭШ, РОССИЙСКАЯ ЭКОНОМИЧЕСКАЯ ШКОЛА, РЭШ"