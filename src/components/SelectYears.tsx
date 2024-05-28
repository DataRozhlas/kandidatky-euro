import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Circle, CircleCheck } from "lucide-react"


type View = {
    years: string[]
}


export default function SelectYears({ view, setView, yearsAvailable }: { view: View, setView: React.Dispatch<React.SetStateAction<View>>, yearsAvailable: string[] }) {


    return (
        <div className="min-w-full">
            <div className="flex items-center justify-between h-9">
                <Label htmlFor="select-rok">Vyberte rok</Label>
                {view.years.length < yearsAvailable.length && <Button variant={"link"} size={"sm"} onClick={() => { setView(prev => { return { ...prev, years: yearsAvailable } }) }}>vybrat vše</Button>}
                {view.years.length === yearsAvailable.length && <Button variant={"link"} size={"sm"} onClick={() => { setView(prev => { return { ...prev, years: [] } }) }}>zrušit vše</Button>}</div>

            <ToggleGroup id={"select-rok"} type={"multiple"} variant={"outline"} value={view.years} onValueChange={
                (years) => {
                    setView(prev => { return { ...prev, years } })
                }
            }
            >
                {yearsAvailable.map((year, index) => (
                    <ToggleGroupItem
                        key={`${index}-${year}`}
                        value={year}
                        className={"w-1/5"}
                    >
                        {view.years.includes(year) ? <CircleCheck className="h-4 w-4 pr-1" /> : <Circle className="h-4 w-4 pr-1" />}
                        {year}
                    </ToggleGroupItem>
                ))}
            </ToggleGroup>
        </div>

    )

}