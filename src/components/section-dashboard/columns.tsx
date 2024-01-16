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

import { EditSection } from "@/components/section-dashboard/edit-section"

export type Section = {
    paper_prob: number;
    rock_prob: number;
    scissor_prob: number;
    section_id: string;
    survey_id: string;
    trial_no: number;
    }

export const columns: ColumnDef<Section>[] = [
    {
        accessorKey: "rock_prob",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Rock Probability
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
    },
    {
        accessorKey: "paper_prob",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Paper Probability
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
    },
    {
        accessorKey: "scissor_prob",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Scissors Probability
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
    },
    {
        accessorKey: "trial_no",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Trial Number
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
    },
    {
        id: "actions",
        cell: function SectionTableRow({ row }) {
          const section = row.original
          const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
          const [editDialogOpen, setEditDialogOpen] = React.useState(false);
          const router = useRouter()

          async function deleteSection(section_id: string) {
            setDeleteDialogOpen(false);
            
            try {
                const res = await fetch(`/api/section?section_id=${section_id}`, {
                    method: 'DELETE',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  });
                if (res.ok) {
                    router.refresh()
                    toast({
                        title: "Success!",
                        description: "Section has been deleted.",
                      })
                    }
                else {
                    console.log(res)
                    toast({
                        title: "Something went wrong.",
                        description: "Your section could not be deleted.",
                        variant: "destructive",
                      })
                }
            }
            catch (err) {
                console.log(err)
                toast({
                    title: "Something went wrong.",
                    description: "Your section could not be deleted.",
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
                  onClick={() => navigator.clipboard.writeText(section.section_id)}
                >
                  Copy Section ID
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onSelect={() => {
                      setEditDialogOpen(true)
                      document.body.style.pointerEvents = ""
                  }}
                  >Edit Section</DropdownMenuItem>
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
                    This action cannot be undone. This section will no longer be
                    accessible by you or others you&apos;ve shared it with.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button
                    variant="destructive"
                    onClick={() => {
                        deleteSection(section.section_id)
                    }}
                    >
                    Delete
                    </Button>
                </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <EditSection section_id={section.section_id} editDialogOpen={editDialogOpen} setEditDialogOpen={setEditDialogOpen} />
            </>
          )
        },
    },
    ]