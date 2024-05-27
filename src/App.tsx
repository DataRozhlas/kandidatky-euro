import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import { tsvParse } from "d3"

import Stat from "@/components/Stat"


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

function App() {

  const [view, setView] = useState({ years: ["2024"] })
  const [data, setData] = useState<{ [key: string]: any }>({})
  const [filteredData, setFilteredData] = useState<any[]>([])
  const [total, setTotal] = useState(0)

  //load data if not already loaded
  useEffect(() => {
    function fetchData(year: string) {
      fetch(`./data/${year}/kand.tsv`)
        .then((response) => response.text())
        .then((text) => tsvParse(text))
        .then((parsed) => setData(prev => { return { ...prev, [year]: parsed } }))
    }

    view.years.forEach(async (year) => {
      if (data[year]) return;
      fetchData(year)
    })

  }, [view])


  //calculate total
  useEffect(() => {
    let total = 0
    view.years.forEach((year) => {
      if (data[year]) {
        total += data[year].length
      }
    })
    setTotal(total)
  }, [data, view])

  // filter data
  useEffect(() => {
    let filtered: any[] = []
    view.years.forEach((year) => {
      if (data[year]) {
        filtered = filtered.concat(data[year])
      }
    })
    setFilteredData(filtered)
  }, [data, view])

  return (
    <>
      <div className="max-w-[1070px] mx-auto flex flex-col gap-2">
        <div className="flex flex-row items-center justify-center gap-2">
          <Label htmlFor="select-rok">Vyberte volby</Label>
          <ToggleGroup id={"select-rok"} type={"multiple"} variant={"outline"} value={view.years} onValueChange={(value) => {
            if (value) { setView(prev => { return { ...prev, years: value } }) }
          }}>
            {yearsAvailable.map((year) => (
              <ToggleGroupItem
                key={year}
                value={year}
              >
                {year}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        <div className="flex flex-row justify-center gap-1">
          <Stat title="Celkem" number={total.toLocaleString("cs-CZ")} subtitle="kandidátů" icon="user" />
          {filteredData.length < total && <Stat title="Vybráno" number={(filteredData.length).toLocaleString("cs-CZ")} subtitle="kandidátů" icon="user-check" />}
          <Stat title="Žen" number={countFemaleRatio(filteredData)} subtitle="z kandidujících" icon="female" />
          <Stat title="Věk" number={countAverageAge(filteredData)} subtitle="průměrně" icon="clock" />

        </div>
      </div>
    </>
  )
}

export default App
