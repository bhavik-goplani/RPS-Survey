'use client'

import { ColumnDef } from "@tanstack/react-table"
import { UUID } from "crypto"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Survey = {
    description: string | null
    name: string
    section_count: number
    survey_id: string
}

export const columns: ColumnDef<Survey>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "section_count",
    header: "Section Count",
  },
]
