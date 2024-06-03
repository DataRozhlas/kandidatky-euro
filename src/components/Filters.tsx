import RankFilter from "./filters/RankFilter"
import AgeFilter from "./filters/AgeFilter"
import SexFilter from "./filters/SexFilter"
import SearchFilter from "./filters/SearchFilter"
import MandateFilter from "./filters/MandateFilter"

import { FilterPropsType } from "@/types"


export default function Filters(props: FilterPropsType) {


    if (props.data.length === 0) {
        return <div className="text-sm">Nejdřív vyberte aspoň jeden rok</div>
    }

    return (
        <div className="flex flex-wrap justify-evenly gap-10">
            <div className="flex flex-col gap-20 w-full sm:w-[46%] lg:w-[30%]">
                <SearchFilter {...props} />
                <SexFilter {...props} />
            </div>
            <div className="flex flex-col gap-10 w-full sm:w-[46%] lg:w-[30%]">

                <RankFilter {...props} />
                <AgeFilter {...props} />
                <MandateFilter {...props} />


            </div>
            <div className="flex flex-col gap-6 w-full sm:w-[46%] lg:w-[30%]">
                <SearchFilter {...props} />

            </div>
        </div>
    )
}