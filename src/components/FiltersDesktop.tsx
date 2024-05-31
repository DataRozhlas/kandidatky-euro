import { ScrollArea } from "@/components/ui/scroll-area"
import { Label } from "@/components/ui/label"

import Filters from "./Filters";

import { FilterPropsType } from "@/types";

export default function FiltersDesktop(props: FilterPropsType) {
    return (
        <div className="min-w-full">
            <div className="flex items-center justify-between pb-3">
                <Label htmlFor="filters">Nastavte filtry</Label>
            </div>
            <ScrollArea className="h-[200px] w-full rounded-lg border p-4">
                <Filters {...props} />
            </ScrollArea>
        </div>
    )
}

