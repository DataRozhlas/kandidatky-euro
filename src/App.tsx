import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import { tsvParse } from "d3"


const yearsAvailable = ["2004", "2009", "2014", "2019", "2024"]




function App() {

  const [view, setView] = useState({ years: ["2024"] })
  const [data, setData] = useState<{ [key: string]: any }>({})

  //load data
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

  return (
    <>
      <div className="max-w-[1070px] mx-auto">
        <div className="flex flex-row items-center justify-center gap-3">
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
      </div>
    </>
  )
}

export default App
