import { csvParse, tsvFormat } from 'd3';


const years = ["2004", "2009", "2014", "2019", "2024"];

for (const year of years) {
    const file = await Bun.file(`./srv/data/${year}/eprk_sex.csv`).text();
    const data = csvParse(file);


    const tsv = tsvFormat(data);
    await Bun.write(`./public/data/${year}/kand.tsv`, tsv);
}

