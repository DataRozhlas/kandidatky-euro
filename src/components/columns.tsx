"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Candidate = {
    ROK: string
    JMENO: string
    PRIJMENI: string
    TITULPRED: string
    TITULZA: string
    POHLAVI: string
    VEK: string
    POVOLANI: string
    VOLEBNI: {
        ZKRATKAV30: string
    }
    NAVRHUJICI: {
        ZKRATKAV30: string
    }
    HLASY: string
}

export const columns: ColumnDef<Candidate>[] = [
    {
        accessorKey: "ROK",
        header: "Rok",
    },
    {
        accessorKey: "PORCISLO",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    #
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }: { row: any }) => {
            return (<div className="text-center">{row.getValue("PORCISLO")}</div>)
        },

    },
    {
        accessorKey: "JMENO",
        header: "Jméno",
    },
    {
        accessorKey: "PRIJMENI",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Jméno
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        sortingFn: (a: any, b: any, columnId: string) => {
            const result = new Intl.Collator('cs-CZ').compare(a.getValue(columnId), b.getValue(columnId))
            return result
        },
        cell: ({ row }: { row: any }) => {
            const titpred = row.getValue("TITULPRED");
            const jmeno = row.getValue("JMENO");
            const prijmeni = row.getValue("PRIJMENI");
            const titza = row.getValue("TITULZA");
            return (<span className="text-sm">{titpred} {jmeno} <span className="font-bold">{prijmeni}</span> {titza}</span>)
        }
    },
    {
        accessorKey: "TITULPRED",
        header: "Titul před",
    },
    {
        accessorKey: "TITULZA",
        header: "Titul za",

    },
    {
        accessorKey: "POHLAVI",
        header: "Pohlaví",
    },
    {
        accessorKey: "VEK",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Věk
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }: { row: any }) => {
            return (<div className="text-center">{row.getValue("VEK")} let</div>)
        },
    },
    {
        accessorKey: "POVOLANI",
        header: "Povolání",
    },
    {
        accessorKey: "BYDLISTEN",
        header: "Bydliště",
    },
    {
        accessorKey: "VOLEBNI.ZKRATKAV30",
        header: "Volební strana",
    },

    {
        accessorKey: "NAVRHUJICI.ZKRATKAV30",
        header: "Navrhující strana",
    },
    {
        accessorKey: "POCHLASU",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Preferenční hlasy
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }: { row: any }) => {
            return (<div className="text-center">{isNaN(Number(row.getValue("POCHLASU"))) ? "0" : Number(row.getValue("POCHLASU")).toLocaleString("cs-CZ")}</div>)
        },

    },
    {
        accessorKey: "POCPROC",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Preferenční hlasy
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }: { row: any }) => {
            return (<div className="text-center">{isNaN(Number(row.getValue("POCPROC"))) ? "0" : Number(row.getValue("POCPROC")).toLocaleString("cs-CZ")} %</div>)
        },

    },
    {
        accessorKey: "STATOBCAN",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Občanství
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },

    },

]
