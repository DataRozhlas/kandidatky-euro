"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
}

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "ROK",
        header: "Rok",
    },
    {
        accessorKey: "JMENO",
        header: "Jméno",
    },
    {
        accessorKey: "PRIJMENI",
        header: "Příjmení",
    },
    {
        accessorKey: "VEK",
        header: "Věk",
    },
    {
        accessorKey: "POVOLANI",
        header: "Povolání",
    },
    {
        accessorKey: "VSTRANA",
        header: "Volební strana",
    },
    {
        accessorKey: "HLASY",
        header: "Hlasy",
    }
]
