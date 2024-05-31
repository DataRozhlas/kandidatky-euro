import RankFilter from "./filters/RankFilter"


import { FilterPropsType } from "@/types"

export default function Filters(props: FilterPropsType) {


    if (props.data.length === 0) {
        return <div className="text-sm">Nejdřív vyberte aspoň jeden rok</div>
    }

    return (
        <div>
            <RankFilter {...props} />
        </div>)
}