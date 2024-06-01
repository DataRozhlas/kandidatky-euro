import RankFilter from "./filters/RankFilter"
import AgeFilter from "./filters/AgeFilter"
import SexFilter from "./filters/SexFilter"


import { FilterPropsType } from "@/types"

export default function Filters(props: FilterPropsType) {


    if (props.data.length === 0) {
        return <div className="text-sm">Nejdřív vyberte aspoň jeden rok</div>
    }

    return (
        <div className="w-half-minus-gap sm:w-third-minus-gap flex flex-col gap-10 p-1">
            <SexFilter {...props} />
            <RankFilter {...props} />
            <AgeFilter {...props} />
        </div>)
}