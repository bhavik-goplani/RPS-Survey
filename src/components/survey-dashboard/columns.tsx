'use client'

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import * as React from "react"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import { EditSurvey } from "@/components/survey-dashboard/edit-survey"
import { GenerateLink } from "@/components/survey-dashboard/generate-link"

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
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Section Count
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  },
  {
    id: "actions",
    cell: function SurveyTableRow({ row }) {
      const survey = row.original
      const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
      const [editDialogOpen, setEditDialogOpen] = React.useState(false);
      const [generateLinkDialogOpen, setGenerateLinkDialogOpen] = React.useState(false);
      const router = useRouter()

      async function deleteSurvey(survey_id: string) {
        setDeleteDialogOpen(false);
        
        try {
            const res = await fetch(`/api/survey?survey_id=${survey_id}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
              });
            if (res.ok) {
                router.refresh()
                toast({
                    title: "Success!",
                    description: "Survey has been deleted.",
                  })
                }
            else {
                console.log(res)
                toast({
                    title: "Something went wrong.",
                    description: "Your survey could not be deleted.",
                    variant: "destructive",
                  })
            }
        }
        catch (err) {
            console.log(err)
            toast({
                title: "Something went wrong.",
                description: "Your survey could not be deleted.",
                variant: "destructive",
              })
        }

    }

      return (
        <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(survey.survey_id)}
            >
              Copy Survey ID
            </DropdownMenuItem>
            <DropdownMenuItem 
              onSelect={() => {
                  setEditDialogOpen(true)
                  document.body.style.pointerEvents = ""
              }}
              >Edit Survey</DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={`/dashboard/${survey.survey_id}`}>
                View/Edit Sections
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
                onSelect={() => {
                    setGenerateLinkDialogOpen(true)
                    document.body.style.pointerEvents = ""
                }}
                >Create Link for Participant</DropdownMenuItem>
            <DropdownMenuItem 
                onSelect={() => {
                    setDeleteDialogOpen(true)
                    document.body.style.pointerEvents = ""
                }}
                className="text-red-600"
                >Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                This action cannot be undone. This survey will no longer be
                accessible by you or others you&apos;ve shared it with.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button
                variant="destructive"
                onClick={() => {
                    deleteSurvey(survey.survey_id)
                }}
                >
                Delete
                </Button>
            </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
        <EditSurvey survey_id={survey.survey_id} editDialogOpen={editDialogOpen} setEditDialogOpen={setEditDialogOpen} />
        <GenerateLink survey_id={survey.survey_id} generateLinkDialogOpen={generateLinkDialogOpen} setGenerateLinkDialogOpen={setGenerateLinkDialogOpen} />
        </>
      )
    },
  },
]
