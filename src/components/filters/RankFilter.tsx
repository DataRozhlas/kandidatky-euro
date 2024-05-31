import { useEffect, useState } from 'react'

import { Label } from '../ui/label'
import { Slider } from '../ui/slider'

import { FilterPropsType } from '../../types'

import { Candidate } from '../../types'

export default function RankFilter(props: FilterPropsType) {
    const [maxPoradi, setMaxPoradi] = useState(28)


    useEffect(() => {
        if (props.data.length > 0) {
            const newMaxPoradi = Math.max(...props.data.map((row: Candidate) => {
                return Number(row.PORCISLO)
            }))
            setMaxPoradi(newMaxPoradi)
        }
    }, [props.data])

    useEffect(() => {
        if (maxPoradi > 0 && maxPoradi < props.view.poradi[1]) {
            props.setView((prev: { years: string[], poradi: [number, number] }) => { return { ...prev, poradi: [prev.poradi[0], maxPoradi] } })
        }
    }, [maxPoradi])
    return (
        <div>
            <div className="w-half-minus-gap sm:w-third-minus-gap flex flex-col gap-4 p-1">
                <Label htmlFor={"poradi"}>{`Pořadí na kandidátce: ${props.view.poradi[0] === props.view.poradi[1] ? props.view.poradi[1] : `${props.view.poradi[0]} - ${props.view.poradi[1]}`}`}</Label>
                <Slider id={"poradi"} value={props.view.poradi} min={1} max={maxPoradi} step={1} onValueChange={(value: [number, number]) => (props.setView((prev) => { return { ...prev, poradi: value } }))} />
            </div>
        </div>)
}