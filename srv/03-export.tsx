import { csvParse, tsvFormat } from 'd3';


const years = ["2004", "2009", "2014", "2019", "2024"];

for (const year of years) {
    const file = await Bun.file(`./srv/data/${year}/eprk_sex.csv`).text();
    const data = csvParse(file);

    const EPRKLfile = await Bun.file(`./srv/data/${year}/eprkl.csv`).text();
    const EPRKLdata = csvParse(EPRKLfile);

    const newData = data.map((d: any) => {
        const foundItem = EPRKLdata.find(item => item.ESTRANA === d.ESTRANA);
        const VSTRANA = foundItem ? foundItem.VSTRANA : undefined;
        return { ...d, ROK: year, VSTRANA }
    })


    const tsv = tsvFormat(newData);
    await Bun.write(`./public/data/${year}/kand.tsv`, tsv);
}

// číselník volebních stran
const cvsFile = await Bun.file(`./srv/data/2024/cvs.csv`).text();
const cvsData = csvParse(cvsFile);
const tsv = tsvFormat(cvsData);
await Bun.write(`./public/data/2024/cvs.tsv`, tsv);
