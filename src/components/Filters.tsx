import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"

export default function Filters({ ...props }) {
    const [maxPoradi, setMaxPoradi] = useState(28)


    useEffect(() => {
        if (props.data.length > 0) {
            const newMaxPoradi = Math.max(...props.data.map((row: { PORCISLO: string }) => {
                return Number(row.PORCISLO)
            }))
            setMaxPoradi(newMaxPoradi)
        }
    }, [props.data])

    useEffect(() => {
        if (maxPoradi > 0 && maxPoradi < props.view.poradi[1]) {
            props.setView((prev: { poradi: [number, number] }) => { return { ...prev, poradi: [prev.poradi[0], maxPoradi] } })
        }
    }, [maxPoradi])


    if (props.data.length === 0) {
        return <div className="text-sm">Nejdřív vyberte aspoň jeden rok</div>
    }

    return (
        <div>
            <div className="w-half-minus-gap sm:w-third-minus-gap flex flex-col gap-4 p-1">
                <Label htmlFor={"poradi"}>{`Pořadí na kandidátce: ${props.view.poradi[0] === props.view.poradi[1] ? props.view.poradi[1] : `${props.view.poradi[0]} - ${props.view.poradi[1]}`}`}</Label>
                <Slider id={"poradi"} value={props.view.poradi} min={1} max={maxPoradi} step={1} onValueChange={(value: number[]) => (props.setView((prev: Object) => { return { ...prev, poradi: value } }))} />
            </div>
        </div>)
}