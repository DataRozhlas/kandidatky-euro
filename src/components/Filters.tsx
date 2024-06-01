import RankFilter from "./filters/RankFilter"
import AgeFilter from "./filters/AgeFilter"


import { FilterPropsType } from "@/types"

export default function Filters(props: FilterPropsType) {


    if (props.data.length === 0) {
        return <div className="text-sm">Nejdřív vyberte aspoň jeden rok</div>
    }

    return (
        <div className="w-half-minus-gap sm:w-third-minus-gap flex flex-col gap-4 p-1">
            <RankFilter {...props} />
            <AgeFilter {...props} />
        </div>)
}