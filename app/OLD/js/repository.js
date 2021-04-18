const urlService = "http://10.42.108.144:8080/suggestions/api/4_1/rs/suggest/party";

// const getSuggestionTest = (request) => {
//     const listCompanyInfo = [];
//     if (request.id === "1") {
//         listCompanyInfo.push({
//             request,
//             countResult: 1
//         });
//     } else if (request.id === "2") {
//         listCompanyInfo.push({
//             request
//         });
//     } else {
//         listCompanyInfo.push({
//             request,
//             error: "Error"
//         });
//     }
//     return listCompanyInfo;
// }

const getSuggestions = async (request) => {
    const listCompanyInfo = [];

    try {
        const sug = await postRequest(request.query.trim().replaceAll('"', ""));

        if (sug.suggestions.length > 0) {
            for (const i of sug.suggestions) {
                listCompanyInfo.push({
                    ...i,
                    request,
                    countResult: sug.suggestions.length
                });
            }
        } else {
            listCompanyInfo.push({
                request,
                error: "Не найден"
            });
        }
    } catch (error) {
        listCompanyInfo.push({
            request,
            error: `${error.message.replaceAll(";", " ").replaceAll("\n", " ")}`
        });
    }

    return listCompanyInfo;
}

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