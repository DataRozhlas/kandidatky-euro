import { ScrollArea } from "@/components/ui/scroll-area"
import { Label } from "@/components/ui/label"

import Filters from "./Filters";

type View = {
    years: string[];
    poradi: [number, number];
};

export default function FiltersDesktop({ data, view, setView }: { data: string[][], view: View, setView: React.Dispatch<React.SetStateAction<View>> }) {
    return (
        <div className="min-w-full">
            <div className="flex items-center justify-between pb-3">
                <Label htmlFor="filters">Nastavte filtry</Label>
            </div>
            <ScrollArea className="h-[200px] w-full rounded-lg border p-4">
                <Filters data={data} view={view} setView={setView} />
            </ScrollArea>
        </div>
    )
}

