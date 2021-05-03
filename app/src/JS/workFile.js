
export const readFile = async (file) => {
    if (isPlainTextFile(file)) {
        const data = await readFileAnyEncoding(file);
        if (!data.error) {
            return { data: convertStringToCompany(data.data), error: "" };
        }
        return data;
    }

    return { data: [], error: "Type file not correctly" };
}
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

const readFileAnyEncoding = async (file) => {
    let result = await readFileUtfEncoding(file);

    if (result.error === "not correctly encoding") {
        result = await readFileOtherEncoding(file);
    }

    return result;
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





