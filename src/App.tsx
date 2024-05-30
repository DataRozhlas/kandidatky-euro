//import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import { tsvParse } from "d3"

import Stat from "@/components/Stat"
import SelectYears from "@/components/SelectYears"
import FiltersDesktop from "@/components/FiltersDesktop"
import { DataTable } from "@/components/DataTable"
import { columns } from "./components/columns"

type View = {
  years: string[]
  poradi: [number, number]
}


const yearsAvailable = ["2004", "2009", "2014", "2019", "2024"]

const countFemaleRatio = (data: any[]) => {
  if (data.length === 0) return "-- %";
  let total = data.length;
  let females = data.filter((d) => d.POHLAVI === "F").length
  return (females / total).toLocaleString("cs-CZ", { style: 'percent', maximumFractionDigits: 1 });
};

const countAverageAge = (data: any[]) => {
  if (data.length === 0) return "-- let";
  let total = data.length;
  let sum = data.reduce((acc, d) => acc + Number(d.VEK), 0)
  return (sum / total).toLocaleString("cs-CZ", { maximumFractionDigits: 1 }) + " let";
}

const countUnique = (data: any[], key: string) => {
  if (data.length === 0) return "--";
  const unique = new Set(data.map((d) => d[key])).size
  return unique.toLocaleString("cs-CZ")
}

function App() {

  const [view, setView] = useState<View>({ years: ["2024"], poradi: [1, 28] })
  const [data, setData] = useState<{ [key: string]: any }>({})
  const [selected, setSelected] = useState<any[]>([])
  const [filtered, setFiltered] = useState<any[]>([])
  const [cvsData, setCvsData] = useState<any[]>([])


  //load data if not already loaded
  useEffect(() => {
    function fetchData(year: string) {
      fetch(`./data/${year}/kand.tsv`)
        .then((response) => response.text())
        .then((text) => tsvParse(text))
        .then((parsed) => setData(prev => { return { ...prev, [year]: parsed } }))
    }

    // Check if data for all years in view.years has already been fetched
    const allDataFetched = view.years.every(year => data[year]);

    if (allDataFetched) {
      // If data for all years has been fetched, return early to prevent fetching again
      return;
    }

    view.years.forEach(async (year) => {
      if (data[year]) return;
      fetchData(year)
      console.log("fetched", year)
    })

    if (cvsData.length === 0) {
      fetch(`./data/2024/cvs.tsv`)
        .then((response) => response.text())
        .then((text) => tsvParse(text))
        .then((parsed) => setCvsData(parsed))
      console.log("fetched cvs")
    }

  }, [view.years])

  // join data with cvs
  useEffect(() => {
    if (cvsData.length === 0) return;
    yearsAvailable.forEach((year) => {
      if (data[year] && !data[year][0].NAVRHUJICI) {
        setData(prev => {
          return {
            ...prev,
            [year]: data[year].map((d: any) => {
              const partyN = cvsData.find((c: any) => c.VSTRANA === d.NSTRANA)
              const partyV = cvsData.find((c: any) => c.VSTRANA === d.VSTRANA)
              const partyP = cvsData.find((c: any) => c.VSTRANA === d.PSTRANA)
              return { ...d, NAVRHUJICI: partyN, VOLEBNI: partyV, PRISLUSNOST: partyP }
            })
          }

        })
        console.log("joined", year)
      }
    })
  }, [data, cvsData])

  // select data by year
  useEffect(() => {
    let selected: any[] = []
    view.years.forEach((year) => {
      if (data[year]) {
        selected = selected.concat(data[year])
      }
    })
    setSelected(selected)
  }, [data, view.years])

  // filter data with greater granularity
  useEffect(() => {
    const updated = selected.filter((row: { PORCISLO: string }) => {

      if (Number(row.PORCISLO) >= view.poradi[0] && Number(row.PORCISLO) <= view.poradi[1]) { return true }
      return false
    })
    setFiltered(updated)
  }, [selected, view])


  return (
    <>
      {<div className="max-w-[1070px] mx-auto flex flex-col gap-5">
        <SelectYears years={view.years} setView={setView} yearsAvailable={yearsAvailable} />
        <FiltersDesktop data={selected} view={view} setView={setView} />
        <div className="flex flex-row flex-wrap lg:flex-nowrap justify-center gap-1">
          <Stat title="Celkem" number={selected.length.toLocaleString("cs-CZ")} subtitle="kandidujících" icon="user" />
          <Stat title="Vybráno" number={(filtered.length).toLocaleString("cs-CZ")} subtitle="kandidujících" icon="user-check" />
          <Stat title="Podíl žen" number={countFemaleRatio(filtered)} subtitle="z vybraných" icon="female" />
          <Stat title="Průměrný věk" number={countAverageAge(filtered)} subtitle="u vybraných" icon="clock" />
          <Stat title="Volebních stran" number={countUnique(filtered, "VSTRANA")} subtitle="včetně koalic" icon="vote" />
        </div>
        <DataTable columns={columns} data={filtered} years={view.years} />

      </div>}
    </>
  )
}

export default App
